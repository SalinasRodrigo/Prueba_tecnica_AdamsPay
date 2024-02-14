/* eslint-disable react/prop-types */

import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import "./Cart.css";

function CartItem({ thumbnail, price, title }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty:</small>
        <button >+</button>
      </footer>
    </li>
  );
}


export const Cart = ({cart}) => {
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
            />
          ))}
        </ul>
        <button>
          <ClearCartIcon/>
        </button>
      </aside>
    </>
  )
}