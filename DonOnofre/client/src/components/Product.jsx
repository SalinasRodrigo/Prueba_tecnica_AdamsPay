/* eslint-disable react/prop-types */
import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import './Product.css'

export const Product = ({product}) => {
  const {cart, addToCart, removeFromCart} = useCart()

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <div>
      <div key={product.id} className="product-card">
        <h5>{product.title}</h5>
        <div className='content'>
            <img src={product.thumbnail} alt={product.title} />
            <div className='text'>
              <small>{product.description}</small>
              <b>{product.price}</b>
            </div>
        </div>
        {checkProductInCart(product) ? 
          <button onClick={() => removeFromCart(product)}>
            <RemoveFromCartIcon/>
          </button>

        :
          <button onClick={() => addToCart(product)}>
            <AddToCartIcon/>
          </button>
        }
      </div>
    </div>
  )
}