
// import React, { useState, useContext, useEffect } from 'react';
// import { TextField, MenuItem, Button, Grid, FormControl, InputLabel, Select, Typography, Paper } from '@mui/material';
// import { createOrders } from '../services/apiServices';
// import ProductContext from '../context/ProductContext';

// const initialFormState = {
//   user: '',
//   products: [{ product: '', quantity: 1, price: 0 }],
//   totalPrice: 0,
//   shippingAddress: { address: '', city: '', state: '', zip: '', phonenumber: '' },
//   billingAddresses: [{ address: '', city: '', state: '', zip: '', phonenumber: '' }],
//   deliveryDate: '',
//   status: 'Processing'
// };

// const OrderForm = () => {
//   const [formState, setFormState] = useState(initialFormState);
//   const { products,orderProductId } = useContext(ProductContext);

//   const handleProductChange = (e, index) => {
//     const { name, value } = e.target;
//     const newProducts = [...formState.products];

//     if (name === 'product') {
//       const selectedProduct = products.find(product => product._id === value);
//       newProducts[index] = {
//         ...newProducts[index],
//         product: value,
//         price: selectedProduct ? selectedProduct.price : 0
//       };
//     } else if (name === 'quantity') {
//       newProducts[index] = {
//         ...newProducts[index],
//         quantity: Number(value),
//         price: newProducts[index].price
//       };
//     }

//     setFormState((prev) => ({
//       ...prev,
//       products: newProducts,
//       totalPrice: newProducts.reduce((total, product) => total + (product.price * product.quantity), 0)
//     }));
//   };

//   const handleAddProduct = () => {
//     setFormState((prev) => ({
//       ...prev,
//       products: [...prev.products, { product: '', quantity: 1, price: 0 }]
//     }));
//   };

//   const handleRemoveProduct = (index) => {
//     const newProducts = [...formState.products];
//     newProducts.splice(index, 1);
//     setFormState((prev) => ({
//       ...prev,
//       products: newProducts,
//       totalPrice: newProducts.reduce((total, product) => total + (product.price * product.quantity), 0)
//     }));
//   };

//   const handleAddressChange = (e, addressType) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({
//       ...prev,
//       [addressType]: { ...prev[addressType], [name]: value }
//     }));
//   };

//   const handleBillingAddressChange = (e, index) => {
//     const { name, value } = e.target;
//     const newBillingAddresses = [...formState.billingAddresses];
//     newBillingAddresses[index][name] = value;
//     setFormState((prev) => ({ ...prev, billingAddresses: newBillingAddresses }));
//   };

//   const handleAddBillingAddress = () => {
//     setFormState((prev) => ({
//       ...prev,
//       billingAddresses: [...prev.billingAddresses, { address: '', city: '', state: '', zip: '', phonenumber: '' }]
//     }));
//   };

//   const handleRemoveBillingAddress = (index) => {
//     const newBillingAddresses = [...formState.billingAddresses];
//     newBillingAddresses.splice(index, 1);
//     setFormState((prev) => ({ ...prev, billingAddresses: newBillingAddresses }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await createOrders(formState);
      

     
//       console.log('Order submitted successfully:',response.data);

//       setFormState(initialFormState);
//       alert('Order submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting order:', error.message);
//       alert('Error submitting order: ' + error.message);
//     }
//   };

//   return (
//     <Paper style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
//       <Typography variant="h4" gutterBottom>
//         Order Form
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="User ID"
//               name="user"
//               value={formState.user}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>

//           {formState.products.map((product, index) => (
//             <Grid item xs={12} key={index}>
//               <Typography variant="h6" gutterBottom>
//                 Product {index + 1}
//               </Typography>
//               <TextField
//                 label="Product ID"
//                 name="product"
//                 value={orderProductId}
//                 onChange={(e) => handleProductChange(e, index)}
//                 fullWidth
//                 required
             
