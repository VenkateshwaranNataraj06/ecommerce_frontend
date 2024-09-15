import React from 'react';
import { Grid, Typography, Container, CardMedia } from '@mui/material';
import Banner from './Banner';
import ScrollableImage from './ScrollImage';
import { useNavigate } from 'react-router-dom';
import category from '../image/category.png'
export default function AdminHome() {
  const navigate = useNavigate()
  return (

    <>
       <Banner />

      <Container className='mt-10'>
        <Typography variant="h3" align="center" gutterBottom sx={{
          marginBottom: '40px',

          fontWeight: '700',
          backgroundImage: 'linear-gradient(45deg, #FF6F61, #D83F6E)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textAlign: 'center',
          fontFamily: 'Montserrat, sans-serif',

          fontSize: {
            xs: '1rem',
            sm: '1.25rem',
            md: '1.5rem',
            lg: '2.2rem',
          }

        }}

        >
          Admin Management
        </Typography>

        <Grid container spacing={2} className="mt-4">
          <Grid item xs={3} sm={6} md={4} lg={3} >
            <Typography variant="h6" gutterBottom align='center' sx={{
              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: {
                xs: '0.75rem',
                sm: '1.25rem',
                md: '1.5rem',
                lg: '1.5rem'
              }, color: 'blue'

            }}>
              Products
            </Typography>

            <CardMedia
              component="img"
              image="https://us.123rf.com/450wm/serezniy/serezniy2103/serezniy210389347/166539640-different-modern-devices-on-color-background.jpg?ver=6"

              alt='product'
              sx={{


                height: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
                width: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
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

              role="button"
              tabIndex={0}
              onClick={() => navigate('/adminproduct')}

            />
          </Grid>
          <Grid item xs={3} sm={6} md={4} lg={3} >
            <Typography variant="h6" gutterBottom align='center' sx={{
              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: {
                xs: '0.75rem',
                sm: '1.25rem',
                md: '1.5rem',
                lg: '1.5rem'
              }, color: 'blue'

           }}>
              Category
            </Typography>

            <CardMedia
              component="img"
              image={category}

              alt='category'
              sx={{


                height: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
                width: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
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
              role="button"
              tabIndex={0}
              onClick={() => navigate('/category')}

            />


          </Grid>
          <Grid item xs={3} sm={6} md={4} lg={3} >
            <Typography variant="h6" gutterBottom align='center' sx={{

              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: {
                xs: '0.75rem',
                sm: '1.25rem',
                md: '1.5rem',
                lg: '1.5rem'
              },
              color: 'blue'

            }}>
              Orders
            </Typography>

            <CardMedia
              component="img"
              image="https://entail-assets.com/fortrade/Pending_Orders_in_Forex-1670513805419.jpg"

              alt='product'
              sx={{
                height: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
                width: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
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

              role="button"
              tabIndex={0}
              onClick={() => navigate('/order')}

            />

          </Grid>
          <Grid item xs={3} sm={6} md={4} lg={3} >
            <Typography variant="h6" gutterBottom align='center' sx={{

              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: {
                xs: '0.75rem',
                sm: '1.25rem',
                md: '1.5rem',
                lg: '1.5rem'
              },
              color: 'blue'

            }}>
              Users
            </Typography>

            <CardMedia
              component="img"
              image="https://spring2innovation.com/wp-content/uploads/2021/05/Who-Are-Your-Users_-A-Deeper-Look-at-Personas-Blog-Header.jpg"

              alt='User'
              sx={{


                height: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
                width: {
                  xs: 100,
                  sm: 200,
                  md: 200,
                  lg: 200
                },
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

              role="button"
              tabIndex={0}
              onClick={() => navigate('/user')}

            />
         </Grid>

        </Grid>
      </Container>
      <div className="App text-center p-4">
        <ScrollableImage />
      </div>
    </>

  );
};

