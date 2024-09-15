import React, { createContext, useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { checkLogin } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken,] = useState(null);
  const[userRole,setUserRole]=useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken =Cookies.get('authToken');
    if (storedToken) {
         
            setAuthToken(storedToken);
            console.log(authToken,"authTokenauthcontext");
            
     
  
    }

    const handleStorageChange = (event) => {
      console.log(event.key,"event key","event.newValue",event.newValue);
      
      if (event.key === 'authToken' && !event.newValue) {
        setAuthToken(false);
        window.removeEventListener('storage', handleStorageChange);
        navigate('/login');
      }
    };

    window.addEventListener('storage', handleStorageChange);
  }, []);

  const login = async (credentials) => {
    console.log("login>>>>>>");
    
    try {
      const response = await checkLogin(credentials);
      const { token ,username,useremail} = response.data;
      setAuthToken(token);
      const decodedToken = jwtDecode(token);
  console.log(response.data,"response.data;loginJJJJJJJJJ");
  
     
      const userRole = decodedToken.role; 
    
      console.log('User Role:', userRole);

      Cookies.set('authToken', token, { expires: 1 / 24 });
      Cookies.set('userRole', userRole, { expires: 1 / 24 });

      Cookies.set('username', username, { expires: 1 / 24 });
      Cookies.set('useremail',useremail, { expires: 1 / 24 });
  
      
      if(userRole==='admin')
      {
      console.log(userRole,"userRoleuserRoleuserRole");
      
        navigate('/adminproduct')
        
      }
else{
  console.log(userRole,"/homeuserRoleuserRoleuserRole");
  navigate('/'); 
}
     



    } catch (error) {
      console.log(error?.response?.data?.message);
      
      throw new Error(error?.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('cartItems'); 
  localStorage.clear()
    Cookies.remove('authToken');
    Cookies.remove('userRole');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken,login, logout,userRole,setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