//               >
//                 {/* {products.map((product) => (
//                   <MenuItem key={product._id} value={product._id}>
//                     {product.name}
//                   </MenuItem>
//                 ))} */}
//               </TextField>
//               <TextField
//                 label="Quantity"
//                 name="quantity"
//                 type="number"
//                 min={1}
//                 value={product.quantity}
//                 onChange={(e) => handleProductChange(e, index)}
//                 fullWidth
//                 required
//                 inputProps={{ min: 1 }}
//               />
//               <TextField
//                 label="Price"
//                 name="price"
//                 type="number"
//                 value={product.price}
//                 fullWidth
//                 disabled
//               />
//               <Button variant="contained" color="error" onClick={() => handleRemoveProduct(index)}>
//                 Remove Product
//               </Button>
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" onClick={handleAddProduct}>
//               Add Product
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Total Price"
//               name="totalPrice"
//               type="number"
//               value={formState.totalPrice}
//               onChange={handleChange}
//               fullWidth
//               required
//               disabled
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Shipping Address
//             </Typography>
//             <TextField
//               label="Address"
//               name="address"
//               value={formState.shippingAddress.address}
//               onChange={(e) => handleAddressChange(e, 'shippingAddress')}
//               fullWidth
//               required
//             />
//             <TextField
//               label="City"
//               name="city"
//               value={formState.shippingAddress.city}
//               onChange={(e) => handleAddressChange(e, 'shippingAddress')}
//               fullWidth
//               required
//             />
//             <TextField
//               label="State"
//               name="state"
//               value={formState.shippingAddress.state}
//               onChange={(e) => handleAddressChange(e, 'shippingAddress')}
//               fullWidth
//               required
//             />
//             <TextField
//               label="Zip Code"
//               name="zip"
//               value={formState.shippingAddress.zip}
//               onChange={(e) => handleAddressChange(e, 'shippingAddress')}
//               fullWidth
//               required
//             />
//             <TextField
//               label="Phone Number"
//               name="phonenumber"
//               value={formState.shippingAddress.phonenumber}
//               onChange={(e) => handleAddressChange(e, 'shippingAddress')}
//               fullWidth
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Billing Addresses
//             </Typography>
//             {formState.billingAddresses.map((address, index) => (
//               <Paper key={index} style={{ padding: 16, marginBottom: 16 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Address"
//                       name="address"
//                       value={address.address}
//                       onChange={(e) => handleBillingAddressChange(e, index)}
//                       fullWidth
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       label="City"
//                       name="city"
//                       value={address.city}
//                       onChange={(e) => handleBillingAddressChange(e, index)}
//                       fullWidth
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       label="State"
//                       name="state"
//                       value={address.state}
//                       onChange={(e) => handleBillingAddressChange(e, index)}
//                       fullWidth
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       label="Zip Code"
//                       name="zip"
//                       value={address.zip}
//                       onChange={(e) => handleBillingAddressChange(e, index)}
//                       fullWidth
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       label="Phone Number"
//                       name="phonenumber"
//                       value={address.phonenumber}
//                       onChange={(e) => handleBillingAddressChange(e, index)}
//                       fullWidth
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button variant="contained" color="error" onClick={() => handleRemoveBillingAddress(index)}>
//                       Remove Billing Address
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             ))}
//             <Button variant="contained" color="primary" onClick={handleAddBillingAddress}>
//               Add Billing Address
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               label="Delivery Date"
//               name="deliveryDate"
//               type="date"
//               value={formState.deliveryDate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 name="status"
//                 value={formState.status}
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="Processing">Processing</MenuItem>
//                 <MenuItem value="Shipped">Shipped</MenuItem>
//                 <MenuItem value="Delivered">Delivered</MenuItem>
//                 <MenuItem value="Cancelled">Cancelled</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" type="submit" fullWidth>
//               Submit Order
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// };

// export default OrderForm;

import React, { useState, useContext, useEffect } from 'react';
import { TextField, MenuItem, Card,Container, CardContent, CardMedia,  Button, Grid, FormControl, InputLabel, Select, Typography, Paper,CircularProgress, Snackbar, Alert, Box,
  Link } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { createOrders } from '../services/orderServices';
import ProductContext from '../context/ProductContext';
import AuthContext from '../context/AuthContext';
import { deleteCarts } from '../services/cartServices';
import { confirmAlert } from 'react-confirm-alert';



