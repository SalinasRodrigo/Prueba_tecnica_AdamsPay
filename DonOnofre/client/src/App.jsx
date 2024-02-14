import { useState } from 'react';
import './App.css'
import products from './mooks/products.json';
import { Product } from './components/Product';
import { Cart } from './components/Cart';


function App() {
  const [productos, setProductos] = useState(products.products)
  const [cart, setCart] = useState([])

  return (
    <>
      <div className='product-list'>
        {productos.map(item => {
          return(
            <div key={item.id}>
              <Product product={item}/>
            </div>
          )    
        })}
      </div>
      <Cart cart={cart}/>
    </>
  )
}

export default App
