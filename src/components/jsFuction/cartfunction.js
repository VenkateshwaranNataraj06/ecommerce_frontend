


import React, {  useContext,useState, useEffect } from 'react';

import { getCarts, deleteCarts, createCarts } from '../services/cartServices';
import ProductContext from '../context/ProductContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';




export default function cartFunction() {
    
 
  const{products,setCartlength ,cart, setCart,setQuantity,setOrderProductId,setProductDetails}=useContext(ProductContext)
  const {authToken,userRole}=useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 const navigate=useNavigate()
 const localCartItems = JSON.parse(localStorage.getItem('cartItems')) 
 const [count ,setCount]=useState(1);

 console.log(localCartItems ,"localCartItems >>>");
 
  console.log(cart,"cart from carjs");








  useEffect(() => {
   
    const fetchCart = async () => {
      try {
       
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

   
  }, []);

  // Add item to cart
  const addToCart = async (productId, quantity) => {
    try {

     
      if(authToken){
        if(quantity<11){
        const response = await createCarts(productId, quantity);
        console.log(response.data);
       
    
   
        setCart(response.data); // Update cart state with the new data
  
        setCartlength(response.data[0].items.length)
        }
        else{
          setError("maximum quantity limit is 10")
          return
        }

      }else {
        // Store in local storage if not logged in
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

  // Remove item from cart
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

} 