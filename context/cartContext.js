import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import swal from 'sweetalert'

const cartContext = createContext({ items: [], total: 0 })

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  const addItem = (item) => {
    if (containsItem(item)) {
      item = items.find((i) => i.id == item.id)
      updateQty(item, item.qty + 1)
    } else {
      setItems([ ...items, { ...item, qty: 1 } ])
    }
    toast.success(`${item.title} adicionado ao seu carrinho.`, { position: 'bottom-center' })
  }

  const updateQty = (item, qty) => {
    setItems(
      items.map((i) => {
        if (i.id == item.id) {
          i.qty = qty
          return i
        }
        return i
      })
    )
  }

  const removeItem = (item) => {
    swal({
      title: 'Você deseja remover esse item ?',
      icon: 'warning',
      buttons: ['NÃO', 'SIM'],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) setItems(items.filter((i) => i.id != item.id))      
    })
  }

  const containsItem = (item) => items.length > 0 && items.filter((i) => i.id == item.id).length == 1

  useEffect(() => {
    if (!localStorage.getItem('cart')) return localStorage.setItem('cart', JSON.stringify({
      items: [],
      total: 0
    }))
    
    const cart = JSON.parse(localStorage.getItem('cart'))
    setItems(cart.items)
    setTotal(cart.total)
  }, [])
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items, total }))
  }, [items, total])
  
  useEffect(() => {
    let total = 0
    items.forEach((item) => total += item.price * item.qty)
    setTotal(total)
  }, [items])

  return (
    <cartContext.Provider value={{ items, setItems, total, addItem, containsItem, updateQty, removeItem }}>
      {children}
    </cartContext.Provider>
  )
}

export function useCart() { return useContext(cartContext) }