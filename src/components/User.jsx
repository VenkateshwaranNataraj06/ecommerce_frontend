

// import React, { useEffect, useState ,useContext} from 'react';
// import axios from 'axios';
// import { deleteUser, getUsers } from '../services/userService';
// import UserContext from '../context/UserContext';
// import AuthContext from '../context/AuthContext';
// import {
//   Container, Grid, Card, CardContent, CardMedia, Typography, TextField,Paper, Dialog, DialogContent, IconButton , Button, CircularProgress, Snackbar, Alert, Box,InputAdornment,
//   Link
// } from '@mui/material';
// import { confirmAlert } from 'react-confirm-alert';
// export default function User() {
//   const {users, setUsers} =useContext(UserContext) ;
//   const [editUser, setEditUser] = useState(null); // Track the user being edited
//   const [updatedEmail, setUpdatedEmail] = useState('');
//   const [updatedUsername, setUpdatedUsername] = useState('');
//   const {authToken}=useContext(AuthContext)  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [editingUser, setEditingUser] = useState(null);
     
//   useEffect(() => {

//     const fetchUser = async () => {
//       try {
//         if(authToken ){
//           const response = await getUsers();
//           console.log(response.data, "fetch.......");
        
          
//           if (Array.isArray(response.data)) {
//             setUsers(response.data);
//            console.log("USer>>>>>>>>>>>>>>>>>>>>",users);
           
//         } else {
//             setError('Unexpected data format');
//         }
//       }
//     } catch (error) {
//         setError('Error fetching data');
//         }
     
//     };
  
//     fetchUser();
  
    
//   }, []);

//   const handleDelete = async (userId) => {
//     console.log("delete.....",userId);
    
//     setLoading(true);

//     confirmAlert({
//         title: '',
//         message: 'Are you sure you want to delete this user?',
//         buttons: [
//             {
//                 label: 'Yes',
//                 onClick: async () => {
//                     try {
//                        await deleteUser(userId);
//                         setUsers(users.filter(user => user._id !== userId));
//                         setSuccess('user deleted successfully');
//                     } catch (error) {
//                         console.log(error?.response?.data?.message);
                        
//                         setError(error?.response?.data?.message||'Error deleting user');
//                     }
//                 }
//             },
//             {
//                 label: 'No',
//                 onClick: () => { setLoading(false)}
//             }
//         ]
//     });
// };



// const handleEditClick = () => {
//   setIsEditing(true);
// };

