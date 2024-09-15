import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button, CircularProgress, Snackbar, Alert, Avatar, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import { getUsers, updateUser } from '../services/userService';
import PersonIcon from '@mui/icons-material/Person';
import AuthContext from '../context/AuthContext';
import Cookies from 'js-cookie';
import { getCarts } from '../services/cartServices';
import ProductContext from '../context/ProductContext';

export default function  Profile  ()  {
  const [isEditing, setIsEditing] = useState(false);
  const {authToken, setAuthToken,userRole,setUserRole} = useContext(AuthContext)
  const [userDetails, setUserDetails] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber:''
  });
// console.log(authToken,"authLLLLLLLLLLLLL");
const { setCartlength, setCart, } = useContext(ProductContext)
const usermail =Cookies.get('useremail');
// console.log(usermail,"usermaiusermais");
useEffect(() => {
  const role = Cookies.get('userRole');
  const token = Cookies.get('authToken');
 
  if (token) {
      setAuthToken(token);
      // console.log(authToken, "authTokenorder");
  }
  setUserRole(role);
  setLoading(false);
  // console.log("role order>>>>>>>>>>", role);

}, [authToken, setUserRole]);

  const [open, setOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUsers();
        // console.log((response.data,"response.data[0]>>>>>>>>>>>>"));
        if (Array.isArray(response.data) && response.data.length > 0) {

          if (userRole === 'admin') {
      

            const details = response.data.filter(user => user.email === usermail)
          
            if (details.length > 0) {
              // console.log("Filtered user details:", details);

              setUserDetails(details[0]);
          } else {
              console.log("No users found with the email:");
          }

          }
          else {
           
            setUserDetails(response.data[0]);
          }

         
        // console.log( response.data );
        
          
          
        } else {
          console.error('Unexpected data format or empty array');
        }
      } catch (error) {
        console.error('Error fetching user data:');
      }
    };

    fetchUserData();
  }, []);
// console.log(userDetails,"userdetailsssssssssssssssssss");
  useEffect(() => {
        const isPageRefreshed = sessionStorage.getItem('isPageRefreshed');

        if (isPageRefreshed) {

            const fetchCart = async () => {
                // console.log("fetch.......response.data,", authToken, userRole, "}");
                try {
                    if (userRole !== 'admin') {
                        const response = await getCarts();
                        // console.log(response.data, "fetch.......");
                        if (response.data && typeof response.data === 'object') {
                            setCart(response.data[0]);
                            // console.log(response.data[0].items.length, "response.data[0].items.length");
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


const handleEditClick = (product) => {
  setOpen(true);
  setEditedDetails({
      ...userDetails,
     
  });
};

const handleCancelEdit = () => {
  setEditedDetails(null);
  setOpen(false);
};

const handleUpdate = async (event) => {
  event.preventDefault();
  setLoading(true);
 console.log(typeof(editedDetails.firstname),typeof(editedDetails.lastname),typeof(editedDetails.email) ,typeof(editedDetails.phonenumber));
  


  const isInvalid = Object.values(editedDetails).some(value => String(value).trim() === '');


if (isInvalid) {
  setError('All fields are required and cannot be empty.');
  return; 
}

  try {
      
          // console.log(editedDetails, "(editingDetails.>>>>>>>>>>>>>>");
          const response=await updateUser(editedDetails._id, editedDetails);
          // console.log(response);
       
          if (Array.isArray(response.data) && response.data.length > 0) {
            setUserDetails(response.data[0]); 
          
            // console.log((response,"response.data[0]"));
            
          } else {
            console.error('Unexpected data format or empty array');
          }
          
      setEditedDetails(userDetails._id === editedDetails._id ? editedDetails :userDetails)   
      setSuccess('User updated successfully');
      // setIsEditing(false);
      handleCancelEdit();
  } catch (error) {
    // console.log(error);
    // console.log(error?.response?.data?.message);
    
      setError(error?.response?.data?.message||'Error updating user');
  } finally {
      setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
  
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

      <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />


        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar
            alt="User Avatar"
            src={userDetails.image || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
            sx={{ width: 96, height: 96, margin: 'auto', border: '4px solid white', position: 'relative', top: -48 }}
          />
          <Typography variant="h6" component="div">
          {userDetails.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {userDetails.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {userDetails.phonenumber}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 16 }}>
           
          </div>
        </CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Tooltip title="Edit Profile">
            <IconButton   onClick={() => handleEditClick(userDetails)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Delete Profile">
            <IconButton 
            // onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}
        </CardContent>
      </Card>

      {editedDetails && editedDetails._id === userDetails._id &&
      
      <Dialog open={open} onClose={handleCancelEdit}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
          
            label="firstname"
            type="text"
            fullWidth
            variant="outlined"
            value={editedDetails.firstname}
            onChange={(e) => setEditedDetails({ ...editedDetails, firstname: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
           
            label="lastname"
            type="text"
            fullWidth
            variant="outlined"
            value={editedDetails.lastname}
             onChange={(e) => setEditedDetails({ ...editedDetails, lastname: e.target.value })}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          value={editedDetails.email}
             onChange={(e) => setEditedDetails({ ...editedDetails, email: e.target.value })}
          />
          <TextField
            margin="dense"
          
            label="phonenumber"
            type="text"
            fullWidth
            variant="outlined"
            value={editedDetails.phonenumber}
             onChange={(e) => setEditedDetails({ ...editedDetails, phonenumber: e.target.value })}
          />
          <label >Photo</label><br />
            <input
              type="file"
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files[0]; 
                if (file) {
                  // console.log(file); 

                  setEditedDetails(prev => ({
                    ...prev,
                    image: file 
                  }));
                }
              }}
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button onClick={handleUpdate }>Save</Button>
        </DialogActions>
      </Dialog>
            }
    </div>
  );
};

