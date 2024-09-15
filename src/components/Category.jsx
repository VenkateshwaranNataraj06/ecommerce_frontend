import React, { useContext, useState ,useEffect} from 'react';
import {
    Container, Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Snackbar, Alert, Box,
    Link
} from '@mui/material';
import ProductContext from '../context/ProductContext';
import CategoriesContext from '../context/CategoryContext';
import { getProducts, updateProducts, deleteProducts, createProducts,  addCategory } from '../services/apiServices';
import { getCarts, deleteCarts, createCarts } from '../services/cartServices';
import { createOrders } from '../services/orderServices';
import { getCategories } from '../services/categoryServices';

export default function CategoriesGroup() {
    const { categories,cid,setCid,setCategories} = useContext(CategoriesContext);
    const { products,setProducts ,filteredProducts,setFilteredProducts} = useContext(ProductContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            setLoading(true);
            try {
              console.log("lkjkgs357900");
              console.log(products);
              
            if(products.length === 0 || categories.length === 0)
            {
                const productsResponse = await getProducts();
                const categoriesResponse = await getCategories();
  console.log(categoriesResponse,"jtghjk");
  
                if (Array.isArray(productsResponse.data)) {
                    setProducts(productsResponse.data);
                    setFilteredProducts(productsResponse.data);
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
        };
  
        fetchProductsAndCategories();
    }, []);
  
  
     
  

    const handleAddToCart = async (productId, price) => {
        // This function should be adapted to work with your existing cart logic
        try {
            setLoading(true);
            await createCarts(productId, price); // Assuming this function is defined elsewhere
            setSuccess('Product added to cart successfully');
        } catch (error) {
            setError('Error adding product to cart');
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = async (product) => {
        // This function should be adapted to work with your existing order logic
        setLoading(true);
        try {
            await createOrders(product); // Assuming this function is defined elsewhere
            setSuccess('Order placed successfully');
        } catch (error) {
            setError('Error placing order');
        } finally {
            setLoading(false);
        }
    };


        const groupedProducts = categories.reduce((acc, category) => {
            acc[category._id] = filteredProducts.filter(product => product?.category?._id === category?._id);
            return acc;
        }, {});
   
      
   

  
    return (
        <>
            <Container>
                <Typography variant="h3" align="center" gutterBottom className="mt-4">
                    Featured Products
                </Typography>
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

                <Grid container spacing={2} className="mt-4">
                    {categories.map(category => (
                        <Grid item xs={12} key={category._id}>
                            <Typography variant="h6" gutterBottom>
                                {category.name}
                            </Typography>
                            
                            <CardMedia
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
                            />
                            <Grid container spacing={2}>
                                {(groupedProducts[category._id] || []).map(product => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                                                image={product.images[0] || "https://via.placeholder.com/150"}
                                                alt={product.name}
                                            />
                                            <CardContent>
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
                                                        Price: ${product.price}
                                                    </Typography>
                                                    <Typography variant="h6" style={{
                                                        textAlign: 'center',
                                                        marginTop: '8px'
                                                    }}>
                                                        Stock: {product.stock}
                                                    </Typography>
                                                </Box>
                                                <Button
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
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className="mt-2"
                                                >
                                                    <Link to='/orderform'>Buy Now</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
