/* eslint-disable react/prop-types */
import './Product.css'

export const Product = ({product}) => {


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
        <button>Add</button>
      </div>
    </div>
  )
}