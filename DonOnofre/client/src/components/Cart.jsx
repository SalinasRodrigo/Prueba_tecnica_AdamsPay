/* eslint-disable react/prop-types */

import { useId } from "react";
import { CartIcon, ClearCartIcon, PayIcon } from "./Icons";
import "./Cart.css";
import { useCart } from "../hooks/useCart";

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
          <button>
            <PayIcon/>
          </button>
        </div>
      </aside>
    </>
  )
}