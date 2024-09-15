
import React from 'react';
import { Container, Typography,  Grid } from '@mui/material';
import { Link ,useLocation} from 'react-router-dom';

const Footer = () => {
  return (

    <>
    <div className="block bg-gray-800   text-white text-center ">

    <a href="#" className="p-1 text-xl text-white block hover:text-blue-600" underline="none">
  Back To Top
</a>
</div>
    <footer className="bg-gray-800 text-white py-4  ">
       
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
              About Us
            </Typography>
            <Typography variant="body2" className="text-gray-100" >
              We are a leading e-commerce platform providing a wide range of products at competitive prices. Our mission is to deliver quality and convenience to our customers.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4" sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <ul className="list-none p-0">
           
              <li>
                <Link to='/' className=" hover:text-blue-800 block mb-2 text-base" underline="none">
                  Home
                </Link>
              </li>
              <li>
                <Link to='/product' className=" hover:text-blue-800 block mb-2" underline="none">
                  Shop
                </Link>
              </li>
             
              <li>
                <Link href="#" className="hover:text-blue-800 block mb-2" underline="none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4" sx={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" className="text-gray-100 mb-2">
              Email: vr@gmail.com
            </Typography>
            <Typography variant="body2" className="text-gray-100">
              Phone: 9876543210
            </Typography>
          </Grid>
        </Grid>
        <div className="mt-8 text-center">
          <Typography variant="body2" className="text-white">
            &copy; {new Date().getFullYear()} VR Shop. All rights reserved.
          </Typography>
        </div>
      </Container>
      {/* <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MyStore. All rights reserved.</p>
          <div className="mt-2">
            <a href="#home" className="hover:underline">Home</a> | 
            <a href="#products" className="hover:underline">Products</a> | 
            <a href="#offers" className="hover:underline">Offers</a> | 
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer> */}
    </footer>
    </>
  );
};

export default Footer;
