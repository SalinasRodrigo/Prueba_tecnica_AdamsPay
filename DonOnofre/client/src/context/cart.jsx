/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import products from '../mooks/products.json';

export const CartContext = createContext()

export function CartProvider({children}){
  const [cart, setCart] = useState([])
  const [productos, setProductos] = useState(products.products) 

  const addToCart = product => {

    const productCartIndex = cart.findIndex(item => item.id === product.id)

    if (productCartIndex >= 0){
      const newCart = structuredClone(cart)
      newCart[productCartIndex].quantity += 1
      setCart(newCart)
    }else{
      setCart(prevState => ([
        ...prevState,{
          ...product,
          quantity: 1
        }
      ]))
    }
  }

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  const clearCart = () => {
    setCart([])
  }

  return(
    <CartContext.Provider value={{
      cart,
      productos,
      setProductos,
      addToCart,
      clearCart,
      removeFromCart
    }}>
      {children}
    </CartContext.Provider>
  )

} 