// const handleSaveClick = async (id) => {
//   try {
//     await updateUser(id,userDetails); // Assuming updateUser function exists
//     setIsEditing(false);
//   } catch (error) {
//     console.error('Error updating user data:', error);
//   }
// };

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setUserDetails((prevDetails) => ({
//     ...prevDetails,
//     [name]: value,
//   }));
// };



// const handleCancelEdit = () => {
//     setEditingUser(null);
// };

// const handleUpdate = async (event) => {
//     event.preventDefault();
//     setLoading(true);


//    try{
         
//             await updateProducts(editingUser._id, editingUser);
     
//         setProducts(users.map(user =>
//             user._id === editingUser._id ? editingUser : users
//         ));
        
//         setSuccess('USer updated successfully');
      
    

//     } catch (error) {
//         setError('Error updating product');
//     } finally {
//         setLoading(false);
//     }
// };

//   return (
//     <>
//       {loading && <CircularProgress color="inherit" />}
//                 <Snackbar
//                     open={!!error}
//                     autoHideDuration={6000}
//                     onClose={() => setError('')}
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                 >
//                     <Alert onClose={() => setError('')} severity="error">
//                         {error}
//                     </Alert>
//                 </Snackbar>
//                 <Snackbar
//                     open={!!success}
//                     autoHideDuration={6000}
//                     onClose={() => setSuccess('')}
//                     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//                 >
//                     <Alert onClose={() => setSuccess('')} severity="success">
//                         {success}
//                     </Alert>
//                 </Snackbar>
//       <h1 className="text-3xl font-semibold mb-4">Users</h1>
//       <table className="w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr>
//             <th className="p-2 border">ID</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               {editUser === user._id ? (
//                 // If in edit mode, show input fields
//                 <>
//                   <td className="p-2 border">{user._id}</td>
//                   <td className="p-2 border">
//                     <input
//                       type="text"
//                       value={updatedEmail}
//                       onChange={e => setUpdatedEmail(e.target.value)}
//                       className="border p-1"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <input
//                       type="text"
//                       value={updatedUsername}
//                       onChange={e => setUpdatedUsername(e.target.value)}
//                       className="border p-1"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <button
//                       className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
//                       onClick={() => handleUpdate(user._id)}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className="bg-gray-500 text-white px-3 py-1 rounded"
//                       onClick={() => setEditUser(null)}
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </>
//               ) : (
//                 // Display user data normally
//                 <>
//                   <td className="p-2 border">{user._id}</td>
//                   <td className="p-2 border">{user.email}</td>
//                   <td className="p-2 border">{user.username}</td>
//                   <td className="p-2 border">
//                     <button
//                       className="bg-green-500 text-white px-3 py-1 rounded mr-2"
//                       onClick={() => handleEdit(user)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }


// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { deleteUser, getUsers, updateUser } from '../services/userService';
// import UserContext from '../context/UserContext';
// import AuthContext from '../context/AuthContext';
// import {
//   Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Paper, Dialog, DialogContent, IconButton,
//   Button, CircularProgress, Snackbar, Alert, Box, InputAdornment, Link
// } from '@mui/material';
// import { confirmAlert } from 'react-confirm-alert';

// export default function User() {
//   const { users, setUsers } = useContext(UserContext);
//   const [editUser, setEditUser] = useState(null); // Track the user being edited
//   const [updatedEmail, setUpdatedEmail] = useState('');
//   const [updatedFirstname, setUpdatedFirstname] = useState('');  
//   const [updatedLastname, setUpdatedLastname] = useState('');
//   const { authToken } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         if (authToken) {
//           const response = await getUsers();
//           console.log(response.data);
          
//           if (Array.isArray(response.data)) {
//             setUsers(response.data);
       
//           } else {
//             setUsers(response.data);
            
//             setError('Unexpected data format');
//           }
//         }
//       } catch (error) {
//         setError('Error fetching data');
//       }
//     };

//     fetchUsers();
//   }, [authToken, setUsers]);

//   const handleDelete = async (userId) => {
//     setLoading(true);

//     confirmAlert({
//       title: '',
//       message: 'Are you sure you want to delete this user?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: async () => {
//             try {
//               await deleteUser(userId);
//               setUsers(users.filter(user => user._id !== userId));
//               setSuccess('User deleted successfully');
//             } catch (error) {
//               setError(error?.response?.data?.message || 'Error deleting user');
//             } finally {
//               setLoading(false);
//             }
//           }
//         },
//         {
//           label: 'No',
//           onClick: () => { setLoading(false); }
//         }
//       ]
//     });
//   };

//   const handleEditClick = (user) => {
//     setEditUser(user._id);
//     setUpdatedEmail(user.email);
//     setUpdatedFirstname(user.firstname);
//     setUpdatedLastname(user.lastname);
//   };

//   const handleSaveClick = async () => {
//     try {
//       await updateUser(editUser, { email: updatedEmail, firstname: updatedFirstname ,lastname:updatedLastname});
//       setUsers(users.map(user =>
//         user._id === editUser ? { ...user, email: updatedEmail, firstname: updatedFirstname ,lastname:updatedLastname} : user
//       ));
//       setSuccess('User updated successfully');
//       setEditUser(null); // Exit edit mode
//     } catch (error) {
//       setError('Error updating user');
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditUser(null);
//   };

//   return (
//     <>
//       {loading && <CircularProgress color="inherit" />}
//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError('')}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={() => setError('')} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
//       <Snackbar
//         open={!!success}
//         autoHideDuration={6000}
//         onClose={() => setSuccess('')}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert onClose={() => setSuccess('')} severity="success">
//           {success}
//         </Alert>
//       </Snackbar>

//       <h1 className="text-3xl font-semibold mb-4 text-center">Users</h1>
//       <table className="w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr>
//             <th className="p-2 border">ID</th>
//             <th className="p-2 border">Email</th>

//             <th className="p-2 col-span-2 border">FirstName</th>
//             <th className="p-2 border">LastName</th>

//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               {editUser === user._id ? (
//                 <>
//                   <td className="p-2 border">{user._id}</td>
//                   <td className="p-2 border">
//                     <input
//                       type="text"
//                       value={updatedEmail}
//                       onChange={e => setUpdatedEmail(e.target.value)}
//                       className="border p-1"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <input
//                       type="text"
//                       value={updatedFirstname}
//                       onChange={e => setUpdatedFirstname(e.target.value)}
//                       className="border p-1"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <input
//                       type="text"
//                       value={updatedLastname}
//                       onChange={e => setUpdatedLastname(e.target.value)}
//                       className="border p-1"
//                     />
//                   </td>
//                   <td className="p-2 border">
//                     <button
//                       className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
//                       onClick={handleSaveClick}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className="bg-gray-500 text-white px-3 py-1 rounded"
//                       onClick={handleCancelEdit}
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td className="p-2 border">{user._id}</td>
//                   <td className="p-2 border">{user.email}</td>
//                   <td className="p-2 border">{user.firstname}</td>
//                   <td className="p-2 border">{user.lastname}</td>
//                   <td className="p-2 border">
//                     <button
//                       className="bg-green-500 text-white px-3 py-1 rounded mr-2"
//                       onClick={() => handleEditClick(user)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>








//     </>
//   );
// }


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { deleteUser, getUsers, updateUser } from '../services/userService';
import UserContext from '../context/UserContext';
import AuthContext from '../context/AuthContext';
import {
  Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Paper, Dialog, DialogContent, IconButton,
  Button, CircularProgress, Snackbar, Alert, Box, InputAdornment, Link
} from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';

export default function User() {
  const { users, setUsers } = useContext(UserContext);
  const [editUser, setEditUser] = useState(null); // Track the user being edited
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedFirstname, setUpdatedFirstname] = useState('');
  const [updatedLastname, setUpdatedLastname] = useState('');
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...users });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (authToken) {
          const response = await getUsers();
          if (Array.isArray(response.data)) {
            setUsers(response.data);
            console.log(response.data);
            
          } else {
            setError('Unexpected data format');
          }
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchUsers();
  }, [authToken, setUsers]);


  const handleDelete = async (userId) => {
    setLoading(true);

    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteUser(userId);
              setUsers(users.filter(user => user._id !== userId));
              setSuccess('User deleted successfully');
            } catch (error) {
              setError(error?.response?.data?.message || 'Error deleting user');
            } finally {
              setLoading(false);
            }
          }
        },
        {
          label: 'No',
          onClick: () => { setLoading(false); }
        }
      ]
    });
  };

  const handleEditClick = (user) => {
    setEditUser(user._id);
    setUpdatedEmail(user.email);
    setUpdatedFirstname(user.firstname);
    setUpdatedLastname(user.lastname);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateUser(editUser, { email: updatedEmail, firstname: updatedFirstname, lastname: updatedLastname });
      setUsers(users.map(user =>
        user._id === editUser ? { ...user, email: updatedEmail, firstname: updatedFirstname, lastname: updatedLastname } : user
      ));
      setSuccess('User updated successfully');
      setEditUser(null); // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      setError('Error updating user');
    }
  };

  const handleCancelEdit = () => {
    setEditUser(null);
    setIsEditing(false);
  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.put(`/api/users/${users.id}`, formData);
      alert('User updated successfully!');
    } catch (err) {
      setError('Failed to update user');
    }
  };
  return (
    <>
    <div className='mb-10'>
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
      <h1 className="text-3xl font-semibold mb-4 text-center">Users</h1>
      <div className="overflow-x-auto">
      <table className="mx-auto w-[95%] bg-white shadow-md rounded-lg text-center  min-w-max">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">FirstName</th>
            <th className="p-2 border">LastName</th>
            {/* <th className="p-2 border">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} >
              <td className="p-2 border ">{user._id}</td>
              <td className="p-2 border ">
                {editUser === user._id ? (
                  <TextField
                    type="text"
                    value={updatedEmail}
                    onChange={e => setUpdatedEmail(e.target.value)}
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                   
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2 border">
                {editUser === user._id ? (
                  <TextField
                    type="text"
                    value={updatedFirstname}
                    onChange={e => setUpdatedFirstname(e.target.value)}
                    label="First Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                ) : (
                  user.firstname
                )}
              </td>
              <td className="p-2 border">
                {editUser === user._id ? (
                  <TextField
                    type="text"
                    value={updatedLastname}
                    onChange={e => setUpdatedLastname(e.target.value)}
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                ) : (
                  user.lastname
                )}
              </td>
              {/* <td className="p-2 border">
                {editUser === user._id ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveClick}
                      size="small"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancelEdit}
                      size="small"
                      style={{ marginLeft: '8px' }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(user)}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(user._id)}
                      size="small"
                      style={{ marginLeft: '8px' }}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>


      </div>
      </div>














      </div>

    </>
  );
}
