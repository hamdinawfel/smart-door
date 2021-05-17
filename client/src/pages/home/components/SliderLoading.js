import React, { useEffect } from "react";
import '../assets/style.scss'
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    EffectCoverflow,Pagination, Navigation, Parallax
  } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

// install Swiper modules
SwiperCore.use([EffectCoverflow,Pagination, Navigation, Parallax]);


  export default function SliderLoading() {

  return (
    <div style={{ padding:0}}>
    <Swiper 
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      init= {false}
      loop= {true}
      speed={500}
      parallax={true}
      coverflowEffect={{
            "rotate": 50,
            "stretch": 0,
            "depth": 100,
            "modifier": 1,
            "slideShadows": true
            }} 
      pagination={true} 
      navigation={true}
      className="mySwiper">
  
  {[1,2,3].map(item =><SwiperSlide key={item}>
  <div className="swiper-slide" style={{ backgroundImage:"url(https://secureservercdn.net/192.169.223.13/dvx.d21.myftpupload.com/wp-content/uploads/2020/10/g1.jpg?time=1620830896)"}}>
      <img src="https://secureservercdn.net/192.169.223.13/dvx.d21.myftpupload.com/wp-content/uploads/2020/10/g1.jpg?time=1620830896" className="entity-img" />
      <div className="content">
        <p className="title" data-swiper-parallax="-30%"  data-swiper-parallax-scale=".7">POTRTES DE HAUTE Qualité</p>
        <span className="caption" data-swiper-parallax="-20%">Some short description.</span>
      </div>
    </div>
   </SwiperSlide>)}
  </Swiper>
  <div className="swiper-button-prev"></div>
  <div className="swiper-button-next"></div>
    </div>

  );
}
