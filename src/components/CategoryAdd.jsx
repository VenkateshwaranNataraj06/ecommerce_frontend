import React, { useContext, useEffect, useState} from 'react';
import {
    Container, Grid, Card, CardContent, CardMedia,IconButton, Typography, TextField, Button, CircularProgress, Snackbar, Alert, Box,
    
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../services/categoryServices';
import CategoriesContext from '../context/CategoryContext';
import CloseIcon from '@mui/icons-material/Close';
import { confirmAlert } from 'react-confirm-alert';
import AuthContext from '../context/AuthContext';

export default function CategoryAdd() {
    const { categories, setCategories } = useContext(CategoriesContext);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' ,image:''});
    const [editingCategory, setEditingCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const {authToken}=useContext(AuthContext)
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
console.log(categories,"lkjhhu");


useEffect(()=>{
    console.log("AdDD CATEGORYYY inside");
    const fetchCategories = async () => {
        console.log("AdDD CATEGORYYY inside");
        
        setLoading(true);
    try{

         if(categories.length===0 && authToken!=='' ) 
            {
             const categoriesResponse = await getCategories();
               console.log(categoriesResponse,"AdDD CATEGORYYY response>>>>");
        
                      if (Array.isArray(categoriesResponse.data)) {
                         
                         
                          setCategories(categoriesResponse.data);
                      } else {
                          setError('Unexpected data format');
                      }
            }
                  } catch (error) {
                    console.log(error);
                    
                      setError('Error fetching data');
                  } finally {
                      setLoading(false);
                  }
                }

                fetchCategories()
    

},[])



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleEditClick = (product) => {
       setEditingCategory({
            ...product,
         
        });
    };

    const handleCancelEdit = () => {
       setEditingCategory(null);
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

       
        try {
          
                
                await updateCategory(editingCategory._id, editingCategory);
      
            setCategories(categories.map(category =>
                category._id === editingCategory._id ? editingCategory : category
            ));
            setSuccess('Category updated successfully');
            handleCancelEdit();
        } catch (error) {
            setError('Error updating category');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (event) => {
        event.preventDefault();
        setLoading(true);

        const isInvalid = Object.values(newCategory).some(value => value.trim() === '');

        if (isInvalid) {
           setError('All fields are required and cannot be empty.')
    
            
            return; 
        }





        const categoryExists = categories.some(category => (category.name).toLowerCase() === (newCategory.name).toLowerCase());
 console.log(categoryExists ,"categoryExists ");
 
    if (categoryExists) {
        setLoading(false);
        setError('Category already exists');
        return;
    }
        try {
           

            await addCategory(newCategory);
            const newCategoryData = { ...newCategory };
            setCategories([...categories, newCategoryData]);
            setSuccess('Category added successfully');
            setNewCategory({ name: '', description: '',image:' ' });
          window.location.reload()
            
        } catch (error) {
            console.log(error.response?.data?.message);
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (categoryId) => {
        console.log("delete.....",categoryId);
        
        setLoading(true);

        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                           await deleteCategory(categoryId);
                            setCategories(categories.filter(category => category._id !== categoryId));
                            setSuccess('category deleted successfully');
                            setLoading(false)
                        } catch (error) {
                            console.log(error?.response?.data?.message);
                            
                            setError(error?.response?.data?.message||'Error deleting category');
                            setLoading(false)
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




    return (
        <div className='mt-5'>
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
            <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
                    sx={{
                        margin:'10px'
                    }}
                >
                    {showAddCategoryForm ? 'Cancel' : 'Add New Category'}
                </Button>


       {showAddCategoryForm  && (     <div className="fixed top-0 insert-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
           
                      
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
                        <Box display="flex" justifyContent="flex-end">
          <IconButton
            color="inherit"
            onClick={()=>navigate('/adminproduct')}
            
          >
            <CloseIcon   sx={{
               
                '&:hover': {
                    background:'red',
                color:'white', 
                  }
            }}/>
          </IconButton>
        </Box>      
            <form onSubmit={handleAddCategory}>
                <Typography variant="h6" gutterBottom >
                    Add New Category
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Images (URLs)"
                    name="image"
                    value={newCategory.image}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    
                >
                    Add Category
                </Button>
            </form>
            </div>
            </div>
       )}






<Grid container spacing={2} >
                    {categories.map(category => (
                        <Grid item xs={6} sm={6} md={4} lg={3} key={category._id}>
                            <Typography variant="h6" sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                marginBottom: '8px',
                                textAlign: 'center',

                                backgroundImage: 'linear-gradient(45deg, #1e3c72, #2a5298)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',

                                                }}>
                                                    {category.name}
                                                </Typography>
                                               
                            <Card>
                                <CardMedia
                                    component="img"
                                    style={{ height: '250px', width: '100%', objectFit: 'contain' ,padding:'10px'}}
                                    image={category.image || "https://via.placeholder.com/150"}
                                    alt={category.name}
                                />
                                <CardContent>
                              
                      
                   
                                    {editingCategory &&editingCategory._id === category._id ? (
                                          <div className="fixed top-0 insert-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                        
                                             <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
                                        <form onSubmit={handleUpdate}>
                                            <Typography variant="h6" gutterBottom>
                                                Edit Category
                                            </Typography>
                                            <TextField
                                                label="Name"
                                                value={editingCategory.name}
                                                onChange={(e) =>setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            
                                            <TextField
                                                label="Description"
                                                value={editingCategory.description}
                                                onChange={(e) =>setEditingCategory({ ...editingCategory, description: e.target.value })}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            
                                          
                                                <TextField
                                                    label="Images (URLs)"
                                                    name='image'
                                                    value={editingCategory.image}
                                                    onChange={(e) =>setEditingCategory({ ...editingCategory, images: e.target.value })}
                                                    fullWidth
                                                    margin="normal"
                                                />
                                        
                                           
                                               
                                            <Button variant="contained" color="primary" type="submit" className="mt-4"
                                           sx={{
                                            mr: { xs: 2, sm: 4, md: 6, lg: 8 }, 
                                            // mt: { xs: 2, sm: 2, md: 4, lg: 4 },
                                            // px: { xs: 2, sm: 3, md: 4 }, 
                                            // py: { xs: 1, sm: 2, md: 3 }, 
                                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '.8rem' },
                                          }} >
                                                Update Product
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={handleCancelEdit} className="mt-4">
                                                Cancel
                                            </Button>
                                        </form>
                                        </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Box>
                                                <Typography variant="h6" style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    marginBottom: '8px',
                                                    textAlign: 'center'
                                                }}>
                                                    {category.description}
                                                </Typography>
                                               
                                                
                                            </Box>
                                           <div className='flex flex-row gap-2 items-center justify-center'>
                                            <div>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleEditClick(category)}
                                                className="mt-2"
                                            >
                                                Edit
                                            </Button>
                                            </div>
                                            <div>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(category._id)}
                                                className="mt-2"
                                            >
                                                Delete
                                            </Button>
                                            </div>
                                            </div>
                                          
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </div>
    );
}


