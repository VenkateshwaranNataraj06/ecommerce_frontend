import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PublicRoute = ({ element }) => {
    const { authToken,logout } =useContext(AuthContext)
    if (authToken) {
        // logout();
        return <Navigate to='/' />;
    }

    return element;
};

export default PublicRoute;
