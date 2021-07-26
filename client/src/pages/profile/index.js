import React, { useState, useEffect } from 'react';
//
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
//Components
import Main from './components/Main'
//utils
import Navbar from '../../utils/navbar/index';
import Footer from '../../utils/footer/index';
//redux set up
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header:{
    margin:'30px 0'
  },
  avatarContainer:{
    background:theme.palette.primary.main,
    margin:'0 auto',
    width:60,
    height:60,
    display:'flex',
    marginBottom:30,
    alignItems:'center',
    justifyContent:'center',
    transform: 'rotate(45deg)',
    [theme.breakpoints.down('sm')]: {
      marginTop:50
     },
  },
  avatar:{
    color:'#fff',
    fontSize:'2rem',
    fontWeight:900,
    textTransform:'uppercase',
    transform: 'rotate(-45deg)',
  },
  name:{
    // color:'#fff',
    fontSize:'22px',
    fontWeight:600,
    textTransform:'uppercase',
    textAlign:'center'
  },
  email:{
    // color:'#fff',
    fontSize:'16px',
    textTransform:'lowercase',
    textAlign:'center'
  },
  loading:{
    display:'block',
    margin:'0 auto',
    marginTop:150,
    marginBottom:150,
  }
}));

function Profile(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { section } = useParams();
  useEffect(() => {
   switch (section) {
     case 'controle-panel':
       setValue(0);
       break;
     case 'orders':
       setValue(1);
       break;
     case 'settings':
       setValue(2);
       break;
     default:
       setValue(0);
   }
  }, []);
 
  return (
    <div className={classes.root}>
      <Navbar />
       {!props.user.loading?
       <div className={classes.header}>
         <div className={classes.avatarContainer}>
           <h1 className={classes.avatar}>{props.user.user.name[0]}</h1>
          </div>
          <h1 className={classes.name}>{props.user.user.name}</h1>
          <p className={classes.email}>{props.user.user.email}</p>
          <Main />
       </div>
       :
       <CircularProgress className={classes.loading}/>}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
 });
 
 export default connect(
   mapStateToProps,
   null
 )(Profile);