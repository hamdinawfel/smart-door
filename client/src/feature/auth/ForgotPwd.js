import React, {useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
//M-UI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
//Dialog
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
//logo/
import mamogamers from '../../utils/navbar/assets/logo.png'
import logo from '../../utils/navbar/assets/logo.png'
//Redux
import { connect } from 'react-redux';
import { sendEmail } from './action';

const useStyles = makeStyles((theme) => ({
    root:{
     padding:0,
      zIndex:1,
      width:'100%',
      top:0,
    },
    paper: {
        top: 250,
        // position:'absolute',
        zIndex:1,
        padding: '100px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      form: {
       width:'100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1.5),
      },
      title: {
       color:theme.palette.primary.title,
       fontWeight:900,
       fontSize:22,
       margin:'15px 0',
       [theme.breakpoints.down('sm')]: {
          fontSize:20,
         
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
  });

function ForgotPwd(props) {
  const classes = useStyles();
  const [ email, setEmail ] = useState('')
  const [open, setOpen] = React.useState(false);

  const [ errors, setErrors ] = useState(props.user.errors);
  
  const handleSendEmail = (e) => {
    e.preventDefault();
    props.sendEmail({email});
    setOpen(true);

  }

  useEffect(() => {
    setErrors(props.user.errors)
  }, [props.user.errors])

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setErrors({});
  };
  return (
    <div className={classes.root}>
        <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.paper}>
        <Link href="/" >
          <img src={mamogamers} alt="Mamogamers" className={classes.logo} />
        </Link>
        <Typography className={classes.title} component="h6" variant="h6">
           Changez votre mot de passe
        </Typography>
        {
              errors.email?
              <div className={classes.error}>
                <p className={classes.errorText}>Email non trouvé!</p>
              </div>
              :
              null
            }
        <form className={classes.form} onSubmit={handleSendEmail}>
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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Button
              type="submit"
              fullWidth
              disabled={props.user.loading}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {props.user.loading? <CircularProgress />:<span>Envoyer</span>}
            </Button> 
        </form>
      </Grid>
      {/* forgot password Message  */}
      <Dialog
            open={props.user.showForgotPwdMsg && open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
          <img src={logo} alt="Mamogamers" style={{ margin:'20px auto', width : 150}} />
            <DialogTitle id="alert-dialog-slide-title">{"S'il vous plaît vérifiez votre e-mail pour changer votre mot de passe"}</DialogTitle>
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
    sendEmail
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(ForgotPwd);