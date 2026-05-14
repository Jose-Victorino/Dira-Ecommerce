import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const appURL = import.meta.env.VITE_API_URL || 'http://localhost:5500'
const api = axios.create({ baseURL: `${appURL}/api` })

class AppError extends Error {
  constructor({
    status = null,
    message = 'Unknown error',
    type = 'unknown',
    url = null,
    data = null,
  }) {
    super (message)
    this.status = status
    this.type = type
    this.url = url
    this.data = data
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(axios.isCancel(error)) return Promise.reject(error)

    if(!axios.isAxiosError(error)){
      console.error('[API] Non-Axios error', error)
      return Promise.reject(
        new AppError({
          message: 'Unknown error',
          type: 'unknown',
          data: error
        })
      )
    }

    const status = error.response?.status
    const url = error.config?.url

    const message = 
      error.response?.data?.message ??
      error.message ??
      'Request failed'

    let type = 'unknown'

    if(error.response){
      switch (status){
        case 401:
          type = 'unauthorized'
          console.warn('[API] Unauthorized — redirecting to login')
          break
        case 403:
          type = 'forbidden'
          console.warn('[API] Forbidden')
          break
        case 404:
          type = 'not_found'
          console.warn(`[API] Not found: ${url}`)
          break
        case 422:
          type = 'validation'
          console.warn('[API] Validation error')
          break
        case 500:
          type = 'server'
          console.error('[API] Server error', message)
          break
        default:
          type = 'http_error'
          console.error('[API] Unexpected error', message)
      }
    }
    else if(error.request){
      type = 'network'
      console.error('[API] No response received')
    }
    else{
      type = 'setup'
      console.error('[API] Request setup error', message)
    }

    return Promise.reject(
      new AppError({
        status,
        message,
        type,
        url,
        data: error.response?.data ?? null
      })
    )
  }
)

const createKeys = (name) => ({
  all: [name],
  lists: () => [name, 'list'],
  list: ({ params = {}, path = '' } = {}) => [name, 'list', path, params],
  records: () => [name, 'record'],
  record: ({id, params = {}, path = ''}) => [name, 'record', id, path, params],
})

const normalizePath = (path = '') => {
  if(!path) return ''
  return path.startsWith('/') ? path : `/${path}`
}

/**
 * @typedef {Omit<
 * import('@tanstack/react-query').UseQueryOptions<
 *   any,
 *   AppError,
 *   any,
 *   readonly unknown[]
 * >,
 * 'queryKey' | 'queryFn'>} UseQueryOptions
 */
/**
 * @param {string} name
 * @param {{
 *  idKey?: string,
 * }} config
 */
