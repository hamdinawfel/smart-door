import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { useParams, Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import WarningIcon from '@material-ui/icons/Warning';
//logo
import logo from '../../utils/navbar/assets/logo.jpg'
//Redux
import { connect } from 'react-redux';
import { activateAccount  } from './action';

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
      container:{
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

   function Activate(props) {
        const classes = useStyles();
        // activation
          let { token } = useParams();
          const sendActivateToken = () =>{
            props.activateAccount(token);
          }
          //error
        const [ error, setError ] = useState({});
        useEffect(() => {
            setError(props.user.errors)
          }, [props.user.errors]);
          //NAVGIATION
        let history = useHistory();
        const handleNavigateToHome = ()=>{
            history.push('/')
        }
        const handleNavigateToAuth = ()=>{
          history.push('/connextion')
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
          <div className={classes.container} >
            {error.error?
            <React.Fragment>
              <p className={classes.errorText}> <WarningIcon style={{verticalAlign:'text-top'}}/> {error.error}</p>
              <Button onClick={handleNavigateToAuth} className={classes.submitBtn}>Register</Button>
            </React.Fragment>:
             <Button 
               disabled={props.user.loading}
               onClick={sendActivateToken}
               className={classes.submitBtn}>
               {props.user.loading? <CircularProgress size={25} style={{color:'rgba(255,255,255,0.8)', verticalAlign:'middle'}}/>:<span>Activation</span>}
              </Button>}
          </div>
        </div>
     </div>
    </div>
 )
}
const mapStateToProps = (state) => ({
    user: state.user,
  });
  const mapActionsToProps = {
    activateAccount
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Activate);