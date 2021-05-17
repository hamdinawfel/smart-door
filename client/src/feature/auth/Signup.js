import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router'
// import ReCAPTCHA from "react-google-recaptcha";
//M-UI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
// components
import LoginWithGoogle from './components/LoginWithGoogle';
import LoginWithFacebook from './components/LoginWithFacebook';
// import Background from './components/Background';

//logo/
import mamogamers from '../../utils/navbar/assets/mamogamers.png'
import logo from '../../utils/navbar/assets/logo.png'
//Redux
import { connect } from 'react-redux';
import { signupUser, clearErrors} from './action';

const useStyles = makeStyles((theme) => ({
  root:{
    padding:0,
    zIndex:1,
    width:'100%',
    top:0
  },
  paper: {
    top: 10,
    position:'absolute',
    zIndex:1,
    padding: '0 100px',
    backgroundColor:'rgba(255,255,255,0.85)',
    display: 'flex',
    // marginRight: 100,
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
    fontSize:25,
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
    marginBottom: theme.spacing(1.5),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color:'#fff'
  },
formControl: {
  marginTop: 15,
  width: '100%',
},
logo:{
  width: 150, 
  marginTop : 10,
  [theme.breakpoints.down('sm')]: {
    marginTop:-120
  },
}
}));
//activation message animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

function Signup(props) {
  const classes = useStyles();
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ errors, setErrors ] = useState(props.user.errors);
  const [verified, setVerified] = useState(false);

//message d'activation
const [open, setOpen] = React.useState(false);

const handleSignupUser = (e) => {
    e.preventDefault();
    const userData = {
      email ,
      password,
      password2,
      name
    };
    props.signupUser(userData);
    setOpen(true);
  }
  useEffect(() => {
    setErrors(props.user.errors)
  }, [props.user.errors]) 



  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setName('');
    setPassword('');
    setPassword2('');
    setErrors({});
  };
  const  onChangeRecaptcha = (value) =>{
    setVerified(true)
  }
  return (
    <div className={classes.root}>
      {!props.user.authenticated === true?null:<Redirect to='/'/>}
       {/* <Background /> */}
        <Container  component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Link href="/" >
          <img src={mamogamers} alt="Mamogamers" className={classes.logo} />
        </Link>
            <Typography className={classes.title} component="h1" variant="h5">
              Nouveau
            </Typography>
            <LoginWithGoogle />
             <LoginWithFacebook />
            <Grid container style={{margin:'25px 0 0 0', width: 300}}>
              <Grid item xs={2} sm={5}>
                  <Divider />
              </Grid>
              <Grid item xs={8}sm={2}>
                  <Typography style={{verticalAlign:'top', textAlign:'center'}}>Ou</Typography>
              </Grid>
              <Grid item xs={2} sm={5}>
                <Divider />
              </Grid>
            </Grid>
            <form className={classes.form} onSubmit={handleSignupUser}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nom et Prénom"
                name="name"
                // autoFocus
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={errors.email?true:false}
                helperText={errors.email}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe (6 caractères minimum)"
                type="password"
                id="password"
                error={errors.password?true:false}
                helperText={errors.password}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirmez votre mot de passe"
                type="password"
                id="password"
                error={errors.password2?true:false}
                helperText={errors.password2}
                value={password2}
                onChange={(e)=>setPassword2(e.target.value)}
            />
             {/* <div style={{ display:`${email !=='' || password !== '' || name !== '' ?'flex':'none'}`, justifyContent:'center', margin: '20px 0'}}>
                <ReCAPTCHA
                  sitekey="6Lc5ObIaAAAAAESStD0ABCoKWdZJGdqwrWqv-E-8"
                  onChange={onChangeRecaptcha}
                    />
            </div> */}
            <Button
                type="submit"
                fullWidth
                disabled={props.user.loading  || (!verified && (email !== '' || password !== '' || name !== ''))}
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              {props.user.loading? <CircularProgress />:<span>SIGNUP</span>}
            </Button>
            <Grid item style={{ marginTop : 10}}>
                <Link href="/login" variant="body2">
                    {"Vous avez déjà un compte!"}
                </Link>
            </Grid>
            </form>
        </div>
        {/* Activation Message  */}
        <Dialog
            open={props.user.activatedStep && open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
          <img src={logo} alt="Mamogamers" style={{ margin:'20px auto', width : 150}} />
            <DialogTitle id="alert-dialog-slide-title">{"S'il vous plaît vérifiez votre e-mail et activez votre compte "}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Le lien va s'expirera dans 10 minutes
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary" style={{ margin:'0 auto', marginBottom:20}}>
               Je comprends 
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
    user: state.user,
  });
  const mapActionsToProps = {
    signupUser,
    clearErrors
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Signup);