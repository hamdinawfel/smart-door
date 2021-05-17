import React , { useState } from 'react'
//M-UI
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

//Redux
import { connect } from 'react-redux';
import { subscribe, closeMessage} from './actions';

const useStyles = makeStyles((theme) => ({
   root:{
       backgroundColor:theme.palette.primary.bleu,
       color:'#fff',
       padding:30,
       textAlign:'center',
   },
   button:{
       color: '#fff',
       marginTop:20,
       marginBottom:50,
       borderRadius:0,
       backgroundColor: '#31A8FF',
       '&:hover': {
        backgroundColor: '#fff',
        color: '#31A8FF',
       },
      transition:0.5
},
title:{
  marginTop:80,
  fontWeight:300
},
snackbar:{
  bottom:270,
  [theme.breakpoints.down('sm')]: {
    bottom:200
  }
}
  }));
  const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: '2px solid #31A8FF',
      overflow: 'hidden',
      borderRadius: 4,
      textAlign:'center',
      width:300,
      padding:6,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade('#57AAB4', 0.25)} 8 8 8 8px`,
        borderColor: '#57AAB4',
        
      },
    },
    
  }));
  
  function RedditTextField(props) {
    const classes = useStylesReddit();
   
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }  

  function NewsLetter(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [clicked, setClicked] = useState(false);
  const handleSubsribe = (e) =>{
    e.preventDefault();
    props.subscribe({email});
    setEmail('');
    setClicked(true)
  }
  
  const handleClose = () => {
    props.closeMessage();
  };
  
    return (
        <div className={classes.root}> 
            <h2 className={classes.title}>Inscrivez vous et recevez nos offres en exclusivité </h2>
            <form onSubmit = {handleSubsribe}>
                <div style={{ display:'flex', justifyContent:'center', margin: '20px 0'}}>
                <RedditTextField
                    style={{margin:'10px auto' }}
                    required={true}
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>
                <Button disabled={clicked && props.subscriber.loading } type="submit" variant="contained" className={classes.button}>
                    Subscribe
                </Button>
            </form>
            {/* <Snackbar
                className={ classes.snackbar}
                open={props.subscriber.success}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={2500}>
                <Alert elevation={6} variant="filled" severity="success" >
                Votre abonnement au newsletter a été envoyé avec succès
                </Alert>
         </Snackbar>
            <Snackbar
               className={ classes.snackbar}
                open={props.subscriber.error}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={2500}>
                    <Alert elevation={6} variant="filled" severity="warning" >
                    Vous êtes déjà abonné
                    </Alert>
         </Snackbar> */}
        </div>
    )
}
const mapStateToProps = (state) => ({
    subscriber: state.subscriber,
});

const mapActionsToProps = {
    subscribe,
    closeMessage
};
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(NewsLetter);
