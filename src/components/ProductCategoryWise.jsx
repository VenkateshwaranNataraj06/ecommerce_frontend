

import React, { useContext, useEffect, useState, useRef } from 'react';
import { getProducts, updateProducts, deleteProducts, createOrders, createProducts, } from '../services/apiServices';
import { createCarts, getCarts } from '../services/cartServices';
import { getCategories, addCategory } from '../services/categoryServices';
import {
  Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Paper, Dialog, DialogContent, IconButton, Button, CircularProgress, Snackbar, Alert, Box, InputAdornment,
  Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import Carousel from './Carousel';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import ScrollableImage from './ScrollImage';
import ProductContext from '../context/ProductContext';
import CategoriesContext from '../context/CategoryContext';
import AuthContext from '../context/AuthContext';
import '../components/css/banner.css'
import vid from './video/loginbg3.mov'

export default function ProductCategoryWise() {
  // useEffect(() => {

  //     localStorage.clear();
  // }, []);
  const { products, setProducts, orderProductId, setOrderProductId, cartlength, cart, setCart, setCartlength, quantity, setQuantity, productDetailsId, setProductDetails } = useContext(ProductContext)
  const { categories, setCategories, cid, setCid } = useContext(CategoriesContext);
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
  const { authToken } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filter, setFilter] = useState(false)
  console.log(cid, "cidL:LLLLLLLLLLLLLLLLLLLLLLLL");
  const categoryId = (localStorage.getItem('categoryid'));
  console.log("productlocalitemsPPPPPPPPPPPPPPPPPP", categoryId);
  setCid(categoryId)
  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  // useEffect(() => {

  //   const fetchCart = async () => {
  //     try {
  //       if (authToken) {
  //         const response = await getCarts();
  //         console.log(response.data, "fetch.......");


  //         if (response.data && typeof response.data === 'object') {
  //           setCart(response.data[0]); 


  //           console.log(response.data[0].items.length, "response.data[0].items.length");
  //           setCartlength(response.data[0].items.length)

  //         } else {
  //           console.log('Unexpected data format');
  //         }

  //       }
  //       else {
  //         const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  //         setCart(localCartItems);
  //         setCartlength(localCartItems.length);
  //       }

  //     } catch (error) {
  //       console.error('Error fetching cart data:', error.response?.data?.message || error.message);
  //     }
  //   };

  //   fetchCart();


  // }, []);




  useEffect(() => {
    const isPageRefreshed = sessionStorage.getItem('isPageRefreshed');
    console.log(isPageRefreshed, "isPageRefreshedPKJJJJJJJJJ");

    if (isPageRefreshed) {

      const fetchProductLocal = async () => {
        console.log("fetch.......response.data,", authToken);
        try {

          const productlocalitems = JSON.parse(localStorage.getItem('productlocal')) || [];
        
          console.log(productlocalitems, "productlocalitemsPPPPPPPPPPPPPPPPPP", categoryId);
       
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



  // useEffect(() => {
  //     const fetchProductsAndCategories = async () => {
  //         setLoading(true);
  //         try {
  //             const productsResponse = await getProducts();
  //             const categoriesResponse = await getCategories();

  //             if (Array.isArray(productsResponse.data)) {
  //                 setProducts(productsResponse.data);
  //                 setFilteredProducts(productsResponse.data);
  //                 setCategories(categoriesResponse.data);
  //             } else {
  //                 setError('Unexpected data format');
  //             }
  //         } catch (error) {
  //             setError('Error fetching data');
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     fetchProductsAndCategories();
  // }, []);

  const handleSearchChange = (event) => {
    setFilter(true)
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === '') {
      // When the search query is empty
      setFilter(false);

    }
    const lowercasedQuery = event.target.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productId, price) => {



    if (authToken) {
      try {
        const response = await createCarts(productId, price);
        setCartlength(response.data.items.length)
        console.log(response.data.items.length, "response.data[0].items.length");
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
      if (authToken) {
        console.log("try block of handleBuyNow", productId);
        setOrderProductId(productId)
        console.log("orderform");
        setOrderProductId(productId);




        navigate('/orderform')

        setSuccess('Order placed successfully');
      }
      else {
        navigate('/login')

      }
    } catch (error) {
      console.log(error);

      setError('Error placing order', error);
    } finally {
      setLoading(false);
    }
  };
  const handleProductDetailPage = (produtID) => {

    setProductDetails(produtID)
    localStorage.setItem('prodid', produtID)
    navigate('/productdetails')
  }
  console.log("cat", categories, products);

  // if (products.length===0) {
  //   navigate('/')

  // }

  return (
    <>
      <div className='mb-10 mt-10 '  >

        {/* <TextField
        variant="outlined"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => handleSearchChange({ target: { value: searchQuery } })}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: '20px',marginTop:'20px',padding:'10px', width: '100%' }}
      /> */}
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


        {/* {filter &&  
 <Container className='mt-4'>
 <Grid container spacing={2} >
    {products.filter((fprod)=>fprod?.category?._id ===cid).map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                style={{ height: '200px', width: '100%', objectFit: 'contain', paddingTop: '10px' }}
                image={product.images[0] || "https://via.placeholder.com/150"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '8px',textalign: 'center' }}>
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
                  onClick={() => handleAddToCart(product._id, product.price)}
                  className="mt-2"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
} */}


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
            {products.filter((fprod) => fprod?.category?._id === cid).map(product => (
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
                          textalign: 'center'
                        }}>
                          {product.description}
                        </Typography>
                        <Typography variant="h6" style={{
                          textalign: 'center',
                          marginTop: '8px'
                        }}>
                          Brand: {product.brand}
                        </Typography>
                        <Typography variant="h6" style={{
                          textalign: 'center',
                          marginTop: '8px'
                        }}>
                          Price: ₹{product.price}
                        </Typography>
                        <Typography variant="h6" style={{
                          textalign: 'center',
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
                        textalign='center'
                        sx={{ marginLeft: '25%', marginTop: '10px' }}
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
      </div>
    </>
  );
}
