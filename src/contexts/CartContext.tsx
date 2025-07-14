 import { createContext, useContext, useState, type ReactNode } from 'react'

// export interface CartItem {
//   id: string
//   name: string
//   price: number
//   originalPrice: number
//   discount: number
//   quantity: number
//   image_url?: string
//   category: string
// }

// interface CartContextType {
//   cartItems: CartItem[]
//   cartCount: number
//   totalPrice: number
//   addToCart: (item: CartItem) => void
//   removeFromCart: (itemId: string) => void
//   updateQuantity: (itemId: string, quantity: number) => void
//   clearCart: () => void
//   isCartOpen: boolean
//   toggleCart: () => void
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const [isCartOpen, setIsCartOpen] = useState(false)

//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
//   const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

//   const addToCart = (newItem: CartItem) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === newItem.id)
      
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === newItem.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       } else {
//         return [...prevItems, { ...newItem, quantity: 1 }]
//       }
//     })
//   }

//   const removeFromCart = (itemId: string) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
//   }

//   const updateQuantity = (itemId: string, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(itemId)
//       return
//     }
    
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === itemId ? { ...item, quantity } : item
//       )
//     )
//   }

//   const clearCart = () => {
//     setCartItems([])
//   }

//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen)
//   }

//   return (
//     <CartContext.Provider value={{
//       cartItems,
//       cartCount,
//       totalPrice,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart,
//       isCartOpen,
//       toggleCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider')
//   }
//   return context
// }
export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  quantity: number
  image_url?: string
  category: string
}

interface CartContextType {
  cartItems: CartItem[]
  quickCartItems: CartItem[] // Add QuickCart items
  cartCount: number
  quickCartCount: number
  totalPrice: number
  quickCartTotalPrice: number
  addToCart: (item: CartItem) => void
  addToQuickCart: (item: CartItem) => void // Add QuickCart functionality
  removeFromCart: (itemId: string) => void
  removeFromQuickCart: (itemId: string) => void // Remove from QuickCart
  updateQuantity: (itemId: string, quantity: number, isQuickCart?: boolean) => void
  clearCart: () => void
  clearQuickCart: () => void // Clear QuickCart
  isCartOpen: boolean
  isQuickCartOpen: boolean // Track QuickCart state
  toggleCart: () => void
  toggleQuickCart: () => void // Toggle QuickCart visibility
}
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [quickCartItems, setQuickCartItems] = useState<CartItem[]>([]) // State for QuickCart
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQuickCartOpen, setIsQuickCartOpen] = useState(false) // State for QuickCart visibility

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const quickCartCount = quickCartItems.reduce((total, item) => total + item.quantity, 0) // Count for QuickCart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const quickCartTotalPrice = quickCartItems.reduce((total, item) => total + item.price * item.quantity, 0) // Total for QuickCart

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  const addToQuickCart = (newItem: CartItem) => {
    setQuickCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const removeFromQuickCart = (itemId: string) => {
    setQuickCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number, isQuickCart = false) => {
    if (quantity <= 0) {
      isQuickCart ? removeFromQuickCart(itemId) : removeFromCart(itemId)
      return
    }

    if (isQuickCart) {
      setQuickCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      )
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const clearQuickCart = () => {
    setQuickCartItems([])
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const toggleQuickCart = () => {
    setIsQuickCartOpen(!isQuickCartOpen)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      quickCartItems,
      cartCount,
      quickCartCount,
      totalPrice,
      quickCartTotalPrice,
      addToCart,
      addToQuickCart,
      removeFromCart,
      removeFromQuickCart,
      updateQuantity,
      clearCart,
      clearQuickCart,
      isCartOpen,
      isQuickCartOpen,
      toggleCart,
      toggleQuickCart
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