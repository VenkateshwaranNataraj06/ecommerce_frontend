import Cookies from 'js-cookie';

import axios from 'axios';

const API = 'http://localhost:4000'



const getAuthToken = () => {
    const token = Cookies.get('authToken');
    console.log(token, "token");
    return token;
};


export const getCategories = async () => {
    console.log("categoriess/...get");
        
    const token = getAuthToken();

    const response = await axios.get(`${API}/category`,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }) 

    return response
};

export const addCategory = async (category) => {
    console.log("categoriess/...post");
        
    const token = getAuthToken();

    const response = await axios.post(`${API}/category`,category,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }) 

    return response
};

export const updateCategory = async (id, updatedData) => {
    const token = getAuthToken();
    console.log(token,"Category ");
    
    const response = await axios.put(`${API}/category/${id}`, updatedData,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const deleteCategory = async (id) => {
    const token = getAuthToken();
    console.log(token,"Category ");
    const response = await axios.delete(`${API}/category/${id}`,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    
    return response;
};
