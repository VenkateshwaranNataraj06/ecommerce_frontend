
// import React, { useEffect, useState } from 'react';
// import { getProducts, updateProducts, deleteProducts, createOrders, createCarts, createProducts, getCategories, addCategory } from '../services/apiServices';
// import {
//     Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, CircularProgress, Snackbar, Alert, Box
// } from '@mui/material';
// import Carousel from './Carousel';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import SliderImage from './SliderImage';
// import ScrollableImage from './ScrollImage';


// export default function Product() {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
//     const [newCategory, setNewCategory] = useState({ name: '', description: '' });
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [newProduct, setNewProduct] = useState({ name: '', price: '', images: [], description: '', category: '' });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [showAddProductForm, setShowAddProductForm] = useState(false);
//     useEffect(() => {
//         const fetchProductsAndCategories = async () => {
//             setLoading(true);
//             try {
//                 const productsResponse = await getProducts()
//                 const categoriesResponse = await getCategories()
//                 console.log(categoriesResponse.data, "categoriesResponse");

//                 if (Array.isArray(productsResponse.data)) {
//                     setProducts(productsResponse.data);
//                     setCategories(categoriesResponse.data);
//                 } else {
//                     setError('Unexpected data format');
//                 }
//             } catch (error) {
//                 console.log(error.response?.data?.message);
//                 setError('Error fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProductsAndCategories();
//     }, []);

//     const handleEditClick = (product) => {
//         setEditingProduct(product);
//     };

//     const handleCancelEdit = () => {
//         setEditingProduct(null);
//     };

//     const handleUpdate = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         try {
//             const response = await updateProducts(editingProduct._id, editingProduct);
//             setProducts(products.map(product =>
//                 product._id === editingProduct._id ? editingProduct : product
//             ));
//             setSuccess('Product updated successfully');
//             handleCancelEdit();
//         } catch (error) {
//             console.log(error.response?.data?.message);
//             setError('Error updating product');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (productId) => {
//         setLoading(true);

//         confirmAlert({
//             title: '',
//             message: 'Are you sure you want to delete this product?',
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             await deleteProducts(productId);
//                             setProducts(products.filter(product => product._id !== productId));
//                             alert('Product deleted successfully');
//                         } catch (error) {
//                             alert('Error deleting product');
//                         }
//                     }
//                 },
//                 {
//                     label: 'No',
//                     onClick: () => { }
//                 }
//             ]
//         });


//         // try {
//         //     await deleteProducts(productId);
//         //     setProducts(products.filter(product => product._id !== productId));
//         //     setSuccess('Product deleted successfully');
//         // } catch (error) {
//         //     console.log(error.response?.data?.message);
//         //     setError('Error deleting product');
//         // } finally {
//         //     setLoading(false);
//         // }
//     };

//     const handleAddToCart = async (productId, price) => {
//         try {
//             await createCarts(productId, price);
//             setSuccess('Product added to cart successfully');
//         } catch (error) {
//             console.log(error.response?.data?.message);
//             console.error('Error adding product to cart:', error);
//             setError('Error adding product to cart');
//         }
//     };

//     const handleBuyNow = async (product) => {
//         setLoading(true);
//         try {
//             const response = await createOrders(product);
//             console.log(response);

//             setSuccess('Order placed successfully');
//         } catch (error) {
//             console.log(error.response?.data?.message);
//             setError('Error placing order');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddProduct = async (event) => {
//         event.preventDefault();
//         setLoading(true);
//         try {
//             await createProducts(newProduct);
//             setProducts([...products, { ...newProduct }]);
//             setSuccess('Product added successfully');
//             setNewProduct({ name: '', price: '', images: [], category: '' });
//             setShowAddProductForm(false);
//         } catch (error) {
//             console.log(error.response?.data?.message);

//             setError('Error adding product');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const handleAddCategory = async (category) => {
//     //     try {
//     //         await addCategory(category);
//     //         setCategories([...categories, category]);
//     //         setSuccess('Category added successfully');
//     //     } catch (error) {
//     //         console.log(error.response?.data?.message);

