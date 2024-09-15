
import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Cookies from 'js-cookie';
const PrivateRoute = ({ element, requiredRoles = [] }) => {
  // const { authToken, userRole } =useContext(AuthContext)

  // console.log(userRole,"privateRoute<<<<<<<<<<<<");
  // console.log( authToken,"private authtoken>>>>>>>>>>>>>>");
  const authToken=Cookies.get('authToken')
  const role = Cookies.get('userRole');
  console.log( authToken ,"PRPRPRPRPRPRPR",role,"uugggggggggggggggggggg");
  
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    return <Navigate to="/" />; 
  }

  return element;
};

export default PrivateRoute;
