import React, { useState, useContext } from 'react';
import { Button, TextField, Typography, Container, Paper, Snackbar, Alert,Stack  } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../context/AuthContext';
import { getCarts, deleteCarts, createCarts } from '../services/cartServices';
import ProductContext from '../context/ProductContext';
import '../components/css/banner.css'
import bgimg from '../image/loginbgr.png'

export default function Login ()  {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [error, setError] = useState('');
  const { login ,userRole} = useContext(AuthContext);
  const navigate = useNavigate(); 
 const {cartlength, setCartlength,cart,setCart}=useContext(ProductContext)
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

   const response=  await login(credentials);


     
     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    //  console.log("cartitemas",cartItems);
     
     if (cartItems.length > 0) {
         for (const item of cartItems) {
           const response=  await createCarts(item.productId, item.price); 
          //  console.log(response.data.items.length,"cartfrom login page");
            setCartlength(response.data.items.length)                 
         
        }             
      }       
         localStorage.removeItem('cartItems'); 
     
    } catch (error) {
      // console.log("eroorr", error);
      const errorMessage = error?.response?.data?.message || error.message || 'Login failed';
    // console.log("eroorr", errorMessage);
      const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCart(localCartItems);
      setCartlength(localCartItems.length);
      setError( errorMessage);
      setIsErrorPopupOpen(true);
    }
  };

  return (
    <div className="flex  items-center justify-center items-center min-h-screen bg-gradient-to-r from-green-50 via-blue-50 to-purple-100 pt-5 "
    style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'contain',     
        backgroundPosition: 'center',  
        backgroundRepeat: 'no-repeat',
    opacity:0.8
       
      }}
    
    >

 <Snackbar
        open={isErrorPopupOpen}
        autoHideDuration={6000}
        onClose={() => setIsErrorPopupOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setIsErrorPopupOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }} >
      <Paper elevation={6} sx={{       
        padding: 4, 
        display: 'flex', flexDirection: 'column', alignItems: 'center',background:'#FFFFFF' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            name="email"
            value={credentials.email}
            onChange={handleChange}
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="password"
            value={credentials.password}
            onChange={handleChange}
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="body1">Don't have an account?</Typography>
      <Button
        onClick={() => navigate('/signup')}
        variant="text"
        sx={{ textAlign: 'center' }}
      >
        Sign Up
      </Button>
    </Stack>
        </form>
      </Paper>
         </Container>
    </div>
  );
};