const createCRUD = (
  name,
  {
    idKey = 'id',
  } = {}
) => {
  const basePath = `/${name}`
  const keys = createKeys(name)

  /**
   * @typedef {Object} GetListArgs
   * @property {Record<string, any>} [params]
   * @property {string} [path]
   */
  /**
   * @param {GetListArgs} [settings] - Settings for the API
   * @param {UseQueryOptions} [options] - Query options
   */
  const useGetList = (settings = {}, options = {}) => {
    const {params = {}, path = ''} = settings
    const normalizedPath = normalizePath(path)

    return useQuery({
      queryKey: keys.list({params, path: normalizedPath}),
      queryFn: ({ signal }) => api.get(`${basePath}${normalizedPath}`, { params, signal }).then(r => r.data),
      ...options
    })
  }
  /**
   * @typedef {Object} GetRecordArgs
   * @property {string | number} id
   * @property {Record<string, any>} [params]
   * @property {string} [path]
   */
  /**
   * @param {GetRecordArgs} settings - Settings for the API
   * @param {UseQueryOptions} [options] - Query options
   */
  const useGetById = (settings, options = {}) => {
    const {id, params = {}, path = ''} = settings || {}
    const normalizedPath = normalizePath(path)

    return useQuery({
      queryKey: keys.record({id, params, path: normalizedPath}),
      queryFn: ({ signal }) => {
        if(id == null) throw new Error('Missing id')

        return api.get(`${basePath}/${id}${normalizedPath}`, { params, signal }).then(r => r.data)
      },
      enabled: typeof id === 'string' || typeof id === 'number',
      ...options
    })
  }
  const useAddData = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
      /**
       * @param {any} data
       */
      mutationFn: (data) => api.post(basePath, data).then(r => r.data), 
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: keys.lists() })
        const prevLists = queryClient.getQueriesData({ queryKey: keys.lists() })

        const tempId = crypto.randomUUID()

        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old
          return [...old, { ...newData, [idKey]: tempId, _optimistic: true }]
        })

        return { prevLists, tempId }
      },
      onError: (err, variables, context) => {
        if(axios.isCancel(err)) return

        context?.prevLists?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSuccess: (serverData, variables, context) => {
        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old

          return old.map((item) => item[idKey] === context.tempId ? serverData : item)
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: keys.lists() })
      },
      ...options,
    })
  }
  /**
   * @typedef {Object} UpdateDataVariables
   * @property {String | Number} id
   * @property {Object} [data]
   */
  const useUpdateData = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
      /**
       * @param {UpdateDataVariables} data
       */
      mutationFn: async ({ id, data }) => {
        return api.put(`${basePath}/${id}`, data).then(r => r.data)
      },
      /**
       * @param {UpdateDataVariables} data
       */
      onMutate: async ({ id, data }) => {
        await queryClient.cancelQueries({ queryKey: keys.record({ id }) })

        const prevRecord = queryClient.getQueryData(keys.record({ id }))
        const prevLists = queryClient.getQueriesData({ queryKey: keys.lists() })

        queryClient.setQueryData(keys.record({ id }), (old) => {
          if(!old || typeof old !== 'object') return old

          return { ...old, ...data, _optimistic: true }
        })
        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old
          return old.map((item) => item[idKey] === id ? { ...item, ...data, _optimistic: true } : item)
        })

        return { prevRecord, prevLists }
      },
      onError: (err, variables, context) => {
        if(axios.isCancel(err)) return

        const { id } = variables

        if(context?.prevRecord !== undefined)
          queryClient.setQueryData(keys.record({ id }), context.prevRecord)

        context?.prevLists?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSuccess: (serverData, variables) => {
        const { id } = variables

        queryClient.setQueryData(keys.record({ id }), serverData)

        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old

          return old.map((item) => item[idKey] === id ? serverData : item)
        })
      },
      onSettled: (_data, _error, variables) => {
        queryClient.invalidateQueries({ queryKey: keys.record({ id: variables.id }) })
        queryClient.invalidateQueries({ queryKey: keys.lists() })
      },
      ...options
    })
  }
  const useDeleteData = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async (id) => {
        const ids = Array.isArray(id) ? id : [id]
        const isMultiple = ids.length > 1
        const path = isMultiple ? basePath : `${basePath}/${ids[0]}`
        const config = isMultiple ? { params: { ids } } : undefined
        return api.delete(path, config).then(r => r.data)
      },
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: keys.lists() })

        const ids = Array.isArray(id) ? id : [id]
        const prevLists = queryClient.getQueriesData({ queryKey: keys.lists() })
        const prevRecords = ids.map((id) => [id, queryClient.getQueryData(keys.record({ id }))])

        ids.forEach((id) => queryClient.setQueryData(keys.record({ id }), null))

        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old
          return old.filter((item) => !ids.includes(item[idKey]))
        })

        return { prevLists, prevRecords }
      },
      onError: (err, _variables, context) => {
        if(axios.isCancel(err)) return

        context?.prevRecords?.forEach(([id, data]) => {
          if(data !== undefined) queryClient.setQueryData(keys.record({ id }), data)
        })
        context?.prevLists?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: keys.lists() })
      },
      ...options,
    })
  }

  return {
    keys,
    getList: useGetList,
    getById: useGetById,
    addData: useAddData,
    updateData: useUpdateData,
    deleteData: useDeleteData
  }
}

export const productService = createCRUD('product')
export const cartService = createCRUD('cart')

/*
useQuery({
  staleTime               [time until the data becomes stale (ms)]
  gcTime                  [controls how long data stays in memory (ms)]
  refetchOnWindowFocus    [Boolean]
  refetchOnReconnect      [Boolean]
  refetchInterval         [automatic refetch based on interval (ms)]
  
  placeholderData
  keepPreviousData
})
prefetching
*/