//     //         setError('Error adding category');
//     //     }
//     // };
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewCategory((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleAddCategory = async (event) => {
//         event.preventDefault(); // Prevent the default form submission behavior
//         try {
//             await addCategory(newCategory.name, newCategory.description);
//             setShowAddCategoryForm(false);
//             setNewCategory({ name: '', description: '' });
//             setSuccess('Category added successfully');
//         } catch (error) {
//             console.log(error.response?.data?.message);
//             setError('Error adding category');
//         }
//     };
//     return (
//         <>
//             <div className="App text-center p-4">

//                 <ScrollableImage
//                 />
//             </div>

//             <Carousel />

//             <Container>
//                 <Typography variant="h3" align="center" gutterBottom className="mt-4">
//                     Featured Products
//                 </Typography>
//                 {loading && <CircularProgress color="inherit" />}
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
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => setShowAddProductForm(!showAddProductForm)}
//                     className="mt-4"
//                 >
//                     {showAddProductForm ? 'Cancel' : 'Add New Product'}
//                 </Button>
//                 {showAddProductForm && (
//                     <>
//                         <Typography variant="h5" gutterBottom className="mt-4">
//                             Add New Product
//                         </Typography>
//                         <form onSubmit={handleAddProduct}>
//                             <TextField
//                                 label="Name"
//                                 value={newProduct.name}
//                                 onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                             />
//                             <TextField
//                                 label="Price"
//                                 type="number"
//                                 value={newProduct.price}
//                                 onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                             />
//                             <TextField
//                                 label="Images (URLs)"
//                                 value={newProduct.images.join(', ')}
//                                 onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value.split(', ') })}
//                                 fullWidth
//                                 margin="normal"
//                             />
//                             <TextField
//                                 label="Description"
//                                 value={newProduct.description}
//                                 onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                             />
//                             <TextField
//                                 label="Category"
//                                 select
//                                 value={newProduct.category}
//                                 onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//                                 fullWidth
//                                 margin="normal"
//                                 SelectProps={{
//                                     native: true,
//                                 }}
//                             >
//                                 <option value="" disabled>Select Category</option>
//                                 {categories.map(category => (
//                                     <option key={category._id} value={category._id}>{category.name}</option>
//                                 ))}
//                                 <option value="new" onClick={() => setShowAddCategoryForm(true)}>Add New Category</option>
//                             </TextField>
//                             {newProduct.category === 'new' && showAddCategoryForm && (<>
//                                 <form onSubmit={handleAddCategory}>
//                                     <TextField
//                                         label="Name"
//                                         name="name"
//                                         value={newCategory.name}
//                                         onChange={handleInputChange}
//                                         fullWidth
//                                         margin="normal"
//                                     />
//                                     <TextField
//                                         label="Description"
//                                         name="description"
//                                         value={newCategory.description}
//                                         onChange={handleInputChange}
//                                         fullWidth
//                                         margin="normal"
//                                     />
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         type="submit"
//                                         className="mt-4"


//                                     >
//                                         Add Category
//                                     </Button>
//                                 </form>
//                             </>
//                             )}
//                             <Button variant="contained" color="primary" type="submit" className="mt-4">
//                                 Add Product
//                             </Button>
//                         </form>
//                     </>
//                 )}
//                 <Grid container spacing={2} className="mt-4">
//                     {products.map(product => (
//                         <Grid item xs={12} sm={6} md={4} lg={3} key={product._id} >
//                             <Card>
//                                 <CardMedia
//                                     component="img"
//                                     // height="140"
//                                     style={{ height: '200px', width: '100%', objectFit: 'contain' }}
//                                     image={product.images[0] || "https://via.placeholder.com/150"}
//                                     alt={product.name}
//                                 />
//                                 <CardContent>
//                                     {editingProduct && editingProduct._id === product._id ? (
//                                         <form onSubmit={handleUpdate}>
//                                             <Typography variant="h6" gutterBottom>
//                                                 Edit Product
//                                             </Typography>
//                                             <TextField
//                                                 label="Name"
//                                                 value={editingProduct.name}
//                                                 onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
//                                                 fullWidth
//                                                 margin="normal"
//                                                 required
//                                             />
//                                             <TextField
//                                                 label="Price"
//                                                 type="number"
//                                                 value={editingProduct.price}
//                                                 onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
//                                                 fullWidth
//                                                 margin="normal"
//                                                 required
//                                             />
//                                             <TextField
//                                                 label="Images (URLs)"
//                                                 value={editingProduct.images.join(', ')}
//                                                 onChange={(e) => setEditingProduct({ ...editingProduct, images: e.target.value.split(', ') })}
//                                                 fullWidth
//                                                 margin="normal"
//                                             />
//                                             <TextField
//                                                 label="Category"
//                                                 select
//                                                 value={editingProduct.category}
//                                                 onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
//                                                 fullWidth
//                                                 margin="normal"
//                                                 SelectProps={{
//                                                     native: true,
//                                                 }}
//                                             >
//                                                 {categories.map(category => (
//                                                     <option key={category._id} value={category._id}>{category.name}</option>
//                                                 ))}
//                                             </TextField>
//                                             <Button variant="contained" color="primary" type="submit" className="mt-4">
//                                                 Update Product
//                                             </Button>
//                                             <Button variant="outlined" color="secondary" onClick={handleCancelEdit} className="mt-4">
//                                                 Cancel
//                                             </Button>
//                                         </form>
//                                     ) : (
//                                         <>
//                                             {/* <Typography variant="h6">{product.name}</Typography>
//                                             <Typography variant="body2">Price: ${product.price}</Typography> */}

//                                             <Box>
//                                                 <Typography variant="h6" style={{
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     whiteSpace: 'nowrap',
//                                                     marginBottom: '8px',
//                                                     textAlign: 'center' // Optional: Adds some spacing below the text
//                                                 }}
//                                                 >{product.description}

//                                                 </Typography>
//                                                 <Typography variant="h6" style={{
//                                                     textAlign: 'center',        // Center the price text
//                                                     marginTop: '8px'            // Optional: Add space above the price
//                                                 }}>Price: ${product.price}</Typography>
//                                             </Box>

//                                             <Button
//                                                 variant="contained"
//                                                 color="primary"
//                                                 onClick={() => handleAddToCart(product._id, product.price)}
//                                                 className="mt-2"
//                                             >
//                                                 Add to Cart
//                                             </Button>
//                                             <Button
//                                                 variant="contained"
//                                                 color="secondary"
//                                                 onClick={() => handleBuyNow(product)}
//                                                 className="mt-2"
//                                             >
//                                                 Buy Now
//                                             </Button>
//                                             <Button
//                                                 variant="outlined"
//                                                 color="primary"
//                                                 onClick={() => handleEditClick(product)}
//                                                 className="mt-2"
//                                             >
//                                                 Edit
//                                             </Button>
//                                             <Button
//                                                 variant="outlined"
//                                                 color="error"
//                                                 onClick={() => handleDelete(product._id)}
//                                                 className="mt-2"
//                                             >
//                                                 Delete
//                                             </Button>
//                                         </>
//                                     )}
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Container>
//         </>
//     );
// }

import React, { useContext, useEffect, useState,useMemo } from 'react';
import { getProducts, updateProducts, deleteProducts, createProducts } from '../services/apiServices';
import { createOrders } from '../services/orderServices';
import { createCarts } from '../services/cartServices';
import { getCategories, addCategory } from '../services/categoryServices';
import {
    Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, CircularProgress, Snackbar, Alert, Box,
    Link
} from '@mui/material';
import Carousel from './Carousel';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import ScrollableImage from './ScrollImage';
import ProductContext from '../context/ProductContext';
import CategoriesContext from '../context/CategoryContext';

export default function Product() {
    const [File,setFile]=useState('')
    const { products, setProducts, filteredProducts, setFilteredProducts,filter,  setFilter } = useContext(ProductContext)
    const { categories, cid, setCid, setCategories } = useContext(CategoriesContext);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '', price: '', stock: '', images: [], description: '', category: '', brand: '', useFileUpload: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [filterCheck,setFilterCheck]=useState(false)
console.log(products,"beforenew");

    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            setLoading(true);
            try {
                const productsResponse = await getProducts();
                const categoriesResponse = await getCategories();

                if (Array.isArray(productsResponse.data)) {
                    setProducts(productsResponse.data);
                    setCategories(categoriesResponse.data);
                } else {
                    setError('Unexpected data format');
                }
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const handleEditClick = (product) => {
        setEditingProduct({
            ...product,
            useFileUpload: false 
        });
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        const isInvalid = Object.values(editingProduct).some(value => String(value).trim() === '');


        if (isInvalid) {
          setError('All fields are required and cannot be empty.');
          return; 
        }
        try {
            if (editingProduct.useFileUpload) {
                console.log(editingProduct,"editingProduct");
                
                const formData = new FormData();
                formData.append('name', editingProduct.name);
                formData.append('price', editingProduct.price);
                formData.append('stock', editingProduct.stock);
                formData.append('description', editingProduct.description);
                formData.append('category', editingProduct.category);
                formData.append('brand', editingProduct.brand);
                console.log( editingProduct.images," editingProduct.images");
                
                editingProduct.images.forEach(file => {
                    console.log(file, "file");

                    formData.append('images', file)

                });

                console.log('Files being uploaded:', editingProduct.images);
console.log(formData,"editingProduct formdata");

                await updateProducts(editingProduct._id, formData);
            } else {

                console.log(editingProduct, "(editingProduct.>>>>>>>>>>>>>>");


                if (Array.isArray(editingProduct.images) && editingProduct.images.length > 0) {

                    const imagesString = editingProduct.images[0];


                    editingProduct.images = imagesString.split(',');
                }


                console.log(editingProduct, "(updated newProduct with images array >>>>>>>>>>>>>")
                
                await updateProducts(editingProduct._id, editingProduct);
            }
            setProducts(products.map(product =>
                product._id === editingProduct._id ? editingProduct : product
            ));
            setSuccess('Product updated successfully');
            handleCancelEdit();
        } catch (error) {
            setError('Error updating product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        console.log("delete.....", productId);

        setLoading(true);

        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await deleteProducts(productId);
                            setProducts(products.filter(product => product._id !== productId));
                            setSuccess('Product deleted successfully');
                            setLoading(false)
                        } catch (error) {
                            console.log(error);

                            setError(error?.response?.data?.message || 'Error deleting product');
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { setLoading(false) }
                }
            ]
        });
    };

    const handleAddToCart = async (productId, price) => {
        try {
            const response = await createCarts(productId, price);
            setSuccess('Product added to cart successfully');
        } catch (error) {
            console.log(error.response.data.message, "cart error");

            setError('Error adding product to cart');
        }
    };

    const handleBuyNow = async (product) => {
        setLoading(true);
        try {
            const response = await createOrders(product);
            setSuccess('Order placed successfully');
        } catch (error) {
            setError('Error placing order');
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        setLoading(true);
        const isInvalid = Object.values(newProduct).some(value => String(value).trim() === '');


        if (isInvalid) {
            setError('All fields are required and cannot be empty.');
            return;
        }

        try {
            if (newProduct.useFileUpload) {



                console.log("NewPeoductsss", newProduct);


                const formData = new FormData();
                formData.append('name', newProduct.name);
                formData.append('price', newProduct.price);
                formData.append('stock', newProduct.stock);
                formData.append('description', newProduct.description);
                formData.append('category', newProduct.category);
                formData.append('brand', newProduct.brand);

                console.log(newProduct.images, "newProduct.images.>>>>>>>>>>>>>>>>>>>>");

                newProduct.images.forEach(file => {
                    console.log(file, "file to append >>>>>>>>>>>>");
                    formData.append('images', file);
                });




                console.log(formData, "formdata");

                const response = await createProducts(formData);

                console.log(response);
                window.location.reload()

            } else {

                console.log(newProduct, "(newProduct>>>>>>>>>>>>>>");


                if (Array.isArray(newProduct.images) && newProduct.images.length > 0) {

                    const imagesString = newProduct.images[0];


                    newProduct.images = imagesString.split(',');
                }


                console.log(newProduct, "(updated newProduct with images array >>>>>>>>>>>>>");


                const response = await createProducts(newProduct);
                console.log(response);
                window.location.reload()

            }
           

              setProducts(prevProducts => {
            console.log('Previous products:', prevProducts);
            const updatedProducts = [...prevProducts, { ...newProduct }];
            console.log('Updated products:', updatedProducts);
            return updatedProducts;
        });

            setSuccess('Product added successfully');
            setNewProduct({
                name: '', price: '', stock: '', images: [], description: '', category: '', brand: '', useFileUpload: false
            });
            setShowAddProductForm(false);
        } catch (error) {
            console.log(error);

            console.log(error?.response?.data?.message);
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddCategory = async (event) => {
        event.preventDefault();
        try {
            await addCategory(newCategory.name, newCategory.description);
            setShowAddCategoryForm(false);
            setNewCategory({ name: '', description: '' });
            setSuccess('Category added successfully');
        } catch (error) {
            setError('Error adding category');
        }
    };
    const groupedProducts = categories.reduce((acc, category) => {
        
        acc[category._id] = products.filter(product =>{
            
            const productCategoryId = product?.category?._id|| product?.category;
             return productCategoryId === category._id
           });
        return acc;
    }, {});






console.log('Grouped Products:', groupedProducts);



    return (
        <>
<div className='mt-10'>
            {/* <div className="App text-center p-4 ">
                <ScrollableImage />
            </div>

            <Carousel /> */}

            <Container>
                {/* <Typography variant="h3" align="center" gutterBottom className="mt-4">
                    Featured Products
                </Typography> */}
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
                    onClick={() => setShowAddProductForm(!showAddProductForm)}
                    sx={{
                        marginTop:'20px',
                        marginBottom: '20px'
                    }}
                >
                    {showAddProductForm ? 'Cancel' : 'Add New Product'}
                </Button>
                {showAddProductForm && (
                    <>
                        <div className="fixed top-0 insert-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">


                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
                                <Typography variant="h5" gutterBottom className="mt-4">
                                    Add New Product
                                </Typography>
                                <form onSubmit={handleAddProduct}>
                                    <TextField
                                        label="Name"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Price"
                                        type="number"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Stock"
                                        type="number"
                                        value={newProduct.stock}
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Brand"
                                        value={newProduct.brand}
                                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setNewProduct(prev => ({ ...prev, useFileUpload: !prev.useFileUpload }))}
                                        className="mt-2"
                                        size="small" 
                                    >
                                        {newProduct.useFileUpload ? 'Use URLs' : 'Upload Files'}
                                    </Button>
                                    {newProduct.useFileUpload ? (
                                        <input
                                            type="file"
                                            name='images'
                                            multiple
                                           onChange={(e) => {setNewProduct(prev => ({ ...prev, images: Array.from(e.target.files) }));
                                              }}
                                            
                                           
                                        />
                                    ) : (
                                        <TextField
                                            label="Images (URLs)"
                                            name='images'
                                            value={newProduct.images.join(', ')}
                                            onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value.split(', ') })}
                                            fullWidth
                                            margin="normal"
                                        />
                                    )}
                                    <TextField
                                        label="Description"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Category"
                                        select
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ))}

                                        {/* <option value="new" onClick={() => setShowAddCategoryForm(true)}>Add New Category</option> */}
                                        <option value="new" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => navigate('/category')}>Add New Category</option>

                                    </TextField>
                                    {newProduct.category === 'new' && showAddCategoryForm && (
                                        <form onSubmit={handleAddCategory}>
                                            <TextField
                                                label="Name"
                                                name="name"
                                                value={newCategory.name}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <TextField
                                                label="Description"
                                                name="description"
                                                value={newCategory.description}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className="mt-4"
                                            >
                                                Add Category
                                            </Button>
                                        </form>
                                    )}

                                    <div className='flex justify-between  gap-10'>
                                   
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setShowAddProductForm(!showAddProductForm)}
                                        className="mt-4"
                                    >

                                        {showAddProductForm ? 'Cancel' : 'Add New Product'}
                                    </Button>
                                    
                                    <Button variant="contained" color="warning" type="submit" className="mt-4">
                                        Add Product
                                    </Button>
                                 
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}
           {!filter&&        <Grid container spacing={2} className="mt-4">

                    {categories.map(category => (
                        <Grid item xs={12} key={category._id}>
                            <Typography variant="h6" textAlign='center' gutterBottom marginBottom='40px'

                                sx={{
                                    marginBottom: '40px',
                                    fontSize: '2.2rem',
                                    fontWeight: '500',
                                    backgroundImage: 'linear-gradient(45deg, #FF6F61, #D83F6E)',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                    textAlign: 'center',
                                    fontFamily: 'Montserrat, sans-serif',
                                }}

                            >
                                {category.name}
                            </Typography>

                            {/* <CardMedia
                                component="img"
                                image={category.image}

                                alt={category.name}
                                sx={{
                                    height: 200,
                                    width: 200, 
                                    objectFit: 'cover', 
                                    borderRadius: '50%', 
                                   
                                    paddingTop: '10px',
                                    marginBottom: '30px',
                                    display: 'block', 
                                    mx: 'auto',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.1)' 
                                    }
                                }}
                            /> */}
                            <Grid container spacing={2} >
                                {(groupedProducts[category._id] || []).map(product => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                                                image={product.images[0] || "https://via.placeholder.com/150"}
                                                alt={product.name}
                                                sx={{paddingTop:'10px'}}
                                            />
                                            <CardContent>



                                                {editingProduct && editingProduct._id === product._id ? (
                                                    <div className="fixed top-0 insert-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">

                                                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
                                                            <form onSubmit={handleUpdate}>
                                                                <Typography variant="h6" gutterBottom textAlign='center'>
                                                                    Edit Product
                                                                </Typography>
                                                                <TextField
                                                                    label="Name"
                                                                    value={editingProduct.name}
                                                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    required
                                                                />
                                                                <TextField
                                                                    label="Price"
                                                                    type="number"
                                                                    value={editingProduct.price}
                                                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    required
                                                                />
                                                                <TextField
                                                                    label="Stock"
                                                                    type="number"
                                                                    value={editingProduct.stock}
                                                                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) })}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    required
                                                                />
                                                                <TextField
                                                                    label="Brand"
                                                                    value={editingProduct.brand}
                                                                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    required
                                                                />
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() => setEditingProduct(prev => ({ ...prev, useFileUpload: !prev.useFileUpload }))}
                                                                     size="small"
                                                                     sx={{


                                                                            
                                                                            '@media (max-width: 496px)': {
                                                                               
                                                                                marginBottom:'5px'
                                                                            }
                                                                    
                                                                     }}
                                                                >
                                                                    {editingProduct.useFileUpload ? 'Use URLs' : 'Upload Files'}
                                                                </Button>
                                                                {editingProduct.useFileUpload ? (
                                                                    <input className='ml-5 '
                                                                        type="file"
                                                                        multiple
                                                                        onChange={(e) =>{
                                                                            console.log(e.target.files);
                                                                            
                                                                            setEditingProduct(prev => ({ ...prev, images: Array.from(e.target.files) }))}}

                                                                           
                                                                    />
                                                                ) : (
                                                                    <TextField
                                                                        label="Images (URLs)"
                                                                        value={editingProduct.images.join(', ')}
                                                                        onChange={(e) => setEditingProduct({ ...editingProduct, images: e.target.value.split(', ') })}
                                                                        fullWidth
                                                                        margin="normal"
                                                                    />
                                                                )}
                                                                <TextField
                                                                    label="Description"
                                                                    value={editingProduct.description}
                                                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                                    fullWidth
                                                                    margin="normal"
                                                                />
                                                                <TextField
                                                                    label="Category"
                                                                    select
                                                                    value={editingProduct?.category?._id}
                                                                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    SelectProps={{
                                                                        native: true,
                                                                    }}
                                                                >
                                                                    {categories.map(category => (
                                                                        <option key={category._id} value={category._id}>{category.name}</option>
                                                                    ))}
                                                                </TextField>
                                                        
                                                                <Button variant="outlined" color="secondary" onClick={handleCancelEdit} sx={{





                                                                    marginRight: {
                                                                        xs: '16px',
                                                                        sm: '24px',
                                                                        md: '200px',
                                                                        '@media (max-width: 520px)': {
                                                                            marginRight: '28px',
                                                                        }
                                                                    }
                                                                }}>
                                                                    Cancel
                                                                </Button>
                                                                <Button variant="contained" color="primary" type="submit">
                                                                    Update Product
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
                                                                {product.description}
                                                            </Typography>
                                                            <Typography variant="h6" style={{
                                                                textAlign: 'center',
                                                                marginTop: '8px'
                                                            }}>
                                                                Brand: {product.brand}
                                                            </Typography>
                                                            <Typography variant="h6" style={{
                                                                textAlign: 'center',
                                                                marginTop: '8px'
                                                            }}>
                                                                Price: ₹{product.price}
                                                            </Typography>
                                                            <Typography variant="h6" style={{
                                                                textAlign: 'center',
                                                                marginTop: '8px'
                                                            }}>
                                                                Stock: {product.stock}
                                                            </Typography>
                                                        </Box>
                                                        {/* <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleAddToCart(product._id, product.price)}
                                                className="mt-2"
                                            >
                                                Add to Cart
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleBuyNow(product)}
                                                className="mt-2"
                                            >
                                                Buy Now
                                            </Button> */}
                                                        <div className='flex flex-row items-center justify-center gap-20 mt-4'>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                onClick={() => handleEditClick(product)}
                                                                className="mt-2"
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => handleDelete(product._id)}
                                                                className="mt-2"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </CardContent>

                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    ))}
             </Grid>}
























             {filter&&        <Grid container spacing={2} className="mt-4">

   
        <Grid container spacing={2} >

            {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <Card>
                        <CardMedia
                            component="img"
                            style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                            image={product.images[0] || "https://via.placeholder.com/150"}
                            alt={product.name}
                            sx={{paddingTop:'10px'}}
                        />
                        <CardContent>



                            {editingProduct && editingProduct._id === product._id ? (
                                <div className="fixed top-0 insert-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">

                                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
                                        <form onSubmit={handleUpdate}>
                                            <Typography variant="h6" gutterBottom textAlign='center'>
                                                Edit Product
                                            </Typography>
                                            <TextField
                                                label="Name"
                                                value={editingProduct.name}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            <TextField
                                                label="Price"
                                                type="number"
                                                value={editingProduct.price}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            <TextField
                                                label="Stock"
                                                type="number"
                                                value={editingProduct.stock}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) })}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            <TextField
                                                label="Brand"
                                                value={editingProduct.brand}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setEditingProduct(prev => ({ ...prev, useFileUpload: !prev.useFileUpload }))}
                                                 size="small"
                                            >
                                                {editingProduct.useFileUpload ? 'Use URLs' : 'Upload Files'}
                                            </Button>
                                            {editingProduct.useFileUpload ? (
                                                <input className='ml-5 '
                                                    type="file"
                                                    multiple
                                                    onChange={(e) =>{
                                                        console.log(e.target.files);
                                                        
                                                        setEditingProduct(prev => ({ ...prev, images: Array.from(e.target.files) }))}}
                                                />
                                            ) : (
                                                <TextField
                                                    label="Images (URLs)"
                                                    value={editingProduct.images.join(', ')}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, images: e.target.value.split(', ') })}
                                                    fullWidth
                                                    margin="normal"
                                                />
                                            )}
                                            <TextField
                                                label="Description"
                                                value={editingProduct.description}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <TextField
                                                label="Category"
                                                select
                                                value={editingProduct?.category?._id}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                                fullWidth
                                                margin="normal"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                            >
                                                {categories.map(category => (
                                                    <option key={category._id} value={category._id}>{category.name}</option>
                                                ))}
                                            </TextField>
                                       
                                            <Button variant="outlined" color="secondary" onClick={handleCancelEdit}  sx={{marginRight:'200px'}}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary" type="submit">
                                                Update Product
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
                                            {product.description}
                                        </Typography>
                                        <Typography variant="h6" style={{
                                            textAlign: 'center',
                                            marginTop: '8px'
                                        }}>
                                            Brand: {product.brand}
                                        </Typography>
                                        <Typography variant="h6" style={{
                                            textAlign: 'center',
                                            marginTop: '8px'
                                        }}>
                                            Price: ₹{product.price}
                                        </Typography>
                                        <Typography variant="h6" style={{
                                            textAlign: 'center',
                                            marginTop: '8px'
                                        }}>
                                            Stock: {product.stock}
                                        </Typography>
                                    </Box>
                                    {/* <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddToCart(product._id, product.price)}
                            className="mt-2"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleBuyNow(product)}
                            className="mt-2"
                        >
                            Buy Now
                        </Button> */}
                                    <div className='flex flex-row items-center justify-center gap-20 mt-4'>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleEditClick(product)}
                                            className="mt-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(product._id)}
                                            className="mt-2"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </>
                            )}
                        </CardContent>

                    </Card>
                </Grid>
            ))}
        </Grid>

</Grid>}
            </Container>

           {filter &&filteredProducts.length === 0 &&
       <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: '10px' }}>
          No products found
        </Typography>
      }

            </div>
        </>
    );
}
