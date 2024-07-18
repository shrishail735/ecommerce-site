import React, { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  List,
  ListItem,
  Checkbox,
  Button,
  ListItemText,
   
} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import dataProducts from "./product.json";
import "./picker.css";
const ProductPicker = ({ open, onClose, onSelectProducts, productList }) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch data from API (commented out due to CORS issues)
      // const response = await axios.get(`http://stageapi.monkcommerce.app/task/products/search?search=${query}&page=${page}`, {
      //   headers: {
      //     'x-api-key': '72njgfa948d9aS7gs5',
      //     'Content-Type': 'application/json',
      //   }
      // });
      // const data = response.data;

      // For now, we are using the local JSON data
      const modifiedData = dataProducts.map((product) => ({
        ...product,
        discount: null,
        disType: "%off",
        checked: false,
        partiallyChecked: false,
        variants: product.variants.map((variant) => ({
          ...variant,
          discount: null,
          disType: "%off",
          checked: false,
        })),
      }));
      setProducts((prevProducts) => [...modifiedData]);
    };

    if (open) {
      fetchProducts();
    }
  }, [open, query, page]);

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSelectProduct = (productId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          const newChecked = !product.checked;
          return {
            ...product,
            checked: newChecked,
            partiallyChecked: false,
            variants: product.variants.map((variant) => ({
              ...variant,
              checked: newChecked,
            })),
          };
        }
        return product;
      });
    });
  };

  const handleSelectVariant = (productId, variantId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          const updatedVariants = product.variants.map((variant) => {
            if (variant.id === variantId) {
              return { ...variant, checked: !variant.checked };
            }
            return variant;
          });
          const allVariantsChecked = updatedVariants.every(
            (variant) => variant.checked
          );
          const someVariantsChecked = updatedVariants.some(
            (variant) => variant.checked
          );
          return {
            ...product,
            checked: allVariantsChecked,
            partiallyChecked: !allVariantsChecked && someVariantsChecked,
            variants: updatedVariants,
          };
        }
        return product;
      });
    });
  };

  const handleConfirmSelection = () => {
    const filterSelected = products
      .filter((product) => product.checked || product.partiallyChecked)
      .map((product) => {
        return {
          ...product,
          variants: product.variants.filter((variant) => variant.checked),
        };
      });
    onSelectProducts(filterSelected);
    setSelectedProducts([]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <TextField
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div
        className="picker"
        onScroll={handleScroll}
        style={{ maxHeight: "400px", overflow: "auto" }}
      >
        {products.map((product) => (
          <div>
            <div className="list" key={product.id}>
              <Checkbox
                checked={product.checked}
                indeterminate={product.partiallyChecked}
                onChange={() => handleSelectProduct(product.id)}
              />
              <div>{product.title}</div>
              
            </div>
            <Divider />
            <div>
              {product.variants.map((variant) => (
                <div>
                <div
                  className="list"
                  key={variant.id}
                  style={{ marginLeft: "20px" }}
                >
                  <Checkbox
                    checked={variant.checked}
                    onChange={() => handleSelectVariant(product.id, variant.id)}
                  />
                  <div>{variant.title}</div>
                  <div className="price">{variant.price}</div>
                </div>
                 <Divider/>
                 </div>
               
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleConfirmSelection}>Confirm</Button>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
  );
};

export default ProductPicker;
