/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];
export const CartContext = createContext()

export function CartProvider({children}){
  const [cart, setCart] = useState(cartInitialState)
  const [productos, setProductos] = useState([])

  useEffect(()=>{
    getProducts()
  }, [])

  const getProducts = ()=> {
    fetch('/api/products/')
      .then(res => res.json())
      .then(response => {
        const products = response
        console.log(products)
        setProductos(products)
      })
  }

  const addToCart = product => {

    const productCartIndex = cart.findIndex(item => item.id === product.id)

    if (productCartIndex >= 0){
      const newCart = structuredClone(cart)
      newCart[productCartIndex].quantity += 1
      setCart(newCart)
      window.localStorage.setItem('cart', JSON.stringify(newCart))
    }else{
      const newCart = [
        ...cart,{
          ...product,
          quantity: 1
        }
      ]
      setCart(newCart)
      window.localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  const removeFromCart = product => {
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = () => {
    setCart([])
    window.localStorage.setItem('cart', JSON.stringify([]))
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