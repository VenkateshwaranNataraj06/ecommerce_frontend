import React, { useState,useContext,useEffect,  } from 'react';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ProductContext from '../context/ProductContext';
import CategoriesContext from '../context/CategoryContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProducts, updateProducts, deleteProducts, createOrders,  createProducts,  } from '../services/apiServices';
import { createCarts, getCarts } from '../services/cartServices';
import { getCategories, addCategory } from '../services/categoryServices';
import {
    Container, Grid, Card, CardContent, CardMedia, Typography, TextField,Paper, Dialog, DialogContent, IconButton , Button, CircularProgress, Snackbar, Alert, Box,InputAdornment,
    Link
} from '@mui/material';
import ImageZoom from './ImageZoom';



const MovableImage = styled('img')({
  width: '40%',
  maxWidth: '120px', 
  cursor: 'pointer', 
  marginBottom: '1rem',
  height:'30%'

});


const ImageContainer = styled(Box)({
  height: '500px', 
  overflowY: 'auto',
});

const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '1rem',
});



const ProductDetails = () => {
  console.log("productsdetails.............");
  const {products,setProducts,orderProductId,setOrderProductId,cart, setCart,cartlength, setCartlength,quantity,setQuantity ,productDetailsId,setProductDetails,}=useContext(ProductContext)
  const { categories, setCategories } = useContext(CategoriesContext);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const navigate = useNavigate();
    const {authToken}=useContext(AuthContext)





useEffect(() => {
  const isPageRefreshed = sessionStorage.getItem('isPageRefreshed');
console.log(isPageRefreshed,"isPageRefreshedPKJJJJJJJJJ");

  if (isPageRefreshed) {

      const  fetchProductLocal = async () => {
          console.log( "fetch.......response.data,",authToken);
          try {

            const productlocalitems = JSON.parse(localStorage.getItem('productlocal')) || [];
            const produtID = (localStorage.getItem('prodid')) ;
              console.log(productlocalitems,"productlocalitemsPPPPPPPPPPPPPPPPPP",produtID);
              setProductDetails(produtID)
            setProducts(productlocalitems)
              
          }
                
            
            
              
            
           
          
           catch (error) {
            console.log('Error fetching cart data:', error);
          }
        };
    
        fetchProductLocal();

        const fetchCart = async () => {
          try {
            if (authToken) {
              const response = await getCarts();
              console.log(response.data, "fetch.......");
      
      
              if (response.data && typeof response.data === 'object') {
                setCart(response.data[0]); 
      
      
                console.log(response.data[0].items.length, "response.data[0].items.length");
                setCartlength(response.data[0].items.length)
      
              } else {
                console.log('Unexpected data format');
              }
      
            }
            else {
              const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
              setCart(localCartItems);
              setCartlength(localCartItems.length);
            }
      
          } catch (error) {
            console.error('Error fetching cart data:', error.response?.data?.message || error.message);
          }
        };
      
        fetchCart();
      
     
    console.log('Page was refreshed');
  } else {
    
    console.log('Initial page load');
  }
             


  sessionStorage.setItem('isPageRefreshed', 'true');

  return () => {
    sessionStorage.removeItem('isPageRefreshed');
  };
}, []);



  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };




  
  const handleAddToCart = async (productId, price) => {
       


    if (authToken) {
        try {
            const response = await createCarts(productId, price);
            setCartlength(response.data.items.length)
            console.log(response.data.items.length,"response.data[0].items.length");
            console.log(response);
            
            setSuccess('Product added to cart successfully');
        } catch (error) {
            console.log(error?.response?.data?.message, "cart error");
            setError('Error adding product to cart');
        }
    } else {
    
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push({ productId, price });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setCartlength(cartItems.length);
        setSuccess('Product added to cart successfully. Will sync after login.');
    }
};

