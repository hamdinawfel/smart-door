import React from "react";
import { useHistory } from "react-router-dom";

import '../assets/style.scss'
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    EffectCoverflow,Pagination, Navigation, Parallax, Autoplay
  } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
//M-UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//redux set up
import SliderLoading from './SliderLoading'
import { connect } from 'react-redux';
// install Swiper modules
SwiperCore.use([EffectCoverflow,Pagination, Navigation, Parallax,Autoplay]);

const useStyles = makeStyles((theme) => ({
 button:{
    color: '#fff',
    marginTop:15,
    backgroundColor: theme.palette.primary.main,
     letterSpacing:0.8,
     textTransform:'capitalize',
    transition: '0.5s',
    borderRadius:0,
    '&:hover': {
     backgroundColor: '#fff',
     color: theme.palette.primary.main
    },
 }
}));

function Slider(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleNavigateToCatalog = (subCategory)=>{
    let url = `/catalog/${subCategory.replace(/ /g, '-')}`
    history.push(url)
  }
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
                autoplay={{
                  "delay": 2500,
                  "disableOnInteraction": false
                }}
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
            <div className="swiper-slide"  style={{ backgroundImage:`url(${item.imageUrl})`}} onClick={()=>handleNavigateToCatalog(item.name)}>
                <div className="content">
                  <p className="title">{item.title}</p>
                  <span className="caption">{item.caption}</span>
                  <Button onClick={()=>handleNavigateToCatalog(item.name)} className={classes.button}>Découvrir</Button>
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
 
 export default connect(
   mapStateToProps,
   null
 )(Slider);