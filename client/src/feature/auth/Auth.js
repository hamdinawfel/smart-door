import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router'

import clsx from "clsx";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import WarningIcon from '@material-ui/icons/Warning';

//
import LoginWithFacebook from './components/LoginWithFacebook';
import LoginWithGoogle from './components/LoginWithGoogle';
//logo
import logo from '../../utils/navbar/assets/logo.jpg'
//Redux
import { connect } from 'react-redux';
import { signupUser, loginUser, sendEmail, resetPassword, clearErrors } from './action';

const useStyles = makeStyles((theme) => ({
    root:{
        minHeight:'100vh',
	    position: 'absolute',
        width : '100%',
        backgroundColor:theme.palette.primary.white,
         boxSizing: 'border-box',
    },
    logo:{
          width: 150, 
         marginTop:30
    },
    main:{
        width: '320px',
        height: '480px',
        position: 'relative',
        margin: '3% auto',
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
        background:'linear-gradient( to left , #47cf73,#47cf73)',
        borderRadius: '30px',
        transition: '0.5s', 
    },
    reg:{
        position: 'absolute',
        top: 0,
        left:110,
        width: '110px',
        height: '100%',
        background:'linear-gradient( to left , #47cf73,#47cf73)',
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
            boxShadow:  '0 0 10px 9px rgba(234, 234, 235, 0.2)',
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
     resetPswForm:{
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
        // borderLeft: '2px solid #47cf73',
        borderRight:0,
        // borderBottom: '2px solid #47cf73',
        outline: 'none',
        background: 'transparent', 
        color: 'rgb(234, 234, 235)',
        fontSize: '15px',
        transition:' 0.5s',
        '&:focus': {
            borderLeft:'2px solid transparent',
            // boxShadow:  '0 0 10px 9px rgba(234, 234, 235, 0.2)',
            borderBottom: '2px solid transparent',
          }
     },
     submitBtn:{
        width: '100%',
        padding: '10px 30px',
        cursor: 'pointer',
        display: 'block',
        background: '#47cf73',
        border:0,
        outline: 'none',
        borderRadius: 0, 
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',   
        color:'#fff',
        fontWeight: 'bold',
        fontSize:'15px', 
        transition: '0.5s',
        margin: '30px auto 0 auto',
        '&:hover': {
            background:'#248C46',
            color: '#fff',
          }
     },
     resetLink:{
         color:'rgba(255,255,255,0.7)',
         background:'rgba(255,255,255,0.1)',
         border:'1px solid rgba(255,255,255,0)',
         marginTop:20,
         borderRadius:0,
         width:'100%',
         padding:'0 5px',
         '&:hover': {
            border:'1px solid rgba(255,255,255,0.1)',
          }
     },
     errorText:{
        color:'rgba(255,255,255,0.8)',
        fontWeight:600
      }
   }));

   function Auth(props) {
        const classes = useStyles();
        // START LOGIN
        const [ email, setEmail ] = useState('')
        const [ password, setPassword ] = useState('');
        const handleLoginUser = (e) => {
            e.preventDefault();
            const userData = {
              email,
              password,
            };
            props.loginUser(userData)
          }
        useEffect(() => {
            console.log(history)
        }, []);
        // REGISTER
        const [ name, setName ] = useState('')
        const handleRegisterUser = (e) => {
            e.preventDefault();
            const userData = {
              name,
              email,
              password,
            };
            props.signupUser(userData);
            setOpen(true);
            setMessage("S'il vous plaît vérifiez votre e-mail et activez votre compte")
          }
        // SEND EMAIL RESET PSW
        const handleSendEmail = (e) => {
            e.preventDefault();
            props.sendEmail({email});
            setOpen(true);
            setMessage("S'il vous plaît vérifiez votre e-mail pour changer votre mot de passe")
          }
        // ERROR SETUP
    //    const [ error, setError ] = useState(props.user.errors);
       const [ error, setError ] = useState({});
        useEffect(() => {
            setError(props.user.errors)
          }, [props.user.errors]);
        // SCCREN TO SHOW MANAGEMENT
        const [screen, setScreen] = useState('login');
        const handleShowScreen = (screen) =>{
            setScreen(screen);
            setEmail('');
            setPassword('');
            setError({})
        }
        //Navigation
        let history = useHistory();
        const handleNavigateToHome = ()=>{
            history.push('/')
            setError({});
            props.clearErrors();
        }
        //dialog
        const [open, setOpen] = useState(false);
        const [message, setMessage] = useState('');

        const handleClose = () => {
            setOpen(false);
            setEmail('');
            setPassword('');
            setError({});
            setMessage('');
            setName('');
        };
    return (
	<div className={classes.root}>
          {!props.user.authenticated === true?null:<Redirect to={props.user.redirectPath}/>}
        <div  className="logo" style={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'10px 0 -10px 0'}}>
            <img src={logo} alt="Dinari" style={{width:70, cursor:'pointer'}} onClick={handleNavigateToHome}/>
            <h3  onClick={handleNavigateToHome}>Dinari</h3>
        </div>
      <div className={classes.main}>
        <div className={classes.formBox}>
            <div style={{display:screen === 'reset'?'none':null, transition:'0.5s'}}>
                <div className={clsx(classes.after, screen!=='login' && classes.afterLogin)}></div>
                    <div className={classes.buttonBox}>
                        <div  className={clsx(classes.btn, screen !=='login' && classes.reg)}/>
                            <button  
                                type="button" 
                                onClick={()=>handleShowScreen('login')}
                                className={clsx(classes.button, screen ==='register' && classes.toggleButton)}>
                                    Log in
                            </button>
                            <button 
                                type="button"  
                                className={clsx(classes.button, screen ==='login' && classes.toggleButton)}
                                onClick={()=>handleShowScreen('register')}>
                                    Register
                            </button>
                    </div>
                    <div className={classes.socialIcons}> 
                        <div className={classes.iconContainer}>
                           <LoginWithGoogle />
                        </div>
                        <div className={classes.iconContainer}>
                            <LoginWithFacebook />
                        </div>
                     </div>
            </div>
            
                <form className={clsx(classes.loginForm, screen ==='login' && classes.inputGroup)} onSubmit={handleLoginUser}>
                   {error.email? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.email}</p>:null}
                   {error.password? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.password}</p>:null}
                    <input 
                        className={classes.inputField}
                        style={{ 
                            boxShadow: !error.email? '0 0 10px 9px rgba(234, 234, 235, 0.2)':'0 0 10px 9px rgba(232, 36, 48, 0.2)',
                            borderLeft: !error.email?'2px solid #47cf73':'2px solid #E82430',
                            borderBottom: !error.email?'2px solid #47cf73':'2px solid #E82430', transition:'0.5s'}}
                        type='email'
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                    <input 
                        className={classes.inputField}
                        style={{ 
                            boxShadow: !error.password? '0 0 10px 9px rgba(234, 234, 235, 0.2)':'0 0 10px 9px rgba(232, 36, 48, 0.2)',
                            borderLeft: !error.password?'2px solid #47cf73':'2px solid #E82430',
                            borderBottom: !error.password?'2px solid #47cf73':'2px solid #E82430', transition:'0.5s'}}
                        type='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                    <Button
                        disabled={props.user.loading}
                        type="submit"
                        className={classes.submitBtn}>
                             {props.user.loading? <CircularProgress size={25} style={{color:'rgba(255,255,255,0.8)', verticalAlign:'middle'}}/>:<span>Log in</span>}
                    </Button>
                    <Button onClick={()=>handleShowScreen('reset')} className={classes.resetLink}>Change your password</Button>
                </form>
                <form className={clsx(classes.registerForm, screen ==='register' && classes.inputGroup)} onSubmit={handleRegisterUser}>
                   {error.email? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.email}</p>:null}
                   {error.password? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.password}</p>:null}
                    <input 
                       type="text"
                       style={{ 
                        boxShadow: '0 0 10px 9px rgba(234, 234, 235, 0.2)',
                        borderLeft: '2px solid #47cf73',
                        borderBottom:'2px solid #47cf73', transition:'0.5s'}}
                       className={classes.inputField}
                       placeholder="Name" 
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
                       required/>
                    <input 
                      type="email"  
                      className={classes.inputField}
                      style={{ 
                        boxShadow: !error.email? '0 0 10px 9px rgba(234, 234, 235, 0.2)':'0 0 10px 9px rgba(232, 36, 48, 0.2)',
                        borderLeft: !error.email?'2px solid #47cf73':'2px solid #E82430',
                        borderBottom: !error.email?'2px solid #47cf73':'2px solid #E82430', transition:'0.5s'}}
                      placeholder="Email" 
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      required/>
                    <input 
                       type="password" 
                       className={classes.inputField}
                       style={{ 
                        boxShadow: !error.password? '0 0 10px 9px rgba(234, 234, 235, 0.2)':'0 0 10px 9px rgba(232, 36, 48, 0.2)',
                        borderLeft: !error.password?'2px solid #47cf73':'2px solid #E82430',
                        borderBottom: !error.password?'2px solid #47cf73':'2px solid #E82430', transition:'0.5s'}}
                        placeholder="Password (6 characters)" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                       required/>
                      <Button
                        disabled={props.user.loading}
                        type="submit"
                        className={classes.submitBtn}>
                             {props.user.loading? <CircularProgress size={25} style={{color:'rgba(255,255,255,0.8)', verticalAlign:'middle'}}/>:<span>Register</span>}
                      </Button>
                </form> 
                <form className={clsx(classes.resetPswForm, screen ==='reset' && classes.inputGroup)} onSubmit={handleSendEmail}>
                {error.email? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.email}</p>:null}
                    <input 
                       style={{ 
                        boxShadow: !error.email? '0 0 10px 9px rgba(234, 234, 235, 0.2)':'0 0 10px 9px rgba(232, 36, 48, 0.2)',
                        borderLeft: !error.email?'2px solid #47cf73':'2px solid #E82430',
                        borderBottom: !error.email?'2px solid #47cf73':'2px solid #E82430', transition:'0.5s'}}
                       type="email" 
                       className={classes.inputField}
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                       placeholder="Email"
                       required/>
                    <Button
                        disabled={props.user.loading}
                        type="submit"
                        className={classes.submitBtn}>
                             {props.user.loading? <CircularProgress size={25} style={{color:'rgba(255,255,255,0.8)', verticalAlign:'middle'}}/>:<span>Submit</span>}
                      </Button>
                </form> 
                <Dialog
                    open={props.user.showActivateMsg && open || props.user.showResetPwdMsg && open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Le lien va s'expirera dans 10 minutes
                        </DialogContentText>
                        </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} variant="contained" style={{ margin:'0 auto', marginBottom:20, borderRadius:0}}>
                    Je comprends 
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
     </div>
    </div>
 )
}
const mapStateToProps = (state) => ({
    user: state.user,
  });
  const mapActionsToProps = {
    signupUser,
    loginUser,
    sendEmail,
    resetPassword,
    clearErrors
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Auth);