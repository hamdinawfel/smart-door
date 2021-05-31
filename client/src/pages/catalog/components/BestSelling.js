import React , { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//Mui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
//components
import ProductCard from './ProductCard'
import ProductsLoading from './ProductsLoading'
import BestSellingSlider from './BestSellingSlider'
//redux set up
import { connect } from 'react-redux';
import { getCatalog } from '../actions'

const useStyles = makeStyles((theme) => ({
 root:{
    padding:'0px 100px ',
    [theme.breakpoints.down('md')]: {
        padding:'0px 20px',
    },
    [theme.breakpoints.down('sm')]: {
        padding:0,
    }
 },
 desktopSlider:{
    display:'flex',
    justifyContent:'center',
    [theme.breakpoints.down('sm')]: {
      display:'none',
    },
 },
 phoneSlide:{
    display:'none',
    [theme.breakpoints.down('sm')]: {
      display:'block',
    },
 },
 myButton:{
  color: '#fff',
  marginTop:15,
  borderRadius:0,
  backgroundColor: theme.palette.primary.main,
   letterSpacing:0.8,
   textTransform:'capitalize',
  transition: '0.5s',
  '&:hover': {
   backgroundColor: '#fff',
   color: theme.palette.primary.main
  },
  // [theme.breakpoints.down('xs')]: {
  //   marginTop:10,
  // },
},
}));


function BestSelling(props) {
  const classes = useStyles();
  let history = useHistory();
  const handleNavigateToCatalog = ()=>{
    history.push('/catalog')
  }
//   const handleAddToCart = (id)=>{
//     props.addToCart(id); 
//   }
//  const handleSubQuantity = (id)=>{
//     props.subQuantity(id)
//  }
 
//  const handleNavigateToCart = ()=>{
//     history.push('/cart')
//   }


//   const handleClickOpen = (id) => {
//     setOpen(true);
//     setSelected(id)
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
 useEffect(() => {
   props.getCatalog("best selling");
    },[]);
  return (
    <div className={classes.root}>
        <Grid container className={classes.desktopSlider}>
        {props.catalog.loadingCategories?
          <ProductsLoading  />
          :
          <React.Fragment>
           {props.catalog.products.map(item => 
              <ProductCard 
                  key={item._id}
                  title={item.title}
                  price={item.price}
                  theme={item.theme}
                  description={item.description}
                  imageUrl={item.imageUrl} />) }
          </React.Fragment>}
     </Grid> 
     <div className={classes.phoneSlide}>
       <BestSellingSlider />
     </div>
     <div style={{ margin:'60px 0 120px 0', display:'flex', justifyContent:'center', zIndex:0, position:'relative'}}>
       <Button className={classes.myButton} onClick={handleNavigateToCatalog}>
          Full Catalog
       </Button>
     </div>
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
)(BestSelling);