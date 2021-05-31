import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { useParams, Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from '@material-ui/core/CircularProgress';

//logo
import logo from '../../utils/navbar/assets/logo.jpg'
//Redux
import { connect } from 'react-redux';
import { resetPassword  } from './action';

const useStyles = makeStyles((theme) => ({
    root:{
      minHeight:'100vh',
	    position: 'absolute',
      width : '100%',
      backgroundColor:theme.palette.primary.white,
      boxSizing: 'border-box',
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
      borderRight:0,
      outline: 'none',
      background: 'transparent', 
      color: 'rgb(234, 234, 235)',
      fontSize: '15px',
      transition:' 0.5s',
      '&:focus': {
          borderLeft:'2px solid transparent',
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
     errorText:{
       color:'rgba(255,255,255,0.8)',
       fontWeight:600
     }
   }));

   function ResetPwd(props) {
    const classes = useStyles();
    //reset pwd
    const [ password, setPassword ] = useState('')
    const [ password2, setPassword2 ] = useState('');
    let { resetLink } = useParams();
  
  const handleSendPassword = (e) => {
    e.preventDefault();
     const  newPasswordData={
        password,
        password2,
        resetLink
      }
    props.resetPassword(newPasswordData);
  }
      //ERROR
      const [ error, setError ] = useState({});
      useEffect(() => {
          setError(props.user.errors)
        }, [props.user.errors]);

     //NAVGIATION
     let history = useHistory();
     const handleNavigateToHome = ()=>{
         history.push('/')
     }
    return (
	<div className={classes.root}>
          {!props.user.authenticated === true?null:<Redirect to={props.user.redirectPath}/>}
        <div  className="logo" style={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'10px 0 -10px 0'}}>
            <img src={logo} alt="Dinari" style={{width:70, cursor:'pointer'}} onClick={handleNavigateToHome}/>
            <h3  onClick={handleNavigateToHome}>Dinari</h3>
        </div>
      <div className={classes.main}>
        <div className={classes.formBox}>
        <form className={classes.inputGroup} onSubmit={handleSendPassword} >
                   {error.password? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.password}</p>:null}
                   {error.password2? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.password2}</p>:null}
                   {error.error? <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.error}</p>:null}
                    <input 
                        className={classes.inputField}
                        style={{ 
                            boxShadow: !error.password? '0 0 10px 9px rgba(234, 234, 235, 0.2)':'0 0 10px 9px rgba(232, 36, 48, 0.2)',
                            borderLeft: !error.password?'2px solid #47cf73':'2px solid #E82430',
                            borderBottom: !error.password?'2px solid #47cf73':'2px solid #E82430', transition:'0.5s'}}
                        type='password'
                        placeholder="Password (6 characters)" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                    <input 
                        className={classes.inputField}
                        style={{ 
                            boxShadow: !error.password2? '0 0 10px 9px rgba(234, 234, 235, 0.2)':'0 0 10px 9px rgba(232, 36, 48, 0.2)',
                            borderLeft: !error.password2?'2px solid #47cf73':'2px solid #E82430',
                            borderBottom: !error.password2?'2px solid #47cf73':'2px solid #E82430', transition:'0.5s'}}
                        type='password'
                        placeholder="Confirm password"
                        value={password2}
                        onChange={(e)=>setPassword2(e.target.value)}
                        required/>
                    <Button
                        disabled={props.user.loading}
                        type="submit"
                        className={classes.submitBtn}>
                             {props.user.loading? <CircularProgress size={25} style={{color:'rgba(255,255,255,0.8)', verticalAlign:'middle'}}/>:<span>Submit</span>}
                    </Button>
                </form>
        </div>
     </div>
    </div>
 )
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  resetPassword
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(ResetPwd);
