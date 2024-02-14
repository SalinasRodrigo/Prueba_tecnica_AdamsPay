import { useCart } from "../hooks/useCart"
import { Product } from "./Product"


export const ProductList = () => {
  const {productos} = useCart()

  return(
    <div className='product-list'>
      {productos.map(item => {
        return(
          <div key={item.id}>
            <Product product={item}/>
          </div>
        )    
      })}
    </div>
  )
}