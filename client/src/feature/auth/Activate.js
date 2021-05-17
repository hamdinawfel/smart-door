import React, {useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";


//M-UI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Background from './components/Background';
//logo/
import mamogamers from '../../utils/navbar/assets/mamogamers.png'
//Redux
import { connect } from 'react-redux';
import { activateAccount } from './action';

const useStyles = makeStyles((theme) => ({
    root:{
     padding:0,
      zIndex:1,
      width:'100%',
      top:0,
    },
    paper: {
        top: 250,
        position:'absolute',
        zIndex:1,
        padding: '20px 100px 40px 100px',
        backgroundColor:'rgba(255,255,255,0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          padding: '0px',
          position:'relative',
          zIndex:1,
          top: -100,
          backgroundColor:'transparent'
           },
      },
      title: {
       color:theme.palette.primary.title,
       fontWeight:900,
       fontSize:30,
       margin:'15px 0',
       [theme.breakpoints.down('sm')]: {
          color:'#fff',
          marginBottom:50
         },
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        color:'#fff'
      },
      error:{
          width:'100%',
          padding:'5px 10px',
          borderRadius:5,
          backgroundColor:'rgba(247, 82, 27,0.1)',
          color:'#ea5a20'
      },
      errorText:{
          fontWeight:600
      },
      logo:{
        width: 150, 
        marginTop : 30,
        [theme.breakpoints.down('sm')]: {
  
          marginTop:-150
        },
      }
}));

function Activation(props) {
  const classes = useStyles();
  const [ error, setError ] = useState(props.user.errors.error);
  
  let { token } = useParams();
  
  const sendActivateToken = () =>{
    props.activateAccount(token);
  }

  useEffect(() => {
    setError(props.user.errors.error)
  }, [props.user.errors])

  return (
    <div className={classes.root}>
      {/* <Background /> */}
          {!props.user.authenticated?null:<Redirect to='/'/>}
        <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.paper}>
        <Link href="/" >
          <img src={mamogamers} alt="Mamogamers" className={classes.logo} />
        </Link>
        <Typography className={classes.title} component="h1" variant="h5">
           Activation
        </Typography>
        <Button
              fullWidth
              disabled={props.user.loading}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={sendActivateToken}
            >
              {props.user.loading? <CircularProgress />:<span>ACTIVEZ VOTRE ACCOUNTE</span>}
            </Button> 
            {
              error?
              <div className={classes.error}>
                <p className={classes.errorText}>Lien incorrect ou expiré</p>
              </div>
              :
              null
            }
      </Grid>
    </Container>
    </div>
  );
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
  )(Activation);