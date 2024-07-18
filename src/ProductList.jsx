import React from 'react';
import ProductItem from './ProductItem';
import './list.css';
import AddProductButton from './AddProductButton';

const ProductList = ({ products, setProducts, setPickerOpen, setProductIndex }) => {
  const onDragStart = (event, index) => {
    event.dataTransfer.setData('index', index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, index) => {
    const draggedIndex = event.dataTransfer.getData('index');
    const updatedProducts = [...products];
    const [draggedProduct] = updatedProducts.splice(draggedIndex, 1);
    updatedProducts.splice(index, 0, draggedProduct);
    setProducts(updatedProducts);
  };

  const handleEdit = (productIndex) => {
    setProductIndex(productIndex);
    setPickerOpen(true);
  };

  const handleDelete = (productID, variantId) => {
    setProducts(products.map((product) => {
      if (product.id === productID) {
        return {
          ...product,
          variants: product.variants.filter((variant) => variant.id !== variantId),
        };
      }
      return product;
    }));
  };

  const updateProductDiscount = (productId, discountValue, discountType, variantId = null) => {
    setProducts(products.map((product) => {
      if (product.id === productId) {
        if (variantId) {
          product.variants = product.variants.map((variant) => {
            if (variant.id === variantId) {
              return { ...variant, discount: discountValue, disType: discountType };
            }
            return variant;
          });
        } else {
          product.discount = discountValue;
          product.disType = discountType;
          product.variants = product.variants?.map((variant) => ({
            ...variant,
            discount: discountValue,
            disType: discountType,
          }));
        }
      }
      return product;
    }));
  };

  const handleAddProduct = () => {
    const lastId = products[products.length - 1].id;
    setProducts([...products, { title: 'select product', id: lastId + 1 }]);
  };

  return (
    <div className="mainlist container">
      <div className="header">
        <div>Title</div>
        <div>Discount</div>
      </div>
      {products.map((product, index) => (
        <div
          key={product.id}
          draggable
          onDragStart={(event) => onDragStart(event, index)}
          onDragOver={onDragOver}
          onDrop={(event) => onDrop(event, index)}
        >
          <ProductItem
            index={index}
            product={product}
            updateProductDiscount={updateProductDiscount}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      ))}
      <AddProductButton onAddProduct={handleAddProduct} />
    </div>
  );
};

export default ProductList;
