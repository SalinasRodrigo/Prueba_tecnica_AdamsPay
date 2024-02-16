import './App.css'
import { Cart } from './components/Cart';
import { CartProvider } from './context/cart';
import { ProductList } from './components/ProductList';
import { Header } from './components/Header';


function App() {

  return (
    <CartProvider>
      <Header/>
      <ProductList/>
      <Cart/>
    </CartProvider>
  )
}

export default App
