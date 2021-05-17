import React, {useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
//M-UI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
//logo/
import mamogamers from '../../utils/navbar/assets/logo.png'
//Redux
import { connect } from 'react-redux';
import { resetPassword } from './action';

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


function ResetPwd(props) {
  const classes = useStyles();
  const [ password, setPassword ] = useState('')
  const [ password2, setPassword2 ] = useState('')

  const [ errors, setErrors ] = useState(props.user.errors);
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

  useEffect(() => {
    setErrors(props.user.errors)
  }, [props.user.errors])

  return (
    <div className={classes.root}>
          {!props.user.resetPwdSuccess === true?null:<Redirect to='/login'/>}
        <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <Grid className={classes.paper}>
        <Link href="/" >
          <img src={mamogamers} alt="Mamogamers" className={classes.logo} />
        </Link>
        <Typography className={classes.title} component="h6" variant="h6">
           Nouveau mot de passe
        </Typography>
        {
              errors.error?
              <div className={classes.error}>
                <p className={classes.errorText}>{errors.error}</p>
              </div>
              :
              null
            }
        <form className={classes.form} onSubmit={handleSendPassword}>
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
      
    </Container>
    </div>
  );
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