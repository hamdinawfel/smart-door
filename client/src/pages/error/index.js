// import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from "react-router-dom";

// //images 
// import internet from './assets/internet.png'
// //redux set up
// import { connect } from 'react-redux';
// import { avoidError } from '../catalog/actions'
// const useStyles = makeStyles((theme) => ({
//     root: {
//       margin:'0px 0 100px 0',
//        [theme.breakpoints.down('sm')]: {
//         margin:'60px 0 100px 0',
//       },
//     textAlign:'center',  
//     },
//     imageContainer:{
//         display:'flex',
//         justifyContent:'center',
//         padding: '100px 200px 20px 200px'
//     },
//     image:{
//         width:300,
//         cursor:'pointer',
//     }
//   }));
// function Error (props) {
//   const classes = useStyles();
//   let history = useHistory();

//   const handleNavigateToHome = ()=>{
//     history.push('/');
//     props.avoidError();
//   };

//   return (
//     <div className={classes.root}>
//         <div className={classes.imageContainer}>
//          <img src={internet} className={classes.image} alt="internet" onClick={handleNavigateToHome}/>
//         </div>
//         <h1 style={{fontSize:'25px', fontWeight:900, color:'#343A40', display:'block', margin:'10px auto', textAlign:'center'}}> 
//              Vérifier votre connexion Internet
//         </h1>
//     </div>
//   )
// }
// const mapStateToProps = (state) => ({
//     products: state.products
//    });
   
//    const mapActionsToProps =   {
//      avoidError,
//    };
   
//    export default connect(
//      mapStateToProps,
//      mapActionsToProps
//    )(Error);

           