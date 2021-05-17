import React, {useState} from 'react'
import clsx from "clsx";

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
//
import LoginWithFacebook from './components/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle';
//logo/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/fontawesome-free-brands';
import {faGoogle} from '@fortawesome/fontawesome-free-brands';

import mamogamers from '../../utils/navbar/assets/mamogamers.png'

const useStyles = makeStyles((theme) => ({
    root:{
        minHeight:'100vh',
/* 	background-position: center;
	background-size: cover; */
	position: 'absolute',
        width : '100%',
         background:'#1b1b1b',
         boxSizing: 'border-box',

/* 	background-position: center;
	background-size: cover; */
    },
    container:{
        display:'flex',
        justifyContent:'center',
        marginTop:30
    },
    logo:{
          width: 150, 
         marginTop:30
    },
    main:{
        width: '320px',
        height: '480px',
        position: 'relative',
        margin: '4% auto',
        background:'#1b1b1b',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        overflow: 'hidden',
    },
    formBox:{
        width: '316px',
        height: '476px',
        position: 'relative',
        background:'#252525', 
        padding: '5px',
        overflow: 'hidden',
        zIndex: 5,
    },
    after:{
        width: '50%',
        height:'100%',
        content: "",
        position: 'absolute',
        top: 0,
        left: '50%',
        background:'#2d2e30', 
        zIndex:-1,
        transition: '0.5s',
    },
    afterLogin:{
        width: '50%',
        height:'100%',
        content: "",
        position: 'absolute',
        top: 0,
        left: 0,
        background:'#2d2e30', 
        zIndex:-1,
        transition: '0.5s',
    },
    buttonBox:{
        width: '220px',
        margin: '35px auto 30px auto',
        position: 'relative',
        borderRadius:'30px', 
        display: 'flex',
        justifyContent: 'space-around',
        animation: `$animBTN  5s linear infinite`,
    },
    "@keyframes animBTN": {
        '0%':{
            boxShadow:  '0 0 10px 9px rgba(3,169,244,0.3)',
        },
        '33%':{
            boxShadow:  '0 0 10px 9px rgba(244,65,165,0.3)',
            
        },
        '66.9%':{
            boxShadow:  '0 0 10px 9px rgba(255,235,59,0.3)',
            
        },
        '100%':{
            boxShadow:  '0 0 10px 9px rgba(3,169,244,0.3)',
        }
      },
    btn:{
        position: 'absolute',
        top: 0,
        left:0,
        width: '110px',
        height: '100%',
        background:'linear-gradient( to left , #57AAB4,#57AAB4)',
        borderRadius: '30px',
        transition: '0.5s', 
    },
    reg:{
        position: 'absolute',
        top: 0,
        left:110,
        width: '110px',
        height: '100%',
        background:'linear-gradient( to left , #57AAB4,#57AAB4)',
        borderRadius: '30px',
        transition: '0.5s', 
    },
    button:{
        padding:'10px 30px',
        cursor: 'pointer',
        background:'transparent',
        border: 0,
        fontSize: '14px',
        fontWeight: 600,
        color: '#252525',
        outline: 'none',
        position: 'relative',
        transition: '0.5s',
    },
    toggleButton:{
        padding:'10px 30px',
        cursor: 'pointer',
        background:'transparent',
        color: 'rgb(234, 234, 235)',
        border: 0,
        fontSize: '14px',
        fontWeight: 600,
        outline: 'none',
        position: 'relative',
        transition: '0.5s',
    },
     socialIcons:{
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
     },
     iconContainer:{
        display: 'flex',
        background: 'transparent',
        width: '50px',
        height: '50px',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        borderRadius: '50%',
        margin: '0px 10px',
        boxShadow: '6px 6px 10px -1px rgba(234, 234, 235, 0.1), -6px -6px 10px -1px	rgba(37,37,37,0.7)',
        border: '1px solid rgba(234, 234, 235,0.09)',
        transition: 'transform 0.5s',
        '&:hover': {
            boxShadow: 'inset 4px 4px 6px -1px rgba(234, 234, 235, 0.2),inset 4px 4px 6px -1px	rgba(37,37,37,0.7),0 0 5px #57AAB4,0 0 25px #57AAB4,0 0 50px #57AAB4,0 0 100px #03e9f4',
            transform: 'translateY(2px)',
            transform: 'scale(0.95)'
          }
     },
     contIcon:{
        color: '#57AAB4',
        fontSize: '28px',
        transition: 'transform 0.5s',
        '&:hover': {
            transform: 'scale(0.95)'
          }
     },
     registerForm:{
        left : "500px",
        width: '320px', 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        top:'180px',
        left : "500px",
        position: 'absolute',
        padding:'0 30px',
        transition: '0.5s',
        boxSizing: 'border-box',
     },
     loginForm:{
        width: '320px', 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        top:'180px',
        left : "-500px",
        position: 'absolute',
        padding:'0 30px',
        transition: '0.5s',
        boxSizing: 'border-box',
     },
     inputGroup:{
        width: '320px', 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        top:'180px',
        left:0,
        position: 'absolute',
        padding:'0 30px',
        transition: '0.5s',
        boxSizing: 'border-box',
     },
     inputField:{
        width: '100%',
        padding: '10px 5px',
        margin: '10px 0',
        borderTop: 0,
        borderLeft: '2px solid #57AAB4',
        borderRight:0,
        borderBottom: '2px solid #57AAB4',
        outline: 'none',
        background: 'transparent', 
        color: 'rgb(234, 234, 235)',
        fontSize: '15px',
        transition:' 0.5s',
        '&:focus': {
            borderLeft:'2px solid transparent',
            boxShadow:  '0 0 10px 9px rgba(3,169,244,0.3)',
            borderBottom: '2px solid transparent',
            //  animation: 'animINP 5s linear infinite,animBTN 5s linear infinite',
          }
     },
     submitBtn:{
        width: '85%',
        padding: '10px 30px',
        cursor: 'pointer',
        display: 'block',
        margin: '30px auto 0 auto',
        background: 'linear-gradient(to right, #03a9f4,#57AAB4,#03a9f4)',
        border:0,
        outline: 'none',
        borderRadius: '30px', 
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',   
        color:'#fff',
        fontWeight: 'bold',
        fontSize:'15px', 
        transition: '0.5s',
        width: '85%',
        padding: '10px 30px',
        cursor: 'pointer',
        display: 'block',
        margin: '30px auto 0 auto',
        background: 'linear-gradient(to right, #03a9f4,#57AAB4,#03a9f4)',
        border:0,
        outline: 'none',
        borderRadius: '30px', 
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',   
        color:'#fff',
        fontWeight: 'bold',
        fontSize:'15px', 
        transition: '0.5s',
        '&:hover': {
            background:'#57AAB4',
            color: '#fff',
            borderRadius: '30px',
            boxShadow: '0 0 5px #57AAB4,0 0 25px #57AAB4, 0 0 50px #57AAB4,0 0 100px #03e9f4',
          }
     }
   }));
