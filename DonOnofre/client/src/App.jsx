import './App.css'
import { Cart } from './components/Cart';
import { CartProvider } from './context/cart';
import { ProductList } from './components/ProductList';
import { Header } from './components/Header';
import { UserProvider } from './context/user';


function App() {

  return (
    <CartProvider>
      <UserProvider>
        <Header/>
        <ProductList/>
        <Cart/>
      </UserProvider>
    </CartProvider>
  )
}

export default App
