


import Cookies from 'js-cookie';

import axios from 'axios';

const API = 'http://localhost:4000'

// const getAuthToken = () => {
//     const token=localStorage.getItem('authToken');
//     console.log(token,"token");
    
//     return token
// };

const getAuthToken = () => {
    const token = Cookies.get('authToken');
    console.log(token, "token");
    return token;
};





export const createCarts= async (productId,price) => {
    try {
        console.log(productId,"product");
        
        const token = getAuthToken();
        console.log( token,">>>> token");
        
        const response = await axios.post(`${API}/carts`, {
          
            items: [
              {
                product: productId,
                quantity: 1,
                price: price
              }
            ]
          },{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};
export const getCarts= async () => {
    try {
        console.log("cart...");
        
        const token = getAuthToken();
        console.log("cart...",token);

        const response = await axios.get(`${API}/carts`,{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response,"cart............");
        return response;
    } catch (error) {
        console.log("erroor",error.response.data.message);
        
        throw error;
    }
};
export const deleteCarts= async (productId) => {
    try {
        console.log(productId,"product");
        
        const token = getAuthToken();
        const response = await axios.delete(`${API}/carts/${productId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response,"response............");
      
        return response;
    } 
catch (error) {
        throw error;
    }
};