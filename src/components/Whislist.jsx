


import React, {  useContext,useState, useEffect } from 'react';

import ProductContext from '../context/ProductContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent, CardMedia, Typography, TextField,Paper, Dialog, DialogContent, IconButton , Button, CircularProgress, Snackbar, Alert, Box,InputAdornment,
  Link
} from '@mui/material';
import { createWhislist, deleteWhislist, getWhislist } from '../services/whislistServices';
import { createCarts } from '../services/cartServices';




export default function Whislist  ()  {
 
  const{products,cart,setCart,cartlength, setCartlength ,whislistlength,setWhislistlength,setQuantity,orderProductId,setOrderProductId,productDetailsId,setProductDetails ,whislist,setWhislist}=useContext(ProductContext)
  const {authToken,userRole}=useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 const navigate=useNavigate()
 const localCartItems = JSON.parse(localStorage.getItem('cartItems')) 
 const [count ,setCount]=useState(1);

 console.log(localCartItems ,"localCartItems >>>");
 


  useEffect(() => {
   
    const fetchWhislist = async () => {
      try {
       
        if(!authToken){
          const response = await getWhislist();
          console.log(response.data, "fetch......."); 
        
          
          if (Array.isArray(response.data)) {
          
            const allItems = response.data.flatMap(wishlist => wishlist.items || []);
            setWhislist(allItems);
            setWhislistlength(allItems.length);


             console.log(allItems,"(allItemsLlj,kgmn");
             
                
             
         
                
             
                  
                  
              
                } 
                else {
                    console.log('Unexpected data format');
                  }

            }









        


            
          } 
        
          
        

      
      catch (error) {
        console.error('Error fetching whislist data:', error.response?.data?.message || error.message);
      }
    };

    fetchWhislist();

   
  }, []);

 
  const addToWhislist = async (productId, price) => {
    try {

     
      if(authToken){
      
        const response = await createWhislist(productId,price);
        console.log(response.data);
       
    
   
        const allItems = response.data.flatMap(wishlist => wishlist.items || []);
        setWhislist(allItems);
        setWhislistlength(allItems.length);
        }
       

      }
     



     catch (error) {
      console.error('Error adding to whislist:', error.response?.data?.message);
    }
  };


  const removeFromWhislist = async (productId) => {
    try {
        if (authToken) {
            const response = await deleteWhislist(productId);
            console.log(response.data);
            const allItems = response.data.flatMap(wishlist => wishlist.items || []);
            setWhislist(allItems);
            setWhislistlength(allItems.length);
      }
     
      
    } catch (error) {
      console.error('Error removing from whislist:', error.response?.data.message

      );
    }
  };
//   const handleBuyNow = async (productId,quantity) => {
//     setLoading(true);
//     try {
//         if(authToken){
       
//         console.log("orderform");
//         setOrderProductId(productId);
//         console.log(productId,"vctyhjki");
        
//         setQuantity(quantity)

    
//         // Delay navigation to ensure state update
    
        
//         navigate('/orderform')
        
//         setSuccess('Order placed successfully');
//     }
//     else{
//         navigate('/login')

//     }
//     } catch (error) {
//         console.log(error);
        
//         setError('Error placing order',error);
//     } finally {
//         setLoading(false);
//     }
// };
const  handleProductDetailPage=(produtID)=>
  {
    setProductDetails(produtID)
   navigate('/productdetails')
  }

  const addToCart = async (productId, quantity) => {
    try {

     
      if(authToken){
        if(quantity<11){
        const response = await createCarts(productId, quantity);
        console.log(response.data);
       
    
   
        setCart(response.data); 
  
        setCartlength(response.data[0].items.length)
        const responseWhislist = await deleteWhislist(productId);
          console.log(responseWhislist.data);
          const allItems = responseWhislist.data.flatMap(wishlist => wishlist.items || []);
          setWhislist(allItems);
          setWhislistlength(allItems.length);
        console.log(allItems,"responseWhislist.data[0].items.length");
        
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



  if(!whislistlength)
  {
    return <Typography  variant="h6" textAlign='center' marginTop='20px'>No Whislist Available</Typography>
  }

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
      {whislist?.map((item) => (
        <Grid item xs={12} sm={6} md={8} key={item._id}>
          <Card>
            <CardContent>
            <Grid container spacing={2}>
               
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
                 
                 
                }} >{item.product.product?.description || 'Unknown Product'}</Typography>
              
              <Typography variant="h6" textAlign='center'>Price:₹{(item.product.price).toFixed(2)}</Typography>
           
            <div className='grid grid-cols-2 ml-[30%] mt-2 space-x-4 w-64' >
            <Button
              variant="contained"
              color="primary"
              
              onClick={() => addToCart(item.product?._id, 1)}
            >
              Add 
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeFromWhislist(item.product._id)}
            >
              Remove
            </Button>
            </div>
            
            {/* <Button style={{ display: 'flex', gap: 'x6px', marginTop: '16px' ,marginLeft:'40%',width:'20%' }}
              variant="contained"
              color="error"
              onClick={() =>handleBuyNow(item.product._id,item.quantity)}
            >
             Buy
            </Button> */}
       
            </Grid>
            </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    }
    
    {/* <Grid container spacing={2} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' ,marginTop:'20px' }}>
      {products?.map((product) => {
        
        const cartItem = localCartItems?.find(lca => lca.productId === product._id);
      
        if (!cartItem) return null;

        return (
          <Grid item xs={12} sm={6} md={8} key={product._id}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
              
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
                    <Typography variant="h6"    inputprops={{
                  inputprops: { min: 1 , max: 10} 
                 
                }}>Quantity:{count}</Typography>
                    <Typography variant="h6" >Price: ${(product.price*count).toFixed(2)}</Typography>
                   
                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={() => addToCart(product._id, cartItem.quantity + 1)}
                        onClick={() => setCount(count+1)}
                      >
                        Add One More
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
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
    </Grid> */}
   
    </div>
    </>
  );
};

