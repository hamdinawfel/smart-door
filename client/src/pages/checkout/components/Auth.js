import React, { useState, useEffect } from 'react';
//mui
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//util
import InputText from '../../../utils/InputText'
// auth feature
import LoginWithGoogle from '../../../feature/auth/components/LoginWithGoogle';
import LoginWithFacebook from '../../../feature/auth/components/LoginWithFacebook';
//redux set up
import { connect } from 'react-redux';
import { signupUser, loginUser } from '../../../feature/auth/action'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:-70
  },
  paper: {
    position:'relative',
    top:0,
    margin: theme.spacing(4, 12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(8, 4),
    //   top:-50,
      },
  },
   text: {
     fontWeight:600,
     marginTop:60,
     color: theme.palette.primary.title,
    
   },
   inputText:{
    marginTop:10,
   },
    checkoutBtn:{
        padding:10,
        marginTop:15,
        marginBottom:10,
        backgroundColor:theme.palette.primary.main,
        width:'100%',
        color:'#fff',
        border: `2px solid ${theme.palette.primary.main}`,
        '&:hover': {
        color:theme.palette.primary.main,
        },
            transition:'0.1s',
        textTransform:'uppercase',
        transition: '0.2s',
        cursor:'pointer',
    },
    firstname:{
      width:'90%'
     
    },
    Lastname:{
      width:'90%',
      marginLeft:15,
      [theme.breakpoints.down('md')]: {
        marginLeft:17,
        },
    },
  form: {
    width: 300, 
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
         width: 260, 
      },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error:{
    // width:'100%',
    marginTop:10,
    padding:'5px',
    borderRadius:5,
    backgroundColor:'rgba(247, 82, 27,0.1)',
    color:'#ea5a20'
},
errorText:{
    fontWeight:600
},
}));

function Auth(props) {
  const classes = useStyles();
  const [ newUser, setNewUser ] = useState(false);
  //input fields
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('');

  const [ name, setName ] = useState('');
  const [phone, setPhone] = useState('');
//LOGIN
const handleLoginUser = (e) => {
  e.preventDefault();
  const userData = {
    username:email,
    password,
  };
  props.loginUser(userData)
}
const handleNavigateToLogin = () => {
  setNewUser(false)
}
  //SIGNUP
  const handleSignupUser = (e) => {
    e.preventDefault();
    const userData = {
      username :email ,
      password,
      firstname: name.split(' ')[0],
      lastname: name.split(' ')[1],
      phone
    };
    props.signupUser(userData)
  }

  const handleSignup = () => {
    setNewUser(true)
    // props.clearErrors()
  }
  
  useEffect(()=>{  
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    // props.clearErrors()
    
  },[]);
  

  
  return (
    <Grid  component="main" className={classes.root}>
       <div className={classes.paper}>
          {!newUser?
            <div >
              <Typography component="h1" variant="h5" className={classes.text}color="textSecondary">
                Se connecter
              </Typography>
               <div style={{ marginTop:10}}>
                <LoginWithGoogle />
                {/* <LoginWithFacebook /> */}
               </div>
               <div>
                {/* <LoginWithGoogle /> */}
                <LoginWithFacebook />
               </div>
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
                {props.user.errors ==='Unauthorized'?<div className={classes.error}>
                 <p className={classes.errorText}>Email ou mot de passe ncorrect.</p>
                </div>:null}
                <form className={classes.form} onSubmit={handleLoginUser}>
                <InputText 
                  fullWidth
                  required
                  name="email"
                  type="email"
                  // autoFocus
                  placeholder="Email"
                  className={classes.inputText}
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <InputText  
                  type="password"
                  fullWidth
                  required
                  placeholder="Password"
                  className={classes.inputText}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button className={classes.checkoutBtn} type="submit"  disabled={props.user.loading}>
                   Se connecter
                </Button>
                <div style={{marginTop: 20}}  >
                  <Link variant="body1" style={{ color:'#4528ba', cursor:'pointer'}} onClick={handleSignup}>
                    Vous êtes un nouveau utilisateur? Créez un compte
                  </Link>
                </div>  
              </form>
            </div>:
            <div>
              <Typography component="h1" variant="h5" className={classes.text}>
                 Créer un nouveau compte
              </Typography>
              {!props.user.errors.err?
                  null:
                  <div className={classes.error}>
                  <p className={classes.errorText}>Adresse email est déjà utilisée.</p>
                  </div>}
              <form className={classes.form} onSubmit={handleSignupUser}>
              <InputText
                 required
                  type="text"
                  // autoFocus
                  fullWidth
                  placeholder="Nom et Prénon"
                  className={classes.name}
                  value={name}
                  onChange={(e)=>setName(e.target.value)}                     
                />
            <InputText 
              required
              name="email"
              type="email"
              fullWidth
              placeholder="Email"
              className={classes.inputText}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <InputText  
              required
              type="password"
              name="password"
              id="password"
              fullWidth
              placeholder="Mot de passe"
              className={classes.inputText}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}  
            />
              <InputText
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name="phone"
                placeholder="Téléphone"
                type="tel"
                id="phone"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
            />
            <Button className={classes.checkoutBtn} type="submit">
              Créez un compte
            </Button>
            <div style={{marginTop: 20}}>
                <Link  variant="body1" style={{ color:'#4528ba', cursor:'pointer'}} onClick={handleNavigateToLogin}>
                  Vous avez déjà un compte! Se connecter
                </Link>
            </div>
          </form>
        </div>}
      </div>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user : state.user
});
const mapActionsToProps = {
  loginUser,
  signupUser
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Auth);