const OrderForm = () => {

  
 
  const { products, orderProductId, setOrderProductId ,setQuantity,quantity,cart,setCart,setCartlength} = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const {authToken}=useContext(AuthContext)
  const navigate = useNavigate();
  console.log(quantity);
  
  const initialFormState = {
  
    products: [{ product: '', quantity: quantity, price: 0 }],
    totalPrice: 0,
    shippingAddress: {
      address: '2/97',
      city: 'Salem',
      state: 'Tamilnadu',
      zip: '636001',
      phonenumber: '9876543210',
    },
    billingAddresses: [{ address: '', city: '', state: '', zip: '', phonenumber: '' }],
 
    status: 'Processing'
  };
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (orderProductId) {
      const selectedProduct = products.find(product => product._id === orderProductId);
      if (selectedProduct) {
        setFormState(prevState => ({
          ...prevState,
          products: [{ product: selectedProduct._id, quantity: quantity, price: selectedProduct.price }],
          totalPrice: selectedProduct.price* quantity.toFixed(2)
        }));
       
      }
    }
  }, []);

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const newProducts = [...formState.products];

    if (name === 'product') {
      const selectedProduct = products.find(product => product._id === value);
      newProducts[index] = {
        ...newProducts[index],
        product: value,
        price: selectedProduct ? selectedProduct.price : 0
      };
    } else if (name === 'quantity') {
      newProducts[index] = {
        ...newProducts[index],
        quantity: Number(value),
        price: newProducts[index].price
      };
    }

    setFormState(prev => ({
      ...prev,
      products: newProducts,
      totalPrice: newProducts.reduce((total, product) => total + (product.price * product.quantity), 0)
    }));
  };

  const handleAddProduct = () => {
    setFormState(prev => ({
      ...prev,
      products: [...prev.products, { product: '', quantity: 1, price: 0 }]
    }));
  };

  const handleRemoveProduct = (index) => {
    const newProducts = [...formState.products];
    newProducts.splice(index, 1);
    setFormState(prev => ({
      ...prev,
      products: newProducts,
      totalPrice: newProducts.reduce((total, product) => total + (product.price * product.quantity), 0)
    }));
  };

  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [addressType]: { ...prev[addressType], [name]: value }
    }));
  };

  const handleBillingAddressChange = (e, index) => {
    const { name, value } = e.target;
    const newBillingAddresses = [...formState.billingAddresses];
    newBillingAddresses[index][name] = value;
    setFormState(prev => ({ ...prev, billingAddresses: newBillingAddresses }));
  };

  const handleAddBillingAddress = () => {
    setFormState(prev => ({
      ...prev,
      billingAddresses: [...prev.billingAddresses, { address: '', city: '', state: '', zip: '', phonenumber: '' }]
    }));
  };

  const handleRemoveBillingAddress = (index) => {
    const newBillingAddresses = [...formState.billingAddresses];
    newBillingAddresses.splice(index, 1);
    setFormState(prev => ({ ...prev, billingAddresses: newBillingAddresses }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  const removeFromCart = async (productId) => {
    try {
      if(authToken){
        const response = await deleteCarts(productId);
      console.log(response.data);
      
      setCart(response.data); // Update cart state with the new data
      setCartlength(response.data.items.length)
      console.log(response.data.items.length,"response.data[0].items.length");
      
      }
      else{
        const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = localCartItems.filter(item => item.productId !== productId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCart(updatedCartItems);
   
        
        setCartlength(updatedCartItems.length);
      }
      
    } catch (error) {
      console.error('Error removing from cart:', error.response?.data.message

      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    confirmAlert({
      title: '',
      message: ' Available payment Method is Cash On Delivery?',
      buttons: [
          {
              label: 'Proceed',
              onClick: async () => {
                 
    try {

      const isInvalid = Object.values(formState).some(value => String(value).trim() === '');
      
      
      if (isInvalid) {
        setError('All fields are required and cannot be empty.');
        return; 
      }
            const response = await createOrders(formState);
            console.log('Order submitted successfully:', response.data);
            
            setFormState(initialFormState);
            setSuccess('Order submitted successfully!');
            console.log(formState.products[0].product,"res>>><<");
          await  removeFromCart(formState.products[0].product)
           
            // setSuccess('cart delete successfully!');
            
            setQuantity(1)
          setTimeout(()=>navigate('/order'),1000)  
          } catch (error) {
            console.error('Error submitting order:', error);
            setError('Error submitting order: ' + error.message);
          }
              },

              style: {
                backgroundColor: 'red', 
                color: 'white',   
              
              }
          },
          {
              label: 'Cancel',
              onClick: () => { setLoading(false) },

              style: {
                backgroundColor: 'blue', 
                color: 'white',   
              
              }
          }


          
      ]
  });







  };

  return (
    <Container className='mt-4'>

{loading && <CircularProgress color="inherit" />}
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => setError('')} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={!!success}
                    autoHideDuration={6000}
                    onClose={() => setSuccess('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => setSuccess('')} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
    <Paper style={{ padding: 20, maxWidth: 600, margin: 'auto' ,marginBottom:'40px',marginTop:'40px'}}>
      <Typography variant="h4" gutterBottom textAlign='center'>
        Order Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <TextField
              label="User ID"
              name="user"
              value={formState.user}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid> */}

          {formState.products.map((product, index) => (
            <Grid item xs={12}  key={index}>
              <Typography variant="h6" gutterBottom>
                Product {index + 1}
              </Typography>
              <TextField
                label="Product"
                name="product"
                value={product.product}
                onChange={(e) => handleProductChange(e, index)}
                fullWidth
                required
                select
                sx={{ mb: 2 }}
              >
                {products
                  .filter((prod) => prod._id === product.product) 
                  .map((prod) => (
                    <MenuItem key={prod._id} value={prod._id}>
                      {prod.name}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                min={1}
                value={product.quantity}
                onChange={(e) => handleProductChange(e, index)}
                fullWidth
                required
                InputProps={{
                  inputProps: { min: 1 , max: 10} 
                 
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={product.price}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              {/* <Button variant="contained" color="warning" onClick={() => handleRemoveProduct(index)}>
                Remove Product
              </Button> */}
            </Grid>
          ))}
          <Grid item xs={12}>
            {/* <Button variant="contained" color="primary" onClick={handleAddProduct}>
              Add Product
            </Button> */}
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Total Price"
              name="totalPrice"
              type="number"
              value={formState.totalPrice.toFixed(2)}
              fullWidth
              required
              disabled
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <TextField
              label="Address"
              name="address"
              value={formState.shippingAddress.address}
              onChange={(e) => handleAddressChange(e, 'shippingAddress')}
              fullWidth
              required
            />
            <TextField
              label="City"
              name="city"
              value={formState.shippingAddress.city}
              onChange={(e) => handleAddressChange(e, 'shippingAddress')}
              fullWidth
              required
            />
            <TextField
              label="State"
              name="state"
              value={formState.shippingAddress.state}
              onChange={(e) => handleAddressChange(e, 'shippingAddress')}
              fullWidth
              required
            />
            <TextField
              label="Zip Code"
              name="zip"
              value={formState.shippingAddress.zip}
              onChange={(e) => handleAddressChange(e, 'shippingAddress')}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phonenumber"
              value={formState.shippingAddress.phonenumber}
              onChange={(e) => handleAddressChange(e, 'shippingAddress')}
              fullWidth
              required
            />
          </Grid> */}

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
             Shipping Addresses
            </Typography>
            {formState.billingAddresses.map((address, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={address.address}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="City"
                    name="city"
                    value={address.city}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="State"
                    name="state"
                    value={address.state}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Zip Code"
                    name="zip"
                    value={address.zip}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phonenumber"
                    value={address.phonenumber}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                    inputProps={{ 
                      
                      inputMode: 'numeric',
                     
                      pattern: '[0-9]*'
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button variant="contained" color="warning" onClick={() => handleRemoveBillingAddress(index)}>
                    Remove Shipping Address
                  </Button>
                </Grid>
               
              </Grid>
             
            ))}
            <Button sx={{marginTop:'-12%',marginLeft:'50%'}} variant="contained" color="primary" onClick={handleAddBillingAddress}>
              Add Shipping Address 
            </Button>
             
          </Grid>





{/* 
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Billing Addresses
            </Typography>
            {formState.billingAddresses.map((address, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={address.address}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="City"
                    name="city"
                    value={address.city}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="State"
                    name="state"
                    value={address.state}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Zip Code"
                    name="zip"
                    value={address.zip}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phonenumber"
                    value={address.phonenumber}
                    onChange={(e) => handleBillingAddressChange(e, index)}
                    fullWidth
                    required
                    inputProps={{ 
                      
                      inputMode: 'numeric',
                     
                      pattern: '[0-9]*'
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button variant="contained" color="warning" onClick={() => handleRemoveBillingAddress(index)}>
                    Remove Billing Address
                  </Button>
                </Grid>
               
              </Grid>
             
            ))}
            <Button sx={{marginTop:'-12%',marginLeft:'50%'}} variant="contained" color="primary" onClick={handleAddBillingAddress}>
              Add Billing Address
            </Button>
             
          </Grid> */}

          {/* <Grid item xs={12}>
            <TextField
              label="Delivery Date"
              name="deliveryDate"
              type="date"
              value={formState.deliveryDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid> */}

          <Grid item xs={12}>
            <TextField
              label="Order Status"
              name="status"
              value={formState.status}
              onChange={handleChange}
              fullWidth
              required
              select
             sx={{ display: 'none' }}
            >
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>
         
          <Grid item xs={12} >
          <Box display="flex" justifyContent="space-between">
           
           
            <Button  variant="contained" color="secondary"   onClick={() => navigate ('/')}>
             Cancel
            </Button>

            <Button type="submit" variant="contained" color="error">
              Submit Order
            </Button>
            </Box>

          </Grid>
 

        </Grid>
      </form>
    </Paper>
    </Container>
  );
};

export default OrderForm;
