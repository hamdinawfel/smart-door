
import React, { useRef, useState , useEffect} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

//ASSETS
import '../assets/style.scss';
//components
import ProductCard from './ProductCard'
import LoadingBestSelling from './LoadingBestSelling'
// import Swiper core and required modules
import SwiperCore, {
  Pagination,
  Navigation
} from 'swiper/core';
//redux
import { connect } from 'react-redux';
import { getCatalog } from '../actions'

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);


function BestSellingSlider(props) {
  useEffect(() => {
    props.getCatalog("best selling")
  }, []);

  return (
    <div>
    <Swiper  
    style={{ height: 400, width: '100%',}} 
    slidesPerView={1} 
    spaceBetween={1} 
    pagination={{"clickable": true}}
    pagination={true} 
    navigation={true}>
         {props.catalog.loadingCategories?
           <SwiperSlide>
             <LoadingBestSelling  />
        </SwiperSlide>
          :
          <React.Fragment>
           {props.catalog.products.map(item => 
              <SwiperSlide>
                 <ProductCard 
                  key={item._id}
                  title={item.title}
                  price={item.price}
                  theme={item.theme}
                  description={item.description}
                  imageUrl={item.imageUrl} />
              </SwiperSlide>   
              ) }
          </React.Fragment>}
  </Swiper>
    </div>
  )
}
const mapStateToProps = (state) => ({
  catalog: state.catalog
 });
 
 const mapActionsToProps =   {
  getCatalog,
 //   addToCart,
 //   subQuantity,
 };
 
 export default connect(
   mapStateToProps,
   mapActionsToProps
 )(BestSellingSlider);