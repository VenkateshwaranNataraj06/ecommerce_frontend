import React from 'react'
import './css/banner.css';
import vid from './video/loginbg3.mov'
import welcome from '../image/welcome1.png';
import {
  Container, Grid, Card, CardContent, CardMedia, Typography, TextField,Paper, Dialog, DialogContent, IconButton , Button, CircularProgress, Snackbar, Alert, Box,InputAdornment,
  Link
} from '@mui/material';

export default function Banner() {
  return (

    <  Box >
    <div className="video-container" >
    
    <video className='video'
      autoPlay
      loop
      muted
      playsInline
      
    >
      <source src={vid} type="video/mp4" />
      Your browser does not support the video tag.
    </video> 
<div className='image-container'>
    <img src={welcome} alt='welcome' className='image' />
  </div>
    </div>
    </  Box >
  )
}
