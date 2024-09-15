import React from 'react'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import SliderImage from './SliderImage';






const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    width:300,
  };
export default function Carousel() {
  return (
    <div>
 
 <div className="relative  bg-gray-800 text-white mt-2">

        <Slider {...settings}>

          <div className="h-full flex items-center justify-center bg-blue-500">
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img24hp/urec/hero/Under1499_Tallhero_3000x1200._CB568928188_.jpg"
            alt="amazon"
            className="w-full h-64 "
          />
            {/* <h1 className="text-4xl font-bold">Welcome to Our Store!</h1> */}
          </div>
          <div className="h-full flex items-center justify-center bg-red-500">
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20" alt="amazon" className='w-full ' />
            {/* <h1 className="text-4xl font-bold">Great Deals Just for You</h1> */}
          </div>
          <div className="h-full flex items-center justify-center bg-green-500">
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6c988345b003738d.jpg?q=20" alt="amazon" className='w-full'/>
            {/* <h1 className="text-4xl font-bold">Shop the Latest Trends</h1> */}
          </div>
          <div className="h-full flex items-center justify-center bg-green-500">
          <img src=" https://www.techupsoftsolution.com/assets/images/industries/ecommerce-banner-web.jpg" alt="amazon" className='w-full h-64'/>
        
          </div>
         
          
          {/* <div className="h-full flex items-center justify-center bg-green-500">
          <img src="https://www.pointblend.com/wp-content/uploads/2016/11/ecom-2.jpg" alt="amazon" className='w-full'/>
        
          </div> */}

          
         
        </Slider>
      </div>




    </div>
  )
}
