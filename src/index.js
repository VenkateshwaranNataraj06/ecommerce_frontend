import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CategoriesProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import ScrollToTop from './components/ScrollToTop';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <CategoriesProvider >
        <ProductProvider>
          <UserProvider>
            <ScrollToTop/>
           <App />
      </UserProvider>
    </ProductProvider>
    </CategoriesProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
