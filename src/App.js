import logo from './logo.svg';
import './App.css';

// App.js
import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductPicker from './ProductPicker';


const App = () => {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([{title:'select product',id:111}]);
  const [index,setProductIndex] =useState(0)
 

  const handleSelectProducts = (selectedProducts) => {
   
    const updatedProducts = [...products];
  updatedProducts.splice(index, 1, ...selectedProducts);

  // Set the new array as the state
  setProducts(updatedProducts);
  setPickerOpen(false);
  };

  return (
    <div>
      <ProductList products={products} setProducts={setProducts} setPickerOpen={setPickerOpen} setProductIndex={setProductIndex} />
      <ProductPicker open={isPickerOpen} onClose={() => setPickerOpen(false)} onSelectProducts={handleSelectProducts} productList={products} />
    </div>
  );
};

export default App;