const handleBuyNow = async (productId) => {
    setLoading(true);
    try {
        if(authToken){
          console.log(authToken,"kjhhjvgh");
          
        console.log("try block of handleBuyNow",productId);
        setOrderProductId(productId)
        console.log("orderform");
        
    
  
    
        
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
const product = products.find(product => product._id=== productDetailsId);
// console.log(products,"products",product,"product");
if(!product ){
  return <p>..............</p>
}

  return (
    <>
    {/* // <div  className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4" style={{ minHeight: '60vh' }}> */}
  
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
      <Box
      
      className="flex flex-1 flex-row flex-shrink"
     

      sx={{
        display: { xs: 'none', md: 'flex' }, 
        flexDirection: 'column',
        flexGrow: 1,
        width:'100%'
      }}
      
      >
      <Paper elevation={3} className="p-2"   sx={{ width: '100vw' }}>
        <ImageContainer>
            <div className='flex  gap-10 flex-row p-4 max'>
            <div>
       
          <TextContainer >
            {product.images.map((src, index) => (
              
              <MovableImage
                key={index}
                src={src}
                alt={`Product Image ${index + 1}`}
                draggable
               onClick={() => handleClickOpen(src)}
                objectFit='contain'
               
              />
            ))}
          </TextContainer>
        
          </div>
                      <div className='flex flex-row gap-4  ' >

                <div style={{
               
                
                  width: '500px',
                  height: '500px',
                  overflow: 'hidden'

                }}>

                          <ImageZoom  src={product.images[0]} alt={product.name}    />
                          {/* <img src={product.images[0]} alt={product.name} width={500} height={500}
                          
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain', // Ensures the image scales to fit within the container while maintaining its aspect ratio
                          }}/> */}

                          </div>

                          <div>
                             <Typography variant="body1"  paragraph>
             {product.description}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{
              fontSize:'20px'
            }}> 
              <strong>Price:</strong> ₹{product.price}
            </Typography>
            <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product._id,product.price)}
                  className="mt-2"
                  sx={{
                    marginTop:'10px'
                  }}
                >
                  Add to Cart
                </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBuyNow(product._id)}
                    className="mt-2"
                    sx={{
                      marginLeft:'2%',
                      marginTop:'10px'
                    }}
                  >
                    Buy Now
                  </Button>
    
                          </div>
                      </div>

                  </div>

        </ImageContainer>
        
    
          </Paper>
    
      </Box>








      <Container className='mt-10 mb-10' 
      sx={{
        display: { xs: 'flex', md: 'none' }, 
        flexDirection: 'column',
        flexGrow: 1,
        width:'100%'
      }}>
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
      <Grid container spacing={2} sx={{

      }}>
        <Grid item xs={12} md={6} >
          <Paper elevation={3} sx={{ p: 2 }}>
            <ImageContainer>
              <Grid container spacing={2}>
                <Grid item xs={3}  sm={3} md={3} lg={3}>
                  <TextContainer>
                    {product.images.map((src, index) => (
                      <MovableImage
                        key={index}
                        src={src}
                        alt={`Product Image ${index + 1}`}
                        draggable
                        onClick={() => handleClickOpen(src)}
                      />
                    ))}
                  </TextContainer>
                </Grid>
                <Grid item xs={12} md={8} sm={3}  lg={6} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <ImageZoom src={product.images[0]} alt={product.name}  sx={{ mb: 1 }}/>
                  <Typography variant="body1" paragraph sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Price:</strong> ₹{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product._id, product.price)}
                    sx={{ mt: 1 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBuyNow(product._id)}
                    sx={{ mt: 1, }}
                  >
                    Buy Now
                  </Button>
                </Grid>
              </Grid>
            </ImageContainer>
          </Paper>
        </Grid>
      </Grid>


      
     
    </Container>
















<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{
        style: {
          width: '90vw',
          height: '90vh',
        },
      }}>
        <DialogContent style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </DialogContent>
      </Dialog>
</>



    // </div>
  );
};

export default ProductDetails;
