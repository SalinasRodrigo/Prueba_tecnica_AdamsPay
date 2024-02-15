/* eslint-disable react/prop-types */

import { useId } from "react";
import { CartIcon, ClearCartIcon, PayIcon } from "./Icons";
import "./Cart.css";
import { useCart } from "../hooks/useCart";

const API_KEY = 'ap-ca19841501670f92e938b685' 
const PAY_END_POINT = 'https://staging.adamspay.com/api/v1/debts'

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart} >+</button>
      </footer>
    </li>
  );
}


export const Cart = () => {
  const {cart, addToCart, clearCart} = useCart()
  const cartCheckBox = useId();

  const handlePay = () => {
    let total = 0
    let description = ''
    cart.forEach(item => {
      total += item.price * item.quantity
      description += `${item.title} qty: ${item.quantity} - `
    });
    console.log(description, total)

    const inicio_validez = new Date()
    const fin_validez = new Date()
    fin_validez.setDate(fin_validez.getDate() + 2)
    const idDeuda = "demo005"
    const siExiste = "update"
    const debt = {
      "docId": idDeuda,
      "amount": {"currency": "PYG","value": total},
      "label": description,
      "validPeriod":{
        "start":inicio_validez.toISOString(),
        "end":fin_validez.toISOString(),
      }
    }
    const headers = {
      'apikey': API_KEY,
      'Content-Type': 'application/json',
      'x-if-exists': siExiste,
    }
    console.log(headers, debt)

    fetch(PAY_END_POINT,{
      method: 'POST',
      cache: 'no-cache',
      headers: headers,
      body: debt,
    }).then(res => {
      console.log(res)
    })
  }

  return(
    <>
      <label className="cart-button" htmlFor={cartCheckBox}>
        <CartIcon />
      </label>
      <input id={cartCheckBox} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              {...product}
              addToCart={() => addToCart(product)}
            />
          ))}
        </ul>
        <div className="cart-footer-btns">
          <button onClick={clearCart}>
            <ClearCartIcon/>
          </button>
          <button onClick={handlePay}>
            <PayIcon/>
          </button>
        </div>
      </aside>
    </>
  )
}