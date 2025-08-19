import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem } from '@/lib/supabase'
import toast from 'react-hot-toast'

type CartContextType = {
  items: CartItem[]
  addToCart: (product: any) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: any) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.product_id === product.id)
      
      if (existingItem) {
        toast.success('Quantity updated in cart')
        return prev.map(item => 
          item.product_id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        toast.success('Added to cart')
        return [...prev, {
          product_id: product.id,
          product_name: product.name,
          product_image_url: product.image_url,
          price: product.price,
          quantity: 1
        }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.product_id !== productId))
    toast.success('Removed from cart')
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setItems(prev => 
      prev.map(item => 
        item.product_id === productId 
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}