export default function Auth() {
  const classes = useStyles();
  const [login, setLogin] = useState(true);
   const registerClick = () =>{
      setLogin(false)
   }
   const loginClick = () =>{
      setLogin(true)
   }
    return (
	<div className={classes.root}>
         {/* <div className={classes.container}>
          <Link href="/" >
             <img src={mamogamers} alt="Mamogamers" className={classes.logo} />
            </Link>
        </div> */}
         <div className={classes.container}>
          <Link href="/" >
            <div item xs={4} sm={4} className="fake-logo">
                  <h3>Company<span>logo</span></h3>
               </div>
            </Link>
        </div>
    <div className={classes.main}>
   
        <div className={classes.formBox}>
            <div className={clsx(classes.after, !login && classes.afterLogin)}></div>
            
            <div className={classes.buttonBox}>
                <div  className={clsx(classes.btn, !login && classes.reg)}/>
                    <button 
                        id="log" 
                        type="button" 
                        onClick={loginClick}
                        className={clsx(classes.button, !login && classes.toggleButton)}>
                            Log in
                    </button>
                <button id="reg" type="button"  className={clsx(classes.button, login && classes.toggleButton)}
                onClick={registerClick}
                >Register</button>
            </div>
            <div className={classes.socialIcons}> 
                <div className={classes.iconContainer}>
                {/* <LoginWithGoogle /> */}
                <FontAwesomeIcon icon={faGoogle} style={{color: '#57AAB4'}}/>
                </div>
                <div className={classes.iconContainer}>
                   {/* <LoginWithFacebook /> */}
                   <FontAwesomeIcon icon={faFacebookF} style={{color: '#57AAB4'}}/>
                </div>
            </div>
            
                <form className={clsx(classes.loginForm, login && classes.inputGroup)} id="login"  >
                    <input 
                        type='email'
                        className={classes.inputField}
                        placeholder="Email" 
                        required/>
                    <input 
                        id="pwd"
                        className={classes.inputField}
                        placeholder="Password" required/>
                    <input type="submit"  className={classes.submitBtn} value="Log in"/>
                </form>
                <form className={clsx(classes.registerForm, !login && classes.inputGroup)}>
                    <input type="text"  className={classes.inputField} placeholder="Name" required/>
                    <input type="text"  className={classes.inputField} placeholder="Email" required/>
                    <input type="text" className={classes.inputField} placeholder="Password" required/>
                    <input type="submit" className={classes.submitBtn} value="Register"/>
                </form> 
        </div>
	    <span className="sp sp-t"></span>
        <span className="sp sp-r"></span>
        <span className="sp sp-b"></span>
        <span className="sp sp-l"></span> 
    </div>
</div>


    )
}
