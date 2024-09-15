// not using
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const SliderImage  = () => {
  const images = [
    'https://img.freepik.com/free-photo/woman-with-shopping-bags-jumping_23-2148883713.jpg?size=626&ext=jpg&ga=GA1.1.1195190754.1720606602&semt=ais_hybrid',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnR3bIizA4GckgDvMqs_jhUC-wu8roCqZ9g&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnR3bIizA4GckgDvMqs_jhUC-wu8roCqZ9g&s',
   ' https://t3.ftcdn.net/jpg/06/60/60/76/240_F_660607666_a7EMUwklgW06dOnMdPw2qdQ7nU8FqXn2.jpg'
  ];

  return (
    <div className="carousel-container">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showArrows={true}
        interval={3000}
        transitionTime={500}
        stopOnHover
        dynamicHeight={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Carousel ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SliderImage ;
