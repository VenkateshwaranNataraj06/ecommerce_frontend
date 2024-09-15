

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUsers, getUsers} from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import bgimg from '../image/bgsignup.png'


const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname:'',
        email: '',
        phonenumber: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
    const [error, setError] = useState('');
    const [Users, setUsers] = useState([]);
    const [isErrorShown, setIsErrorShown] = useState(false); 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate(); 

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         if (isErrorShown) return;
    //         try {
    //             const response = await getUsers() ;
    //             if (Array.isArray(response.data)) {
    //                 setUsers(response.data);
    //             } else {
    //                 console.error('Unexpected data format:', response.data);
    //                 setError('Unexpected data format');
    //                 setIsErrorPopupOpen(true);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //             // setError('Error fetching users');
    //             // setIsErrorPopupOpen(true);
    //             if (!isErrorShown) {
    //                 // toast.error('Error fetching users');
    //                 setIsErrorShown(true);
    //             }
    //         }
    //     };

    //     fetchUsers();
    // }, [isErrorShown]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isInvalid = Object.values(formData).some(value => value.trim() === '');

        if (isInvalid) {
            toast.warning('All fields are required and cannot be empty.',{autoClose:2000})
            // setError('All fields are required and cannot be empty.');
            // setIsErrorPopupOpen(true);
            
            return; 
        }

        if (formData.password !== formData.confirmPassword) {
            // setError('Passwords do not match');
            toast.error('Passwords do not match',{
                autoClose: 3000,       
                position: "top-right", 
                // closeOnClick: true,  
                // pauseOnHover: true, 
                draggable: false});
            // setIsErrorPopupOpen(true);
            return;
        }

        // const userExists = Users.some(user => formData.email === user.email);
        // if (userExists) {
        //     setError('User with this email already exists');
        //     setIsErrorPopupOpen(true);
        //     return;
        // }

        try {
            const { confirmPassword, ...dataToSend } = formData;
            const response = await createUsers(dataToSend)
            console.log(response.data,"ugyg");
            toast.success('Signup successful')
          
          setTimeout(()=> navigate('/login'),1000) 
        } catch (error) {
            console.log(error.message);
            console.log(error.response?.data,"ugyg");
            const errorMessage = error.response?.data?.message||error.response?.data?.Invalid || 'Signup failed';
            toast.error(errorMessage)
          
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 via-blue-50 to-purple-100 "
        style={{
    
            backgroundImage: `url(${bgimg})`,
        
           
            backgroundRepeat: 'no-repeat',
           
          }}
        
        >
             <div  >
    
    
     
  
            {/* <ToastContainer> */}
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-semibold mb-8 text-gray-900">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        name="firstname" 
                        value={formData.firstname} 
                        onChange={handleChange} 
                        placeholder="Firstname" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                    />
                    <input 
                        name="lastname" 
                        value={formData.lastname} 
                        onChange={handleChange} 
                        placeholder="Lastname" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                    />
                    <input 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        type="email" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                    />
                    <div className="relative">
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            required
                            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}"
                            title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-600 focus:outline-none"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className="relative">
                        <input 
                            name="confirmPassword" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            placeholder="Confirm Password" 
                            type={showConfirmPassword ? "text" : "password"} 
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-600 focus:outline-none"
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <input 
                        name="phonenumber" 
                         pattern="[7-9]{1}[0-9]{9}"
                        value={formData.phonenumber} 
                        onChange={handleChange} 
                        placeholder="Phonenumber" 
                        type="text" 
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#6C63FF]  to-blue-600 bg-[#6C63FF] text-white p-3 rounded-lg hover:from-blue-600 hover:to-[#6C63FF] transition duration-300"
                    >
                        Signup
                    </button>
                </form>
            </div>

            {isErrorPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <p className="mb-4 text-red-600">{error}</p>
                        <button
                            onClick={() => setIsErrorPopupOpen(false)}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
        </div>
    );
};

export default Signup;

