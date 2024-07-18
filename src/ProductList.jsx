import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProductItem from './ProductItem';
import './list.css';
import AddProductButton from './AddProductButton';

const ProductList = ({ products, setProducts, setPickerOpen, setProductIndex }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable-products">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="mainlist container">
            <div className="header">
              <div>Title</div>
              <div>Discount</div>
            </div>
            {products.map((product, index) => (
              <Draggable key={product.id} draggableId={product.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ProductItem
                      index={index}
                      product={product}
                      updateProductDiscount={updateProductDiscount}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <AddProductButton onAddProduct={handleAddProduct} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProductList;
