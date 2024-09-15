// import React, { useContext,useState } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Home from './components/Home';
// import Product from './components/Product';
// import AuthContext from './context/AuthContext';
// import { Button, Box,IconButton} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Footer from './components/Footer';
// import Header from './components/Header';


// const App = () => {

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };
//   const { logout } = useContext(AuthContext);
//   return (
//     <div className="App flex">
//       {/* <Header/> */}
//       {/* Sidebar Navigation */}

//       {/* <aside className="w-64 bg-blue-800 text-white h-screen">
//         <div className="p-4 text-center text-2xl font-semibold">NavBar</div>
//         <nav className="mt-6"> */}
//           {/* <ul>
//             <li><Link to="/login" className="block p-4 hover:bg-blue-700">Login</Link></li>
//             <li><Link to="/signup" className="block p-4 hover:bg-blue-700">Signup</Link></li>
//             <button onClick={logout} className="block p-4 hover:bg-blue-700">Logout</button> */}
//             {/* Uncomment and add routes for Product, Order, User */}
//            {/* <li><Link to="/product" className="block p-4 hover:bg-blue-700">Product</Link></li> */}
//              {/* <li><Link to="/order" className="block p-4 hover:bg-blue-700">Order</Link></li>
//             <li><Link to="/user" className="block p-4 hover:bg-blue-700">User</Link></li> */}
//             {/* <li><Link to="/" clhomeassName="block p-4 hover:bg-blue-700">Home</Link></li>
         
//           </ul>
//         </nav>
//       </aside> */}

//       <div>
//       {/* Toggle Button */}
//       <button
//         onClick={toggleDrawer}
//         className="p-2 m-4 bg-blue-600 text-white rounded-md"
//       >
//         Toggle Drawer
//       </button>

//       {/* Drawer Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-gray-800 bg-opacity-50"
//           onClick={toggleDrawer}
//         >fgg</div>
//       )}

//       {/* Drawer */}
//       <aside
//         className={`fixed top-0 left-0 w-64 bg-blue-800 text-white h-screen shadow-lg transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out`}
//       >
//         {/* <div className="p-4 text-center text-2xl font-semibold">NavBar</div> */}
//         <Box display="flex" justifyContent="flex-end">
//       <IconButton
//         color="inherit"
//         onClick={toggleDrawer}
//         className="hover:bg-red-900"
//       >
//         <CloseIcon />
//       </IconButton>
//     </Box>
//         <nav className="mt-6">
       
//           <ul>
//             <li>
//               <Link to="/login" className="block p-4 hover:bg-blue-700">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link to="/signup" className="block p-4 hover:bg-blue-700">
//                 Signup
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={logout}
//                 className="block p-4 hover:bg-blue-700 w-full text-left"
//               >
//                 Logout
//               </button>
//             </li>
//             {/* Uncomment and add routes for Product, Order, User */}
//             {/* 
//               <li>
//                 <Link to="/product" className="block p-4 hover:bg-blue-700">Product</Link>
//               </li>
//               <li>
//                 <Link to="/order" className="block p-4 hover:bg-blue-700">Order</Link>
//               </li>
//               <li>
//                 <Link to="/user" className="block p-4 hover:bg-blue-700">User</Link>
//               </li>
//             */}
//             <li>
//               <Link to="/" className="block p-4 hover:bg-blue-700">
//                 Home
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </aside>
//       <Footer/>
//     </div>


//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <Routes>
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/home' element={<Home />} />
//           {/* Add routes for Product, Order, User */}
//            <Route path='/product' element={<Product/>} />
//            {/*  <Route path='/order' element={<Order />} />
//           <Route path='/user' element={<User />} /> */}
//         </Routes>
//       </main>

    
//     </div>
//   );
// }

// export default App;


import React, { useContext, useState,useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Product from './components/Product';
import AuthContext from './context/AuthContext';
import {  Box, IconButton ,Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Footer from './components/Footer';
import Header from './components/Header';
import Order  from './components/Order';
import SliderImage from './components/SliderImage';
import ScrollImage from './components/SliderImage';
import ScrollImageGallery from './components/ScrollImage';
import CategoryAdd from './components/CategoryAdd';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import ProductUser from './components/ProductUser';
import CategoriesGroup from './components/Category';
import Cookies from 'js-cookie';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import RouteApp from './Route/routeApp';
import vid from './components/video/loginbg2.mp4'
import './components/css/banner.css'





const App = () => {
  
  


  return (
    <div className="App flex flex-col min-h-screen">
      

      <Header  />

      <main className="flex-1 ">
       
       <RouteApp />
      </main>

      <Footer />
    </div>
  );
};

export default App;
