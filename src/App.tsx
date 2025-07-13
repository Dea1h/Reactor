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
import { FilterContext, FilterSettings } from './components/context';
import { useState } from 'react';

function App() {

  const [filters, setFilters] = useState<FilterSettings>({
    gender: null,
    image_id: null,
    min_age: null,
    max_age: null,
    min_price: null,
    max_price: null,
    size_group: null,
    type: null,
  });

  return (
    <>
      <FilterContext.Provider value={{ filters, setFilters }}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product' element={<Product />} />
          </Routes>
        </Router>
      </FilterContext.Provider>
    </>
  );
}

export default App;
