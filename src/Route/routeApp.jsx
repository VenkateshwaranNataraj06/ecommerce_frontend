import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Home from '../components/Home';
import Product from '../components/Product';
import Order  from '../components/Order';
import CategoryAdd from '../components/CategoryAdd';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';
import ProductUser from '../components/ProductUser';
import ProductDetails from '../components/ProductDetails';
import Profile from '../components/Profile';
import ProductCategoryWise from '../components/ProductCategoryWise';
import User from '../components/User';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
// import Whislist from '../components/Whislist';
import AdminHome from '../components/AdminHome';


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
           {/* <Route path='/whislist' element={<PrivateRoute element={<Whislist/>}/>}/> */}
         
           <Route path='/productdetails' element={<ProductDetails/>}/>
           <Route path='/productcategory' element={<ProductCategoryWise/>}/>
           <Route path='/adminhome' element={<PrivateRoute element={<AdminHome />}/> }  requiredRoles={['admin']} />
        </Routes>
      </main>


    </div>
  )
}

