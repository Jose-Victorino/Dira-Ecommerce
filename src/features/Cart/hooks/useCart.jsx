import { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from 'react'
import { cartService } from '@/service/crudService.tanstack'

const CartContext = createContext(null)

const DEBOUNCE_MS = 600

export function CartProvider({children}) {
  const addData = cartService.addData()
  const updateCart = cartService.updateData()
  const deleteCart = cartService.deleteData()
  const res = cartService.getList()

  const [localQuantities, setLocalQuantities] = useState({})
  const debounceTimers = useRef({})

  useEffect(() => {
    if(!res.data) return
    setLocalQuantities(prev => {
      const next = {}
      res.data.forEach(item => {
        const hasPendingUpdate = !!debounceTimers.current[item.id]
        next[item.id] = hasPendingUpdate ? (prev[item.id] ?? item.quantity) : item.quantity
      })
      return next
    })
  }, [res.data])

  useEffect(() => {
    return () => Object.values(debounceTimers.current).forEach(clearTimeout)
  }, [])

  const add = useCallback((variantId, quantity, callbacks = {}) => {
    addData.mutate({user_id: 1, variant_id: variantId, quantity}, {
      onSuccess: callbacks?.onSuccess,
      onError: callbacks?.onError,
    })
  }, [])

  const updateQuantity = useCallback((cartId, quantity, callbacks = {}) => {
    setLocalQuantities(prev => ({ ...prev, [cartId]: quantity }))

    if(debounceTimers.current[cartId])
      clearTimeout(debounceTimers.current[cartId])

    debounceTimers.current[cartId] = setTimeout(() => {
      updateCart.mutate({id: cartId, data: {quantity}}, {
        onSuccess: callbacks?.onSuccess,
        onError: callbacks?.onError,
      })
      delete debounceTimers.current[cartId]
    }, DEBOUNCE_MS)
  }, [updateCart])

  const remove = useCallback((cartId, callbacks = {}) => {
    deleteCart.mutate(cartId, {
      onSuccess: callbacks?.onSuccess,
      onError: callbacks?.onError,
    })
  }, [])

  const { data, totalQuantity, total } = useMemo(() => {
    const empty = { data: [], totalQuantity: 0, total: 0 }
    if (!res.data) return empty

    return res.data?.reduce((acc, item) => {
      const quantity = localQuantities[item.id] ?? item.quantity

      return {
        data: [...acc.data, { ...item, quantity }],
        totalQuantity: acc.totalQuantity + quantity,
        total: acc.total + item.price * quantity,
      }
    }, empty)
  }, [res.data, localQuantities])

  return (
    <CartContext.Provider value={{
      data,
      isLoading: res.isLoading,
      add,
      updateQuantity,
      remove,
      addStatus: {
        isPending: addData.isPending,
      },
      totalQuantity,
      total
    }}>
      {children}  
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)