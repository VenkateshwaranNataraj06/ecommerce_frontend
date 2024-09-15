
import React, { useContext, useState,useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Product from '../components/Product';
import AuthContext from '../context/AuthContext';
import {  Box, IconButton ,Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Order  from '../components/Order';
import SliderImage from '../components/SliderImage';
import ScrollImage from '../components/SliderImage';
import ScrollImageGallery from '../components/ScrollImage';
import CategoryAdd from '../components/CategoryAdd';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import ProductUser from '../components/ProductUser';
import CategoriesGroup from '../components/Category';
import Cookies from 'js-cookie';
import ProductDetails from '../components/ProductDetails';
import Profile from '../components/Profile';
import ProductCategoryWise from '../components/ProductCategoryWise';
import User from '../components/User';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import Whislist from '../components/Whislist';


export default function RouteApp() {
  return (
    <div>

<main className="flex-1 ">
        <Routes>
          <Route path="/login" element={<PublicRoute element={ <Login />}/>} />
          <Route path="/signup" element={<PublicRoute element={ <Signup />} />} />
          <Route path="/" element={<Home />} />
          <Route path='/product' element={<ProductUser />} />
          <Route path="/adminproduct" element={<PrivateRoute element={<Product />} requiredRoles={['admin']} />} />
          <Route path="/order" element={<PrivateRoute element={<Order />} />} />
          <Route path="/user" element={<PrivateRoute element={<User />} />} />
          <Route path="/orderform" element={<PrivateRoute element={<OrderForm />} requiredRoles={['user']} />} />
           <Route path="/category" element={<PrivateRoute element={<CategoryAdd />} requiredRoles={['admin']}  />} />
           <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          
           <Route path='/cart' element={<Cart />} />
           {/* <Route path='/catgroup' element={<CategoriesGroup/>}/> */}
           <Route path='/whislist' element={<PrivateRoute element={<Whislist/>}/>}/>
         
           <Route path='/productdetails' element={<ProductDetails/>}/>
           <Route path='/productcategory' element={<ProductCategoryWise/>}/>
        </Routes>
      </main>


    </div>
  )
}


// <Routes>
//                         <Route path="/signup" element={ <PublicRoute element={<Signup />} /> } />
//                         <Route path="/login" element={<PublicRoute element={ <Login />} />} />
//                         <Route path="/tickets" element={<PrivateRoute element={<TicketsList />}  allowedRoles={['admin']} />} />
//                         <Route path="userticket" element={<PrivateRoute element={<UserTicketsList />} allowedRoles={['user']} />} />
//                         <Route path="/" element={
                            
//                             <>
//                        <div className="relative flex items-center justify-center w-full h-screen">
//                                     <video
//                                         src={bgvideo}
//                                         alt="bg"
//                                         loop
//                                         autoPlay
//                                         className="absolute inset-0 object-cover w-full h-full"
//                                     ></video>
//                                     <h1 className="relative z-10 text-4xl font-bold text-center text-white p-4 rounded">
//                                         Welcome to the Ticket App
//                                     </h1>
//                                 </div>


//                 </>
      
                        
                       
                    
//                     } />
//                         <Route path='/home' element={<PrivateRoute element={<Home />} allowedRoles={['admin']} /> } />
//                         <Route path='/teams' element={<PrivateRoute element={<Team />} allowedRoles={['admin']} />} />
//                         {/* <Route path='/logout' element={<Logout />} /> */}
//                         <Route path='/userhome' element={<PrivateRoute element={<UserHome />} allowedRoles={['user']}/>} />
//                         <Route path='/userticket' element={<PrivateRoute element={<UserTicketsList />} allowedRoles={['user']}/>} />
//                     </Routes>
//                 </main>
//             </div>
//         </AuthProvider>

// <nav className="bg-gray-800 p-4 ">
//             <div className="container mx-auto flex justify-between items-center">
           
//             {!isAuthenticated&& (<><Link to="/" className="text-white font-bold text-lg hover:bg-blue-700 px-3 py-2 rounded">Home</Link></>)  }
//                 <div className="space-x-4">
//                     {!isAuthenticated && (
//                         <>
                           
//                             <Link to="/signup" className="text-white hover:bg-blue-700 px-3 py-2 rounded  text-lg">Signup</Link>
//                             <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded  text-lg">Login</Link>
//                         </>
//                     )}
                    
//                     {isAuthenticated && !isUserHome &&!isUserTicket&&(
//                         <>
//                          <Link to="/home" className="text-white font-bold text-lg hover:bg-blue-700 px-3 py-2 rounded">Profile</Link>
//                             <Link to="/tickets" className="text-white hover:bg-blue-700 px-3 py-2 rounded text-lg">Tickets</Link>
//                             <Link to="/teams" className="text-white hover:bg-blue-700 px-3 py-2 rounded text-lg">Teams</Link>
//                             <button
//                                 onClick={logout}
//                                 className="text-white text-lg hover:bg-blue-700 px-3 py-2 rounded"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     )}
                 
//                     {isAuthenticated && (
//                         (isUserHome || isUserTicket) && (
//                             <>
//                                 <Link to="/userhome" className="text-white hover:bg-blue-700 px-3 py-2 rounded text-lg">Profile</Link>
//                                 <Link to="/userticket" className="text-white hover:bg-blue-700 px-3 py-2 rounded text-lg">Tickets</Link>
//                                 <button
//                                     onClick={logout}
//                                     className="text-white hover:bg-blue-700 px-3 py-2 rounded text-lg"
//                                 >
//                                     Logout
//                                 </button>
//                             </>
//                         )
//                     )}


//                 </div>
//             </div>
//         </nav>
//     );