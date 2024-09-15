import Cookies from 'js-cookie';
import axios from 'axios';
const API ='http://localhost:4000'
const getAuthToken = () => {
    const token = Cookies.get('authToken');
    console.log(token, "token");
    return token;
};



export const createWhislist= async (productId,price) => {
    try {
        console.log(productId,"product");
        
        const token = getAuthToken();
        console.log( token,">>>> token");
        
        const response = await axios.post(`${API}/whislist`, {
          
            items: [
              {
                product: productId,
               
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
export const getWhislist= async () => {
    try {
        console.log("whislist...");
        
        const token = getAuthToken();
        console.log("whislist...",token);

        const response = await axios.get(`${API}/whislist`,{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        console.log(response,"whislist............");
        return response;
    } catch (error) {
        console.log("erroor",error.response.data.message);
        
        throw error;
    }
};
export const deleteWhislist= async (productId) => {
    try {
        console.log(productId,"productdelete");
        
        const token = getAuthToken();
        const response = await axios.delete(`${API}/whislist/${productId}`, {
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