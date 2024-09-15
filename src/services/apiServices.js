import Cookies from 'js-cookie';
import axios from 'axios';

const API = 'https://ecommerce-backend-5y1u.onrender.com';
const getAuthToken = () => {
    const token = Cookies.get('authToken');
    // console.log(token, "token");
    return token;
};

export const getProducts = async () => {
    // console.log(API,"APIIIIIIIIIIIIIIIIIIIIIIIi");
     return await axios.get(`${API}/products`);
};

export const getProductsById = async (id) => {
    return await axios.get(`${API}/products/${id}`);
};

export const createProducts = async (Products) => {
    const token = getAuthToken();
    return await axios.post(`${API}/products`, Products, {
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateProducts = async (id, Products) => {
    // console.log(Products,"Prdoucts updateapiiiiiiiiiiiiii");
    
    const token = getAuthToken();
    return await axios.put(`${API}/products/${id}`, Products,
        {
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};

export const deleteProducts = async (id) => {
    const token = getAuthToken();
    return await axios.delete(`${API}/products/${id}`, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
};



