



import React, { useEffect, useRef } from 'react';
import {useNavigate } from 'react-router-dom';

const ScrollableImage = () => {
  const pic = [
    'https://img.freepik.com/free-photo/woman-with-shopping-bags-jumping_23-2148883713.jpg?size=626&ext=jpg&ga=GA1.1.1195190754.1720606602&semt=ais_hybrid',
   
    'https://m.media-amazon.com/images/I/61yWnrT3eQL._SY741_.jpg',      
    'https://m.media-amazon.com/images/I/71PfyTreJIL._AC_UY327_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71bDJ9wxxWL._AC_UY327_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/71eJAaD6aBL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61utX8kBDlL._SY695_.jpg',
    'https://m.media-amazon.com/images/I/61GfOYqwHkL._SX679_.jpg',
    'https://m.media-amazon.com/images/I/61zs+yEFnAL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71-t2KrBzfL._SL1500_.jpg',
    'https://m.media-amazon.com/images/I/517gNdneATL.jpg',
    'https://t3.ftcdn.net/jpg/06/60/60/76/240_F_660607666_a7EMUwklgW06dOnMdPw2qdQ7nU8FqXn2.jpg',
  
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnR3bIizA4GckgDvMqs_jhUC-wu8roCqZ9g&s',
    
 
  ];

  const containerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollStep = 2; 
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (scrollAmount >= scrollWidth - clientWidth) {
        scrollAmount = 0;
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollAmount += scrollStep;
        container.scrollTo({left:   scrollAmount, behavior: 'smooth' });
      }
    }, 50); 

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    // <div
    //   ref={containerRef}
    //   className="w-full h-96  gap-2 overflow-x-auto whitespace-nowrap mt-12"
    // >
      
    //   {pic.map((im, index) => (
    //     <img
    //       key={index}
    //       src={im}
    //       alt={`Im ${index + 1}`}
    //       className="inline-block h-full object-cover"
    //       onClick={()=>navigate('/product')}
       

    //               />
    //   ))}
 
    // </div>

    <div
  ref={containerRef}
  className="w-full mt-12 overflow-x-auto whitespace-nowrap flex gap-2"
>
  {pic.map((im, index) => (
    <img
      key={index}
      src={im}
      alt={`Image ${index + 1}`}
      className="inline-block h-48 md:h-64 lg:h-80 object-cover cursor-pointer"
      onClick={() => navigate('/product')}
    />
  ))}
</div>

  );
};

export default ScrollableImage;
