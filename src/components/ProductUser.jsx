
import React, { useContext, useEffect, useState } from 'react';
import { getProducts, updateProducts, deleteProducts, createOrders,  createProducts,  } from '../services/apiServices';
import { createCarts, getCarts } from '../services/cartServices';
import { getCategories, addCategory } from '../services/categoryServices';
import {
    Container, Grid, Card, CardContent, CardMedia, Typography, TextField,Paper, Dialog, DialogContent, IconButton , Button, CircularProgress, Snackbar, Alert, Box,InputAdornment,
    Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import ScrollableImage from './ScrollImage';
import ProductContext from '../context/ProductContext';
import CategoriesContext from '../context/CategoryContext';
import AuthContext from '../context/AuthContext';
import '../components/css/banner.css'
import vid from './video/loginbg3.mov'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Cookies from 'js-cookie';


export default function ProductUser() {

   const {products,setProducts,orderProductId,setOrderProductId,cartlength,cart, setCart, setCartlength,quantity,setQuantity ,productDetailsId,setProductDetails,filteredProducts, setFilteredProducts,filter,  setFilter}=useContext(ProductContext)
   const { categories, setCategories } = useContext(CategoriesContext);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', stock: '', images: [], description: '', category: '', brand: '', useFileUpload: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const navigate = useNavigate();
    const {authToken,setUserRole,setAuthToken}=useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [active, setActive] = useState(false);


    useEffect(()=>{
      const token= Cookies.get('authToken');
    // console.log( " const token= Cookies.get('authToken');",token);
    setAuthToken(token);

    },[])
    
  // const [filteredProducts, setFilteredProducts] = useState(products);
  // const [filter,  setFilter]=useState(false)
  // console.log(filteredProducts," setFilteredProducts");

    const handleClickOpen = (image) => {
      setSelectedImage(image);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedImage(null);
    };
     
useEffect(() => {
  // console.log("productusercart>>>>>>>>>>>>>>>>>>>>>");
  

    const fetchCart = async () => {
      try {
        // console.log("product cart user,",authToken);
        
        if(authToken ){
          const response = await getCarts();
          // console.log(response.data, "fetch.......");
                  
          if (response.data && typeof response.data === 'object') {
            setCart(response.data[0]);           
              // console.log(response.data[0].items.length,"response.data[0].items.length");
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
  
  
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            setLoading(true);
            try {
              if(products.length===0||categories.length==0)
              {
                const productsResponse = await getProducts();
                const categoriesResponse = await getCategories();

                if (Array.isArray(productsResponse.data)) {
                    setProducts(productsResponse.data);
                    setFilteredProducts(productsResponse.data);
                    setCategories(categoriesResponse.data);
                } else {
                    setError('Unexpected data format');
                }
              }
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    if (loading) {
      return <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: '10px' }}>
        Loading...
      </Typography>;
    }
    if (products.length===0) {
      return <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: '10px' }}>
        No Products Available      </Typography>;
    }
 

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
            console.log("try block of handleBuyNow",productId);
            setOrderProductId(productId)
            console.log("orderform");
            setOrderProductId(productId);            
            navigate('/orderform')            
            setSuccess('Order placed successfully');
        }
        else{
            navigate('/login')

        }
        } catch (error) {
            // console.log(error);
            setError('Error placing order',error);
        } finally {
            setLoading(false);
        }
    };
  const  handleProductDetailPage=(produtID)=>
  {
    setProductDetails(produtID)
    localStorage.setItem('prodid',produtID)
   navigate('/productdetails')
  }
  // console.log("cat",categories);

  
  const handleClick = () => {
    setActive(!active);
  }

  if (!loading &&filteredProducts.length === 0 ) {
    return <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: '10px' }}>
      No products found
    </Typography>;
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
        {filter &&
          <Container>

            <Grid container spacing={2}>
              {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <Card>

                    <CardMedia
                      component="img"
                      style={{ height: '200px', width: '100%', objectFit: 'contain', paddingTop: '10px' }}
                      image={product.images[0] || "https://via.placeholder.com/150"}
                      alt={product.name}
                      onClick={() => handleProductDetailPage(product._id)}
                    />
                    <CardContent>
                      <Typography variant="h6" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '8px', textAlign: 'center' }}>
                        {product.description}
                      </Typography>
                      <Typography variant="h6" style={{ textAlign: 'center', marginTop: '8px' }}>
                        Price: ₹{product.price}
                      </Typography>
                      <Typography variant="h6" style={{ textAlign: 'center', marginTop: '8px' }}>
                        Stock: {product.stock}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        textAlign='center'
                        onClick={() => handleAddToCart(product._id, product.price)}
                        className="mt-2"
                        sx={{
                          marginLeft: '25%',
                          marginTop: '10px'
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        }


        {!filter && <Container >
          <Typography variant="h3" align="center" gutterBottom className="mt-4">
            {/* Featured Products */}
          </Typography>
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

          <Grid container spacing={2} className="mt-4">
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}


              >
                <Card>
                  <CardMedia
                    component="img"

                    image={product.images[0] || "https://via.placeholder.com/150"}
                    alt={product.name}
                    draggable
                    sx={{
                      height: 200,
                      width: '100%',
                      objectFit: 'contain',
                      paddingTop: '10px',
                      // transition: 'transform 0.3s ease-in-out',
                      // '&:hover': {
                      //   transform: 'scale(1.1)'
                      // }
                    }}
                    // onClick={() => handleClickOpen(product.images[0])}
                    onClick={() => handleProductDetailPage(product._id)}
                  />
                  <CardContent>


                    <>
                      <Box>
                        <Typography variant="h6" style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginBottom: '8px',
                          textAlign: 'center'
                        }}>
                          {product.description}
                        </Typography>
                        <Typography variant="h6" style={{
                          textAlign: 'center',
                          marginTop: '8px'
                        }}>
                          Brand: {product.brand}
                        </Typography>
                        <Typography variant="h6" style={{
                          textAlign: 'center',
                          marginTop: '8px'
                        }}>
                          Price: ₹{product.price}
                        </Typography>
                        <Typography variant="h6" style={{
                          textAlign: 'center',
                          marginTop: '8px'
                        }}>
                          Stock: {product.stock}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(product._id, product.price)}
                        className="mt-2"
                        sx={{
                          marginLeft: '25%',
                          marginTop: '10px'
                        }}
                      >
                        Add to Cart
                      </Button>
                      {/* <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleBuyNow (product._id)}
                                                className="mt-2"
                                            >
                                                Buy Now
                                            </Button> */}


                    </>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        }
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogContent>
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

              style={{ width: '90%', height: 'auto', objectFit: 'initial' }}

            />
          </DialogContent>
        </Dialog>
        </>
    );
}
