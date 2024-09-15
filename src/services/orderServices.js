import Cookies from 'js-cookie';

import axios from 'axios';

const API = 'https://ecommerce-backend-5y1u.onrender.com'



const getAuthToken = () => {
    const token = Cookies.get('authToken');
    // console.log(token, "token");
    return token;
};

export const getOrders = async () => {
    try {
// console.log("oreder get");

        const token = getAuthToken();
        // console.log(token,"order");
        
        const response = await axios.get(`${API}/orders`,{
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response; 
    } catch (error) {
        console.error('Error fetching Orders:');
        throw error; 
    }
};

export const updateOrders= async (id, updatedData) => {
    const token = getAuthToken();
    // console.log(token,"order");
    
    const response = await axios.put(`${API}/orders/${id}`, updatedData,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const deleteOrders= async (id) => {
    const token = getAuthToken();
    // console.log(token,"order");
    const response = await axios.delete(`${API}/orders/${id}`,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    
    return response;
};


export const createOrders= async (orderData) => {
    try {
        const token = getAuthToken();
        // console.log(token,"order");
        const response = await axios.post(`${API}/orders`, orderData,
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

