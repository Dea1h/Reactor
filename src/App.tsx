import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/home';
import Shop from './components/shop';
import Product from './components/product';
import Cart from './components/cart';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product' element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
