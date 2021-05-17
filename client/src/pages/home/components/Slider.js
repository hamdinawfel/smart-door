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
//M-UI
import { makeStyles } from '@material-ui/core/styles';
//utils
import Mybutton from '../../../utils/Mybutton'
//redux set up
import SliderLoading from './SliderLoading'
import { connect } from 'react-redux';
import { getCategories } from '../../catalog/actions'

// install Swiper modules
SwiperCore.use([EffectCoverflow,Pagination, Navigation, Parallax]);

function Slider(props) {
 
  useEffect(() => {
    props.getCategories();
  }, []);
  return (
    <div style={{ padding:0}}>
       { props.catalog.loadingCategories?
          <SliderLoading />
          :
          <React.Fragment>
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
                className="mySwiper"
                >
            
            {props.catalog.categories.map(item =><SwiperSlide key={item._id}>
            <div className="swiper-slide"  style={{ backgroundImage:`url(${item.imageUrl})`}}>
                {/* <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLWTdaX3J5b1VueDg" alt={item.name} className="entity-img" /> */}
                <div className="content">
                  <p className="title" data-swiper-parallax="-30%"  data-swiper-parallax-scale=".7">{item.title}</p>
                  <span className="caption" data-swiper-parallax="-20%">{item.caption}</span>
                  <Mybutton content="Découvrir" />
                </div>
              </div>
            </SwiperSlide>)}
            </Swiper>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </React.Fragment>
       }
    </div>
  );
}

const mapStateToProps = (state) => ({
  catalog: state.catalog
 });
 
 const mapActionsToProps =   {
  getCategories,

 };
 
 export default connect(
   mapStateToProps,
   mapActionsToProps
 )(Slider);