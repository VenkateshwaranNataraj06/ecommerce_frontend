
import React, { useEffect, useState, useContext } from 'react';
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
  const [editUser, setEditUser] = useState(null); 
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
      setEditUser(null); 
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.put(`/users/${users.id}`, formData);
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
