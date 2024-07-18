// // ProductItem.js
// import React, { useState } from 'react';
// import { Checkbox, TextField, Button, IconButton } from '@material-ui/core';
// import { Delete as DeleteIcon } from '@material-ui/icons';
// import EditIcon from '@material-ui/icons/Edit';
// // import EditIcon from '@mui/icons-material/Edit';

// const ProductItem = ({ product,setPickerOpen }) => {
//   console.log(product)
//   const [showVariants, setShowVariants] = useState(false);
//   const [disButton, setDisButton] = useState(false);
//   const [discountValue, setDiscountValue] = useState('');

//   const handleDiscount =(value)=>
//   {
    
//       product.discount=value;

//       product.variants=product.variants?.map((variant)=>{
//          variant.discount=value
//          return variant;
//         // return {...variant,discount:value};
//       })
      
//   }
//   const handleDisType=(value)=>{
//     product.disType=value;

//     product.variants=product.variants?.map(variant=>{
//       return variant.disType=value;
//     })
//   }
//   const handleAddDiscount = (event) => {
//     setDisButton(true);
//   //  product.disType=event.target.value;
//   };

//   return (
//     <div>
//       <div className='flex'>
//         <div>{product.title}<span><EditIcon onClick={() => setPickerOpen(true)}/></span></div>
//         {product.discount>0 || disButton? <div>
//           <input type='number'
//           label="Discount"
//           value={product.discount}
//           onChange={(e) => handleDiscount(e.target.value)}
//         />
//         <select name="disType" id="type" onChange={(e) => handleDisType(e.target.value)}>
//           <option value="%off">%off</option>
//           <option value="flat">flat</option>
//         </select>
//         </div>:<Button onClick={handleAddDiscount}>Add Discount</Button>}
      
//         <p onClick={() => setShowVariants(!showVariants)}>
//           {product.variants?.length>0 ? 'show/hide':''}
//         </p>
       

        
    
//       </div>
//       {showVariants && product.variants.map(variant => (
//         <div key={variant.id} style={{ marginLeft: '20px' }}>
//           <div className='flex'>
//         <div>{variant.title}</div>
//         {disButton? <div>
//           <TextField
//           label="Discount"
//           value={variant.discount}
//           onChange={(e) => {variant.discount = (e.target.value); console.log(variant.discount)}}
//         />
//         <select name="disType" id="type" onChange={(e) => variant.disType = (e.target.value)}>
//           <option value="%off">%off</option>
//           <option value="flat">flat</option>
//         </select>
//         </div>:''}
      
        
       

        
    
//       </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductItem;



// ProductItem.js
import React, { useState } from 'react';
import { Checkbox, TextField, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import './list.css'
import Button from '@material-ui/core/Button';
const ProductItem = ({ index , product, updateProductDiscount, handleEdit, handleDelete }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [disButton, setDisButton] = useState(false);
  const [discountValue, setDiscountValue] = useState(product.discount || '');
  const [discountType, setDiscountType] = useState(product.disType || '%off');

  const handleAddDiscount = () => {
    setDisButton(true);
  };

  const handleDiscountChange = (e) => {
    const newDiscount = e.target.value;
    setDiscountValue(newDiscount);
    updateProductDiscount(product.id, newDiscount, discountType);
  };

  const handleDiscountTypeChange = (e) => {
    const newDiscountType = e.target.value;
    setDiscountType(newDiscountType);
    updateProductDiscount(product.id, discountValue, newDiscountType);
  };
 const onhandleDelete=(productID,variantId)=>{
  handleDelete(productID,variantId);
 }
  return (
    <div className='listcontainer' draggable='true' >
     
      <div className='listItem'>
        <div className='heading'>{product.title}<span><EditIcon onClick={() => handleEdit(index)}/></span></div>
        {discountValue > 0 || disButton ? (
          <div className='discount'>
            <input
              type='number'
              label="Discount"
              value={discountValue}
              onChange={handleDiscountChange}
            />
            <select name="disType" id="type" value={discountType} onChange={handleDiscountTypeChange}>
              <option value="%off">%off</option>
              <option value="flat">flat</option>
            </select>
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddDiscount}>Add Discount</Button>
        )}
       
      </div>
      <p onClick={() => setShowVariants(!showVariants)}>
          {product.variants?.length > 0 ? <p className='variants'>{showVariants?'hide variant':'show variant'}</p> : ''}
        </p>
      {showVariants && product.variants.map(variant => (
        <div key={variant.id} style={{ marginLeft: '20px' }}>
          <div className='listItem'>
            <div className='variant heading'>{variant.title}</div>
            {disButton ? (
              <div className='discount variant'> 
                <input
                className='variant'
                 type = "number"
                  label="Discount"
                  value={variant.discount}
                  onChange={(e) => updateProductDiscount(product.id, e.target.value, discountType, variant.id)}
                />
                <select className='variant' name="disType" id="type" value={variant.disType} onChange={(e) => updateProductDiscount(product.id, variant.discount, e.target.value, variant.id)}>
                  <option value="%off">%off</option>
                  <option value="flat">flat</option>
                </select>
                
              </div>
            ) : ''}
             {product.variants.length>1?<div onClick={()=>onhandleDelete(variant.product_id,variant.id)}>X</div>:''}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;
