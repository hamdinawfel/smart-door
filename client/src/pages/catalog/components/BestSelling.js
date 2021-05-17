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
    textTransform:'capitalize',
    width: 200,
    padding: '10px 30px',
    
    cursor: 'pointer',
    display: 'block',
    margin: '0',
    background:theme.palette.primary.main,
    color: '#fff',
    border:0,
    outline: 'none',
    borderRadius:' 30px', 
    position: 'relative',
    zIndex: 5,
    boxSizing: 'border-box',   
    fontWeight: 600,
    fontSize:'15px', 
    border:`2px solid ${theme.palette.primary.main}`,
    transition: '0.5s',
    '&:hover': {
        background: '#fff',
        color: theme.palette.primary.main,
        border:`2px solid ${theme.palette.primary.main}`
        // boxShadow: '0 0 5px #57AAB4,  0 0 25px #57AAB4,  0 0 50px #57AAB4, 0 0 100px #03e9f4',
      },
      [theme.breakpoints.down('sm')]: {
        padding:'10px',
      },
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