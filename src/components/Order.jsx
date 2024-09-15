

import React, { useState, useEffect ,useContext} from 'react';
import { deleteOrders, getOrders, updateOrders } from '../services/orderServices';
import {
 CircularProgress, Snackbar, Alert} from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import ProductContext from '../context/ProductContext';
import { getCarts, deleteCarts, createCarts } from '../services/cartServices';
import AuthContext from '../context/AuthContext';
import Cookies from 'js-cookie';
export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { authToken, userRole ,setUserRole, setAuthToken} = useContext(AuthContext);
    const { setCartlength, setCart, } = useContext(ProductContext)

    useEffect(() => {
        const role = Cookies.get('userRole');
         const token= Cookies.get('authToken');


         if (token) {
         
            setAuthToken(token);
            console.log(authToken,"authTokenorder");
            
     
  
    }

       
        setUserRole(role);
        setLoading(false);
        console.log("role order>>>>>>>>>>",role);
    
      
        
      }, [authToken, setUserRole]);

    
    useEffect(() => {
        const isPageRefreshed = sessionStorage.getItem('isPageRefreshed');
      
        if (isPageRefreshed) {

            const fetchCart = async () => {

console.log();

                console.log( "fetch.......response.data,",authToken,userRole,"}");
                try {
                 if(userRole!=='admin'){

                 
                    const response = await getCarts();
                    console.log(response.data, "fetch.......");
                  
                    
                    if (response.data && typeof response.data === 'object') {
                      setCart(response.data[0]); 
                    
            
                      console.log(response.data[0].items.length,"response.data[0].items.length");
                        setCartlength(response.data[0].items.length)
                      
                    } else {
                      console.log('Unexpected data format');
                    }
                  
                    
                }
                 
                
                } catch (error) {
                  console.error('Error fetching cart data:', error.response?.data?.message || error.message);
                }
              };
          
              fetchCart();

          
          console.log('Page was refreshed');
        } else {
          
          console.log('Initial page load');
        }
      
      
        sessionStorage.setItem('isPageRefreshed', 'true');
      
        return () => {
          sessionStorage.removeItem('isPageRefreshed');
        };
      }, []);
  
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                    console.log(response.data,"responseLLLLLLLLLLL");
                    
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);


    const handleDelete = async (id) => {
      setLoading(true);

      confirmAlert({
          title: '',
          message: 'Are you sure you want to delete this order?',
          buttons: [
              {
                  label: 'Yes',
                  onClick: async () => {
        try {
            const response=await deleteOrders(id);
            setOrders(orders.filter(order => order._id !== id));
            setSuccess('Order deleted successfully');
            setLoading(false);

        } catch (error) {
            console.log('Error deleting order:', error);
            setError(error?.response?.data?.message)
            setLoading(false);
        }
      }
    },
    {
        label: 'No',
        onClick: () => { setLoading(false)}
    }
]
});
    };

    const handleEdit = async (e) => {
        e.preventDefault();
    

      const validateFormData = (data) => {
       
        const fieldsToCheck = [
            'status',
            'shippingAddress.phonenumber',
            'shippingAddress.address',
            'shippingAddress.city',
            'shippingAddress.state',
            'shippingAddress.zip'
        ];
    
    
        for (const field of fieldsToCheck) {
            const value = field.split('.').reduce((obj, key) => obj && obj[key], data);
            const trimmedValue = typeof value === 'string' ? value.trim() : value;
            
            if (!trimmedValue) {
          
                return `The ${field.replace(/\./g, ' ')} field cannot be empty.`;
            }
        }
        
        return null;
    };
    

    const trimmedFormData = {
        ...formData,
        shippingAddress: {
            ...formData.shippingAddress,
            address: formData.shippingAddress.address.trim(),
            city: formData.shippingAddress.city.trim(),
            state: formData.shippingAddress.state.trim(),
            zip: formData.shippingAddress.zip.trim(),
            phonenumber:formData.shippingAddress.phonenumber.trim()
        }
    };
    
   
    const validationError = validateFormData(trimmedFormData);
    if (validationError) {
        setError(validationError);
        return;
    }

    confirmAlert({
        title: '',
        message: 'Are you sure you want to make this Changes you cannot modify again ?',
        buttons: [
            {
                label: 'Yes',
                onClick: async () => {
                    try {
                        const response=await updateOrders(editingOrderId, formData);
            
                        setOrders(orders.map(order => (order._id === editingOrderId ? { ...order, ...formData } : order)));
                        setEditingOrderId(null);
                        setSuccess('Order updated successfully');
                    } catch (error) {
                        console.log('Error updating order:', error?.response?.data?.message);
                        setError(error?.response?.data?.message)
                    }
    },
    style: {
      backgroundColor: 'red', 
      color: 'white',   
    
    }
  },
  {
      label: 'No',
      onClick: () => {  setEditingOrderId(null)}
  }
]
});

    
      
    };

    const handleEditClick = (order) => {
        setEditingOrderId(order._id);
        setFormData({ ...order });
    };

    const formatDate = (date) => {
        if (!date) return '';
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime()) ? '' : parsedDate.toISOString().split('T')[0];
    };

    const handleFormChange = (e, field, isShipping = true) => {
        const { name, value } = e.target;
        if (isShipping) {
            setFormData({
                ...formData,
                shippingAddress: {
                    ...formData.shippingAddress,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                billingAddresses: formData.billingAddresses.map((address, index) =>
                    index === 0 ? { ...address, [name]: value } : address
                )
            });
        }
    };
    if (!orders || orders.length === 0) {
        return <p>No orders available</p>;
      }
    
    return (
      <>
     
        <div className="orders mb-10">
        
      {loading && <CircularProgress color="inherit" />}
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => setError('')} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={!!success}
                    autoHideDuration={6000}
                    onClose={() => setSuccess('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => setSuccess('')} severity="success">
                        {success}
                    </Alert>
                </Snackbar>

                <div className="w-full mt-4">
            <h1 className="text-3xl font-semibold mb-4 text-center mt-4">Orders</h1>
            <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg min-w-max">
                <thead>
                    <tr>
                        <th  className="p-2 border">Order ID</th>
                        <th className="p-2 border">User</th>
                        <th className="p-2 border">Total Price</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Delivery Date</th>
                        <th className="p-2 border">Billing Address</th>
                        <th className="p-2 border">Shipping Address</th>
                       <th className="p-2 border">Product</th>
                        <th className="p-2 border">Actions</th>
                   
                    </tr>
                </thead>
                <tbody>

     { userRole==='admin'&&  orders.map(order => (
                        <tr key={order._id}>
                            <td className="p-2 border text-center">{order._id}</td>
                            <td className="p-2 border text-center">{order?.user?.username}</td>
                            <td className="p-2 border text-center">₹{order.totalPrice}</td>
                            <td className="p-2 border text-center">{order.status}</td>
                            <td className="p-2 border text-center">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                            <td className="p-2 border">
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}<br />
                                Phone: {order.shippingAddress.phonenumber}
                            </td>
                            <td className="p-2 border">
                                {order.billingAddresses.map((address, index) => (
                                    <div key={index}>
                                        {address.address}, {address.city}, {address.state} - {address.zip}<br />
                                        Phone: {address.phonenumber}
                                    </div>
                                ))}
                            </td>

                            <td className="p-2 border">
                           
                                
                                {order?.products.map(pro => (
                                    <div key={pro?.product._id}>
                                      <img src={pro?.product.images[0]} alt={pro?.product.name}  width={100} height={100}/>
                                    </div>
                                ))}
                            </td>

                            <td className="p-2 border">
                                {editingOrderId === order._id ? (
                                    <div>
                                        {/* <button
                                            onClick={handleEdit}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingOrderId(null)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button> */}
                                          <p className="bg-blue-500 text-white px-4 py-2 rounded">wait for update..!</p>
                                    </div>
                                ) : (
                                 
                                    <div>
                                         <>
                                        <button
                                            onClick={() => handleEditClick(order)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                       
                                        </>
                                        
                                        
                                            
                                    </div>
                                  

                                
                                )}
                            
                            </td>
                        </tr>
                    ))

                
            }



{ userRole!=='admin'&&   orders.map(order => (
                        <tr key={order._id}>
                            <td className="p-2 border text-center">{order._id}</td>
                            <td className="p-2 border text-center">{order.user.username}</td>
                            <td className="p-2 border text-center">₹{order.totalPrice}</td>
                        {order.status==='Cancelled'?(<td className="p-2 border text-red-600 text-center ">{order.status}</td>):(<td className="p-2 border text-green-700  text-center ">{order.status}</td>)}    
                            <td className="p-2 border text-center">{new Date(order.deliveryDate).toLocaleDateString()}</td>
                            <td className="p-2 border">
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}<br />
                                Phone: {order.shippingAddress.phonenumber}
                            </td>
                            <td className="p-2 border">
                                {order.billingAddresses.map((address, index) => (
                                    <div key={index}>
                                        {address.address}, {address.city}, {address.state} - {address.zip}<br />
                                        Phone: {address.phonenumber}
                                    </div>
                                ))}
                            </td>

                            <td className="p-2 border">
                           
                                
                                {order?.products.map(pro => (
                                    <div key={pro?.product._id}>
                                      <img src={pro?.product.images[0]} alt={pro?.product.name}  width={100} height={100}/>
                                    </div>
                                ))}
                            </td>

                            <td className="p-2 border">
                                {editingOrderId === order._id ? (
                                    <div>
                                        {/* <button
                                            onClick={handleEdit}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingOrderId(null)}
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button> */}
                             <p className="bg-blue-500 text-white px-4 py-2 rounded">wait for update..!</p>
                                    </div>
                                ) : (
                                 
                                    <div>
                                           { userRole!=='admin' &&(
                                            <>
                                           { order.status!=='Cancelled'&& order.status!=='Shipped'&& order.status!=='Delivered'?( <button
                                            onClick={() => handleEditClick(order)}
                                            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Cancel
                                        </button>):(<button
                                           
                                           className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                       >
                                           Cancel
                                       </button>)
                                           
                                        }                                
                                       
                                          </>
                                        
                                          ) }                                                                       
                                    
                                    </div>                                

                                
                                )}
                            
                            </td>
                        </tr>
                    ))

                
            }


                </tbody>
       

           
            </table>
            </div>
            </div>
            {editingOrderId && userRole==='admin'&& (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <form
                        onSubmit={handleEdit}
                        className="bg-white p-6 rounded shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">Edit Order</h2>
                        {/* <label className="block mb-2" htmlFor="totalPrice">
                            Total Price:
                            <input
                                type="number"
                                id="totalPrice"
                                name="totalPrice"
                                value={formData.totalPrice}
                                onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                                className="ml-2 border p-1 rounded"
                                required
                            />
                        </label> */}
                        <label className="block mb-2" htmlFor="status">
                            Status:
           { formData.status ==="Cancelled" ?( 
            
            <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="ml-2 border p-1 rounded"
                  required
                  readonly
                >
                  {/* <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option> */}
                  <option value="Cancelled">Cancelled</option>
                </select>
                ):( <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="ml-2 border p-1 rounded"
                    required
                  
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    {/* <option value="Cancelled">Cancelled</option> */}
                  </select>)
}
                        </label>
                        <label className="block mb-2" htmlFor="deliveryDate">
                            Delivery Date:
                            <input
                                type="date"
                                id="deliveryDate"
                                name="deliveryDate"
                                value={formatDate(formData.deliveryDate)}
                                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                                className="ml-2 border p-1 rounded"
                                required
                            />
                        </label>
                        {/* <fieldset className="mb-4">
                            <legend className="font-semibold">Shipping Address</legend>
                            <label className="block mb-2">
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.shippingAddress.address}
                                    onChange={(e) => handleFormChange(e, 'address', true)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                City:
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.shippingAddress.city}
                                    onChange={(e) => handleFormChange(e, 'city', true)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                State:
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.shippingAddress.state}
                                    onChange={(e) => handleFormChange(e, 'state', true)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Zip:
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.shippingAddress.zip}
                                    onChange={(e) => handleFormChange(e, 'zip', true)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Phone Number:
                                <input
                                    type="text"
                                    name="phonenumber"
                                    value={formData.shippingAddress.phonenumber}
                                    onChange={(e) => handleFormChange(e, 'phonenumber', true)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                        </fieldset> */}
                        {/* <fieldset className="mb-4">
                            <legend className="font-semibold">Billing Address</legend>
                            <label className="block mb-2">
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.billingAddresses[0].address}
                                    onChange={(e) => handleFormChange(e, 'address', false)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                City:
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.billingAddresses[0].city}
                                    onChange={(e) => handleFormChange(e, 'city', false)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                State:
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.billingAddresses[0].state}
                                    onChange={(e) => handleFormChange(e, 'state', false)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Zip:
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.billingAddresses[0].zip}
                                    onChange={(e) => handleFormChange(e, 'zip', false)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                Phone Number:
                                <input
                                    type="text"
                                    name="phonenumber"
                                    value={formData.billingAddresses[0].phonenumber}
                                    onChange={(e) => handleFormChange(e, 'phonenumber', false)}
                                    className="ml-2 border p-1 rounded"
                                    required
                                />
                            </label>
                        </fieldset> */}
                         <button
                            type="button"
                            onClick={() => setEditingOrderId(null)}
                            className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 mr-28 sm:mr-28 md:mr-28 lg:mr-28 rounded ml-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600  rounded"
                        >
                            Save
                        </button>
                       
                    </form>
                </div>
            )}
           
{/* cancel for user restricts */}


           {editingOrderId && userRole!=='admin' && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <form
                        onSubmit={handleEdit}
                        className="bg-white p-6 rounded shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">Edit Order</h2>
                 
                        <label className="block mb-2 " htmlFor="status">
                            Status:
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="ml-2 border p-1 rounded"
                  required
                >
                  <option value="Processing">Processing</option>
                 
                  <option value="Cancelled">Cancelled</option>
                </select>
                        </label>
                        
                       
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 mt-4  ml-5 rounded"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingOrderId(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
           












        </div>



        
        </>
    );
}
