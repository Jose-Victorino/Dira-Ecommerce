import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const appURL = import.meta.env.VITE_API_URL || 'http://localhost:5500'
const api = axios.create({ baseURL: `${appURL}/api` })

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if(axios.isCancel(error)) return Promise.reject(error)

    // Error logging
    const status = error.response?.status
    const message = error.response?.data?.message ?? error.message

    switch (status){
      case 401:
        // e.g. redirect to login, clear auth store
        console.warn('[API] Unauthorized — redirecting to login')
        // router.push('/login')
        break
      case 403:
        console.warn('[API] Forbidden')
        break
      case 404:
        console.warn(`[API] Not found: ${error.config?.url}`)
        break
      case 422:
        console.warn('[API] Validation error', error.response?.data?.errors)
        break
      case 500:
        console.error('[API] Server error', message)
        break
      default:
        console.error('[API] Unexpected error', message)
    }

    error.userMessage = message
    return Promise.reject(error)
  }
)

// Query key factory
const createKeys = (name) => ({
  all: [name],
  lists: () => [name, 'list'],
  list: (params) => [name, 'list', params],
  records: () => [name, 'record'],
  record: (id) => [name, 'record', id],
})

// CRUD factory
const createCRUD = (name) => {
  const basePath = `/${name}`
  const keys = createKeys(name)

  const useGetList = (params = {}, options = {}) => (
    useQuery({
      queryKey: keys.list(params),
      queryFn: ({ signal }) => api.get(basePath, { params, signal }).then(r => r.data),
      ...options
    })
  )
  const useGetById = (id, options = {}) => (
    useQuery({
      queryKey: keys.record(id),
      queryFn: ({ signal }) => api.get(`${basePath}/${id}`, { signal }).then(r => r.data),
      enabled: !!id,
      ...options
    })
  )
  /**
   * @typedef {Object[any]} NewData
   * @property {string|number} [id]
   */
  const useAddData = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
      /**
       * @param {NewData} data
       */
      mutationFn: (data) => api.post(basePath, data).then(r => r.data),
      /**
       * @param {NewData} newData
       */
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: keys.all })
        const prev = queryClient.getQueriesData({ queryKey: keys.lists() })

        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old
          return [...old, { ...newData, _optimistic: true }]
        })

        return { prev }
      },
      onError: (err, newData, onMutateResult) => {
        if(axios.isCancel(err)) return

        onMutateResult?.prev?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
      ...options,
    })
  }
  /**
   * @typedef {Object} UpdateDataVariables
   * @property {string | number} id
   * @property {Object} [data]
   * @property {Object} [params]
   */
  const useUpdateData = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
      /**
       * @param {UpdateDataVariables} variables
       */
      mutationFn: async ({ id, data, params }) => {
        const config = params ? { params } : undefined
        return api.put(`${basePath}/${id}`, data, config).then(r => r.data)
      },
      /**
       * @param {UpdateDataVariables} variables
       */
      onMutate: async ({ id, data }) => {
        await queryClient.cancelQueries({ queryKey: keys.all })

        const prevRecord = queryClient.getQueryData(keys.record(id))
        const prevLists = queryClient.getQueriesData({ queryKey: keys.lists() })

        queryClient.setQueryData(keys.record(id), (old) => {
          if(!old || typeof old !== 'object') return old

          return old ? { ...old, ...data, _optimistic: true } : old
        })
        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old
          return old.map((item) =>
            item.id === id ? { ...item, ...data, _optimistic: true } : item
          )
        })

        return { prevRecord, prevLists }
      },
      onError: (err, { id }, onMutateResult) => {
        if(axios.isCancel(err)) return

        if(onMutateResult?.prevRecord !== undefined)
          queryClient.setQueryData(keys.record(id), onMutateResult.prevRecord)

        onMutateResult?.prevLists?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
      ...options,
    })
  }
  const useDeleteData = (options = {}) => {
    const queryClient = useQueryClient()
    
    return useMutation({
      mutationFn: async (id) => {
        const isMultiple = Array.isArray(id)
        const path = isMultiple ? basePath : `${basePath}/${id}`
        const config = isMultiple ? {
          params: { ids: id },
        } : undefined
        return api.delete(path, config).then(r => r.data)
      },
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: keys.all })

        const ids = Array.isArray(id) ? id : [id]
        const prevLists = queryClient.getQueriesData({ queryKey: keys.lists() })
        const prevRecords = ids.map((i) => [i, queryClient.getQueryData(keys.record(i))])

        ids.forEach((i) => queryClient.removeQueries({ queryKey: keys.record(i) }))
        queryClient.setQueriesData({ queryKey: keys.lists() }, (old) => {
          if(!Array.isArray(old)) return old
          return old.filter((item) => !ids.includes(item.id))
        })

        return { prevLists, prevRecords }
      },
      onError: (err, id, onMutateResult) => {
        if(axios.isCancel(err)) return

        onMutateResult?.prevRecords?.forEach(([i, data]) => {
          if(data !== undefined) queryClient.setQueryData(keys.record(i), data)
        })
        onMutateResult?.prevLists?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: keys.all }),
      ...options,
    })
  }

  return {
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