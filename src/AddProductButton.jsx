// AddProductButton.js
import React from 'react';
import { Button } from '@material-ui/core';

const AddProductButton = ({ onAddProduct }) => {
  return (
    <Button onClick={onAddProduct} variant='contained' color='secondary'>Add Product</Button>
  );
};

export default AddProductButton;