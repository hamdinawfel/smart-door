import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router'
// import ReCAPTCHA from "react-google-recaptcha";

//M-UI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// components
import LoginWithGoogle from './components/LoginWithGoogle';
import LoginWithFacebook from './components/LoginWithFacebook';
// import Background from './components/Background';
//logo/
import mamogamers from '../../utils/navbar/assets/mamogamers.png'
//Redux
import { connect } from 'react-redux';
import { loginUser, clearErrors} from './action';

const useStyles = makeStyles((theme) => ({
    root:{
     padding:0,
      zIndex:1,
      width:'100%',
      top:0,
    },
    paper: {
        top: 20,
        position:'absolute',
        zIndex:1,
        padding: '0 100px',
        backgroundColor:'rgba(255,255,255,0.85)',
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
      form: {
        width: 300,
        [theme.breakpoints.down('sm')]: {
          width: '260px',
           },
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
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

function Login(props) {
  const classes = useStyles();
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(props.user.errors.credentials);
  const [verified, setVerified] = useState(false);

const handleLoginUser = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    props.loginUser(userData)
  }

  useEffect(() => {
    setError(props.user.errors.credentials)
  }, [props.user.errors]);

  const  onChangeRecaptcha = (value) =>{
    setVerified(true)
  }
  return (
    <div className={classes.root}>
      {/* <Background /> */}
          {!props.user.authenticated === true?null:<Redirect to='/'/>}
        <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.paper}>
        <Link href="/" >
          <img src={mamogamers} alt="Mamogamers" className={classes.logo} />
        </Link>
        <Typography className={classes.title} component="h1" variant="h5">
           Connexion
        </Typography>
        <LoginWithGoogle />
        <LoginWithFacebook />
        <Grid container style={{margin:'30px 0 10px 0', width: 300}}>
          <Grid item xs={2} sm={5} style={{marginTop:8}}>
              <Divider />
          </Grid>
          <Grid item xs={8}sm={2}>
              <Typography style={{verticalAlign:'top', textAlign:'center'}}>Ou</Typography>
          </Grid>
          <Grid item xs={2} sm={5} style={{marginTop:8}}>
            <Divider />
          </Grid>
        </Grid>
        {
              error?
              <div className={classes.error}>
                <p className={classes.errorText}>Vérifier votre email ou mot de passe</p>
              </div>
              :
              null
        }
        <form className={classes.form} onSubmit={handleLoginUser}>
          <TextField
            variant="outlined"
            type='email'
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            // autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
           {/* <div style={{ display:`${email !=='' || password !== ''?'flex':'none'}`, justifyContent:'center', margin: '20px 0'}}>
                <ReCAPTCHA
                        sitekey="6Lc5ObIaAAAAAESStD0ABCoKWdZJGdqwrWqv-E-8"
                        onChange={onChangeRecaptcha}
                    />
            </div> */}
          <Button
              type="submit"
              fullWidth
              disabled={props.user.loading  || (!verified && (email !== '' || password !== ''))}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {props.user.loading? <CircularProgress />:<span>LOGIN</span>}
            </Button>          
          <Grid item style={{ display:'flex', justifyContent:'space-between',  marginTop:10}}>
              <Link href="/forgot-password" variant="body2">
                {"Mot de passe oublié!"}
              </Link>
              <Link href="/signup" variant="body2">
                {"Inscrivez-vous !"}
              </Link>
         </Grid>
        </form>
      </Grid>
    </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
    user: state.user,
  });
  const mapActionsToProps = {
    loginUser,
    clearErrors
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Login);