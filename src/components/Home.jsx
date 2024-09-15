import React, { useContext, useState, useEffect } from 'react';
import {
  Container, Grid, CardMedia, Typography, CircularProgress, Snackbar, Alert} from '@mui/material';
import ProductContext from '../context/ProductContext';
import CategoriesContext from '../context/CategoryContext';
import { getProducts } from '../services/apiServices';
import { getCarts } from '../services/cartServices';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/categoryServices';
import ScrollableImage from './ScrollImage';
import AuthContext from '../context/AuthContext';
import Banner from './Banner';
import Cookies from 'js-cookie';

export default function CategoriesGroup() {
  const { categories, cid, setCid, setCategories } = useContext(CategoriesContext);
  const { products, setProducts, filteredProducts, setFilteredProducts, cartlength, cart, setCart, setCartlength } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { authToken, userRole, setUserRole } = useContext(AuthContext)

  useEffect(() => {
    const role = Cookies.get('userRole');
    setUserRole(role);
    setLoading(false);
    // console.log("role jheader>>>>>>>>>>>",role);



  }, [authToken, setUserRole]);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      try {
        // console.log("fetchProductsAndCategoriesinsideHome");
        // console.log(products);

        if (products.length === 0 || categories.length === 0) {
          const productsResponse = await getProducts();
          const categoriesResponse = await getCategories();
          // console.log(categoriesResponse,"categoriesResponseHome");

          if (Array.isArray(productsResponse.data)) {
            setProducts(productsResponse.data);
            setFilteredProducts(productsResponse.data);
            setCategories(categoriesResponse.data);
            // console.log(productsResponse.data,"productsResponse.data");
            localStorage.setItem('productlocal', JSON.stringify(productsResponse.data));
          } else {
            setError('Unexpected data format');
          }
        }
      } catch (error) {
        // console.log(error);

        setError(error?.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {

        //  console.log(authToken," console.log");

        if (authToken && userRole !== 'admin') {
          // console.log("tHomeCart");
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


  }, [authToken]);

if(userRole==='admin')
{
  navigate('/adminhome')
}

  return (
    <>

      <Banner />
   <Container className='mt-10'>
        <Typography variant="h3" align="center" gutterBottom sx={{
          marginBottom: '40px',
          fontWeight: '700',
          backgroundImage: 'linear-gradient(45deg, #FF6F61, #D83F6E)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textAlign: 'center',
          fontFamily: 'Montserrat, sans-serif',

          fontSize: {
            xs: '1rem',
            sm: '1.25rem',
            md: '1.5rem',
            lg: '2.2rem',
          }

        }}

        >
          Shop By Category
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
          {categories.map(category => (
            <Grid item xs={3} sm={6} md={4} lg={3} key={category._id}>
              <Typography variant="h6" gutterBottom align='center' sx={{

                textAlign: 'center',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: {
                  xs: '0.75rem',
                  sm: '1.25rem',
                  md: '1.5rem',
                  lg: '1.5rem'
                }
              }}>
                {category.name}
              </Typography>

              <CardMedia
                component="img"
                image={category.image}

                alt={category.name}
                sx={{

                  height: {
                    xs: 100,
                    sm: 200,
                    md: 200,
                    lg: 200
                  },
                  width: {
                    xs: 100, 
                    sm: 200, 
                    md: 200, 
                    lg: 200  
                  },
                  objectFit: 'cover',
                  borderRadius: '50%',
                  paddingTop: '10px',
                  marginBottom: '30px',
                  display: 'block',
                  mx: 'auto',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
                onClick={() => { setCid(category._id); localStorage.setItem('categoryid', category._id); navigate('/productcategory') }}
                role="button"
                tabIndex={0}

              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <div className="App text-center p-4">
        <ScrollableImage />
      </div>
    </>
  );
}
