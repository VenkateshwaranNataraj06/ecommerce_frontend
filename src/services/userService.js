import Cookies from 'js-cookie';

import axios from 'axios';

const API = 'http://localhost:4000'
const getAuthToken = () => {
    const token = Cookies.get('authToken');
    console.log(token, "token");
    return token;
};


export const checkLogin = async (credentials) => {
    try {
        console.log("checkLogin................");
        
        const response = await axios.post(`${API}/users/login`, credentials);

        return response;
    } catch (error) {
        throw error; 
    }
};

export const getUsers = async () => {
    try {
        const token = getAuthToken();
        console.log(token,"user");
        const response = await axios.get(`${API}/users`,  {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response; 
    } 
    catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    }
};


export const createUsers = async (dataToSend) => {
    try {
        const response = await axios.post('http://localhost:4000/users/signup', dataToSend);
    
        return response; 
    } 
    catch (error) {
        console.error('Error creating user:', error);
        throw error; 
    }
}


export const updateUser= async (id, updatedData) => {
    const token = getAuthToken();
    console.log(token,"users");
    
    const response = await axios.put(`${API}/users/${id}`, updatedData,{
        headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
};

export const deleteUser= async (id) => {
    const token = getAuthToken();
    console.log(token,"users");
    const response = await axios.delete(`${API}/users/${id}`,{
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    
    return response;
};
