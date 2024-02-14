import './App.css'
import { Cart } from './components/Cart';
import { CartProvider } from './context/cart';
import { ProductList } from './components/ProductList';


function App() {

  return (
    <CartProvider>
      <ProductList/>
      <Cart/>
    </CartProvider>
  )
}

export default App
