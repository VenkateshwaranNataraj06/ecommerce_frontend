// ImageZoom.js
import React from 'react';
import ImageMagnify from 'react-image-magnify';
import { useMediaQuery, useTheme } from '@mui/material';

const ImageZoom = ({ src, alt }) => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const smallImageSize = isSmallScreen ? { width: 200, height: 300 } : { width: 300, height: 400 };
  const largeImageSize = isSmallScreen ? { width: 300, height: 500 } : { width: 400, height: 700 };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        height: '100%',
         position: 'relative',
      }}
    >
    
      <div>
        <ImageMagnify
          {...{
            smallImage: {
              alt: alt,
              isFluidWidth: false,
            
              src: src,
              width: smallImageSize.width,
              height: smallImageSize.height,
             
            },
            largeImage: {
              src: src,
              width: largeImageSize.width,
              height: largeImageSize.height,
            },
            enlargedImagePosition: 'over', 
            lensStyle: { backgroundColor: 'rgba(0,0,0,0.3)' },
          }}
        />
      </div>
    </div>
  );
};

export default ImageZoom;
