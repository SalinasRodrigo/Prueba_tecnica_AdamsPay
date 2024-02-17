/* eslint-disable react/prop-types */

import { useId } from "react";
import { CartIcon, ClearCartIcon, PayIcon } from "./Icons";
import "./Cart.css";
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export const Cart = () => {
  const { cart, addToCart, clearCart } = useCart();
  const { user } = useUser();
  const cartCheckBox = useId();

  const handlePay = () => {
    if(user===null){
      alert("inicie seción para realizar el para realizar el pago")
      return
    }
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    let total = 0;
    let description = "";
    let res = null;
    cart.forEach((item) => {
      total += item.price * item.quantity;
      description += `${item.title} qty: ${item.quantity} - `;
    });
    console.log(description, total);
    const debt = {
      description: description,
      value: total,
      id: user.id,
    };
    fetch("/api/pay/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(debt),
    })
      .then((response) => response.json())
      .then((response) => {
        res = response;
        console.log(response);
        window.location.replace(res.payUrl);
      });
    
  };

  return (
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
            <ClearCartIcon />
          </button>
          <button onClick={handlePay}>
            <PayIcon />
          </button>
        </div>
      </aside>
    </>
  );
};
