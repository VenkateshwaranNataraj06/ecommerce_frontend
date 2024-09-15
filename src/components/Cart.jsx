
import React, {  useContext,useState, useEffect } from 'react';

import { getCarts, deleteCarts, createCarts } from '../services/cartServices';
import ProductContext from '../context/ProductContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, CardMedia, Typography, TextField,Paper, Dialog, DialogContent, IconButton , Button, CircularProgress, Snackbar, Alert, Box,InputAdornment,
  Link
} from '@mui/material';

import Cookies from 'js-cookie';


const Cart = () => {
 
  const{products,setProducts,cartlength, setCartlength ,cart, setCart,setQuantity,orderProductId,setOrderProductId,productDetailsId,setProductDetails}=useContext(ProductContext)
  const {authToken, setAuthToken,userRole}=useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 const navigate=useNavigate()
 const localCartItems = JSON.parse(localStorage.getItem('cartItems')) 
 const [count ,setCount]=useState(1);

 console.log(localCartItems ,"localCartItems >>>");
 
  console.log(cart,"cart from carjs");



  useEffect(() => {
    const isPageRefreshed = sessionStorage.getItem('isPageRefreshed');
    console.log(isPageRefreshed, "isPageRefreshedPKJJJJJJJJJ");

    if (isPageRefreshed) {

      const fetchProductLocal = async () => {
        console.log("fetch.......response.data,", authToken);
        try {

          const productlocalitems = JSON.parse(localStorage.getItem('productlocal')) || [];
        
          console.log(productlocalitems, "productlocalitemsPPPPPPPPPPPPPPPPPP");
       
          setProducts(productlocalitems)

        }







        catch (error) {
          console.log('Error fetching cart data:', error);
        }
      };

      fetchProductLocal();


      console.log('Page was refreshed');
    } else {

      console.log('Initial page load');
    }



    sessionStorage.setItem('isPageRefreshed', 'true');

    return () => {
      sessionStorage.removeItem('isPageRefreshed');
    };
  }, []);


  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if ( storedToken ) {
      console.log('Stored Token:',  storedToken ); 
      setAuthToken( storedToken );
    } else {
      console.log('No token found');
    }
  }, []);


  useEffect(() => {
   
    const fetchCart = async () => {
      try {
       console.log(authToken,"authTokenauthTokenauthToken");
       
        if(authToken){
          const response = await getCarts();
          console.log(response.data, "fetch.......");
        
          
          if (response.data && typeof response.data === 'object') {
            setCart(response.data[0]); 
          
  
            console.log(response.data[0].items.length,"response.data[0].items.length");
              setCartlength(response.data[0].items.length)
            
          } else {
            console.log('Unexpected data format');
          }
        
          
        }
        else{
          const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          setCart(localCartItems);
          setCartlength(localCartItems.length);
        }
      
      } catch (error) {
        console.error('Error fetching cart data:', error.response?.data?.message || error.message);
      }
    };

    fetchCart();

   
  }, [authToken]);


  const addToCart = async (productId, quantity) => {
    try {

     
      if(authToken){
        if(quantity<11){
        const response = await createCarts(productId, quantity);
        console.log(response.data);
       
    
   
        setCart(response.data); 
  
        setCartlength(response.data[0].items.length)
        }
        else{
          setError("maximum quantity limit is 10")
          return
        }

      }else {
     
        const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = localCartItems.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
          localCartItems[itemIndex].quantity += quantity;
        } else {
          localCartItems.push({ productId, quantity });
        }
        localStorage.setItem('cartItems', JSON.stringify(localCartItems));
        setCart(localCartItems);
      console.log(localCartItems,"localCartItems>>>>>");
      
        setCartlength(localCartItems.length);
      }
     



    } catch (error) {
      console.error('Error adding to cart:', error.response?.data?.message);
    }
  };


  const removeFromCart = async (productId) => {
    try {
      if(authToken){
        const response = await deleteCarts(productId);
      console.log(response.data);
      
      setCart(response.data); 
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
  const handleBuyNow = async (productId,quantity) => {
    setLoading(true);
    try {
        if(authToken){
       
        console.log("orderform");
        setOrderProductId(productId);
        console.log(productId,"vctyhjki");
        
        setQuantity(quantity)

    
      
    
        
        navigate('/orderform')
        
        setSuccess('Order placed successfully');
    }
    else{
        navigate('/login')

    }
    } catch (error) {
        console.log(error);
        
        setError('Error placing order',error);
    } finally {
        setLoading(false);
    }
};
const  handleProductDetailPage=(produtID)=>
  {
    setProductDetails(produtID)
   navigate('/productdetails')
  }

 console.log(products,"products");
 
  return (
  
  <>
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

      <div className='mb-10'>

  {authToken&&userRole!=='admin'&&  <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' ,marginTop:'10px'}}>
      {cart?.items?.map((item) => (
        <Grid item xs={12} sm={6} md={8} key={item._id}>
          <Card>
            <CardContent>
            <Grid container spacing={2}>
                {/* Image Section */}
                <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
              <CardMedia
                component="img"
                style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                image={item.product?.images[0] || "https://via.placeholder.com/150"}
                alt={item.product?.name}
                onClick={()=>handleProductDetailPage(item.product._id)}
                
              />
                </Grid>
                <Grid item xs={12} sm={8}>
              <Typography variant="h6"
                style={{
                 
                 
                }} >{item.product?.description || 'Unknown Product'}</Typography>
              <Typography variant="h6" textAlign='center'
                inputprops={{
                  inputprops: { min: 1 , max: 10} 
                 
                }}
              >
                
                Quantity: {item.quantity}
              
              
              </Typography>
              <Typography variant="h6" textAlign='center'>Price:₹{(item.price*item.quantity).toFixed(2)}</Typography>
           
            <div className='grid grid-cols-2 ml-[30%] mt-2 space-x-4 w-64 max-400:ml-[10%]  ' >
            <Button
              variant="contained"
              color="primary"
              
              onClick={() => addToCart(item.product?._id, item.quantity + 1)}
            >
              Add 
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeFromCart(item.product._id)}
            >
              Remove
            </Button>
            </div>
            
            <Button style={{ display: 'flex', gap: 'x6px', marginTop: '16px' ,marginLeft:'40%',width:'20%' }}
              variant="contained"
              color="error"
              onClick={() =>handleBuyNow(item.product._id,item.quantity)}
            >
             Buy
            </Button>
       
            </Grid>
            </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    }
    
    <Grid container spacing={2} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' ,marginTop:'20px' }}>
      {products?.map((product) => {
        
        const cartItem = localCartItems?.find(lca => lca.productId === product._id);

      
        if (!cartItem) return null;

        return (
          <Grid item xs={12} sm={6} md={8} key={product._id}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  {/* Image Section */}
                  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                      image={product.images[0] || "https://via.placeholder.com/150"}
                      alt={product.name}
                    />
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" >{product.description || 'Unknown Product'}</Typography>
                    {/* <Typography variant="h6"    inputprops={{
                  inputprops: { min: 1 , max: 10} 
                 
                }}>Quantity:{count}</Typography> */}
                    <Typography variant="h6" >Price: ₹{(product.price).toFixed(2)}</Typography>
                  
                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                      {/* <Button
                        variant="contained"
                        color="primary"
                        // onClick={() => addToCart(product._id, cartItem.quantity + 1)}
                        onClick={() => setCount(count+1)}
                      >
                        Add One More
                      </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => removeFromCart(product._id)}
                      >
                        Remove
                      </Button>
                      <Button 
                        variant="contained"
                        color="secondary"
                        onClick={() => handleBuyNow(product._id, cartItem.quantity)}
                      >
                        Buy
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>

    {!loading&&cart.length===0 &&
   <Typography  variant="h6" textAlign='center' marginTop='20px'>No Carts Available</Typography>
  }

   
    </div>
    </>
  );
};

export default Cart;
