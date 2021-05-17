// import React, { Component,  useEffect } from "react";
// import Slider from "react-slick";
// import { useHistory } from "react-router-dom";
// //M-UI
// import Grid from '@material-ui/core/Grid';
// import IconButton from '@material-ui/core/IconButton';

// import { makeStyles } from '@material-ui/core/styles';
// //M-UI icons
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// //images 
// import hero1 from '../assets/hero1.webp'
// import hero2 from '../assets/hero2.webp'
// import hero3 from '../assets/hero3.webp'
// //redux set up
// import { connect } from 'react-redux';
// // import { getCategory } from '../../catalog/actions'

// const useStyles = makeStyles((theme) => ({
//     root:{
//         backgroundColor:'#f00',
//         width:'100%',
//         // height:200,
//         display:'flex',
//         justifyContent:'center',
//         alignItems:'center'  
//     },
//   image:{
//       width:'100%',
//       borderRadius: 10,
//       cursor:'pointer',
//     }
//   }));

//   const data = [
//     {
//       imageUrl:hero1
//     },
//     {
//       imageUrl:hero2
//     },
//     {
//       imageUrl:hero3
//     }
//   ]
// function SlideCard (props) {
//   const classes = useStyles();
//   let history = useHistory();

//   const handleNavigateToCatalog = (category)=>{
//     history.push(`/catalog/${category}`)
//   };

//   return (
    
//     <div>
//       <img src={props.imageUrl}  className={classes.image}/>
//     </div>
      
//   )
// }
// function LoadingSlide () {
//   const classes = useStyles();
 
//   return (
//     <Grid container className={classes.slide}>
//             <Grid item sm={6} >
//             <div className={classes.left}>
//                 <h3 className={classes.title}>
//                   Vente des produits alimentaire en Ligne
//                 </h3>
//                 <p className={classes.subTitle}>
//                    Livraison à domicile et au bureau sur la GRANT TUNIS
//                 </p>
//                 {/* <div className={classes.buttonContainer}>
//                   <Button  onClick={handleNavigateToCatalog} className={classes.button}>
//                     Commencez
//                   </Button>
//                 </div> */}
//               </div>
//             </Grid>
//             <Grid item sm={6} className={classes.right}>
//               <img src={hero1} alt="waier" className={classes.image}/>
//             </Grid>
//           </Grid>
//   )
// }

// function Hero(props) {
//   const classes = useStyles();
//   const next = () => {
//     // this.slider.slickNext()
//   }
//   const revious = () => {
//     // this.slider.slickPrev()
//   }
//   var settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };

// //   useEffect(() => {
// //     props.getCategory()
// //   }, []);
//   return (
//     <Grid className={classes.root}>
//       {/* {props.products.loadingCategory?      */}
//       {1=== 2?     
//       <LoadingSlide />
//     :
//     <Slider  {...settings}>
//        {[1,2,3].map(category=><SlideCard 
//           imageUrl={category.imageUrl}
//           />)}
//      </Slider>}
//      <div style={{ display:'flex', justifyContent:'center', marginTop: 10}}>
//             <span  style={{ backgroundColor:'#085A89', borderRadius:25, width:100}}>
//                 <IconButton style={{color:'#fff'}}>
//                 <ChevronLeftIcon style={{color: '#fff' }}/>
                
//                 </IconButton>
//                 <IconButton style={{color:'#fff'}}>
//                 <ChevronRightIcon style={{ color:'#fff' }}/>
//                 </IconButton>
//             </span>
//         </div>
//     </Grid>
//   );
// }
// function SampleNextArrow(props) {
//   const classes = useStyles();

//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", display:'none'}}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <span
//       className={className}
//       style={{ ...style, display: "block", display:'none'}}
//       onClick={onClick}
//     />
//   );
// }
// class PreviousNextMethods extends Component {
//     constructor(props) {
//       super(props);
//       this.next = this.next.bind(this);
//       this.previous = this.previous.bind(this);
//     }
//     next() {
//       this.slider.slickNext();
//     }
//     previous() {
//       this.slider.slickPrev();
//     }
//     render() {
//       const settings = {
//         infinite: true,
//          autoplay: true,
//         //  fade: true,
//         // vertical: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />
//       };
//       return (
//         <div >
//           <Slider ref={c => (this.slider = c)} {...settings}>
           
//             {data.map(category=> <SlideCard key={1}
//           imageUrl={category.imageUrl}
//           />)}
          
//           </Slider>
//           <div style={{ display:'flex', justifyContent:'center', marginTop: 10}}>
//             <span  style={{ marginTop:-35, zIndex:1, backgroundColor: '#1DA1F2', borderRadius:25, display:'flex', width:100, border:'3px solid #fff'}}>
//                 <IconButton style={{color:'#fff'}} onClick={this.previous}>
//                 <ChevronLeftIcon style={{color: '#fff' }}/>
                
//                 </IconButton>
//                 <IconButton style={{color:'#fff'}} onClick={this.next}>
//                 <ChevronRightIcon style={{ color:'#fff' }} />
//                 </IconButton>
//             </span>
//         </div>
//         </div>
//       );
//     }
//   }
// const mapStateToProps = (state) => ({
//   products: state.products
//  });
 
//  const mapActionsToProps =   {
// //   getCategory,

//  };
 
//  export default connect(
//    mapStateToProps,
//    mapActionsToProps
//  )(PreviousNextMethods);