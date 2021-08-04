import React , { useState, useEffect} from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
//

//redux
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root:{
        border: '1px solid rgba(0, 0, 0, .125)',
        background:'#fff',
        width:'90%',
        marginLeft:10,
        position:'sticky',
        // top:100,
        fontSize:22,
        [theme.breakpoints.down('sm')]: {
          marginLeft:0,
          width:'100%',
          marginBottom:20
        },
    },
  myButton:{
    textTransform:'capitalize',
      width: '300px',
      padding: '10px',
      margin: '0 auto',
      cursor: 'pointer',
      display: 'block',
      background:'#47cf73',
      color: '#fff',
      border:0,
      outline: 'none',
      borderRadius:'0px', 
      position: 'relative',
      zIndex: 5,
      boxSizing: 'border-box',   
      fontWeight: 300,
      fontSize:'18px', 
      border:`2px solid #47cf73`,
      transition: '0.5s',
      '&:hover': {
          background: '#fff',
          color: '#47cf73',
          border:`2px solid #47cf73`
        },
      },  
      titleContainer:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        background:'#F7F7F7',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',

      },
      title:{
        fontWeight:600,
        fontSize:20,
        margin:'12px'
      },
      field:{
        position:'relative',
        zIndex:2,
        display:'flex',
        justifyContent:'center',
         margin:'20px auto',
        width:300
      },
      message:{
        position:'relative',
        zIndex:1,
        display:'block',
         margin:'20px auto',
        width:300
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
      thankYou:{
        background:'#fff',
        padding:30
      }
    }));

function OrderInfo(props) {
  const classes = useStyles();
  const [ name, setName] = useState('');
  const [ email, setEmail] = useState('');
  const [ adress, setAdress] = useState('');
  const [ phone, setPhone] = useState('');
  const [ message, setMessage] = useState('');
  const [ open, setOpen] = useState(false);
  const handleSubmit = (e) => {
     e.preventDefault()
     const orderData ={
      name,
      email,
      phone,
      adress,
      message
     }
   setOpen(true)
  }
  const handleClose = ()  => {
    localStorage.removeItem('count');
    localStorage.removeItem('total');
    localStorage.removeItem('addedItems');
  }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.titleContainer}>
              <Typography className={classes.title}>Informations</Typography>
            </Grid>
            <Grid item xs={12} >
            <form onSubmit={handleSubmit}style={{padding:'30px 0'}}>
                  <div className={classes.field}>
                    <TextField
                        required
                        color="secondary"
                        style={{width:'300px'}}
                        name="first name"
                        label="Nom et Prénom"
                        placeholder="Entrer votre Nom et Prénon"
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                  </div>
                  <div className={classes.field}>
                    <TextField
                        required
                        style={{width:'300px'}}
                        color="secondary"
                        name="Email"
                        label="Eamil"
                        placeholder="Entrer votre Email"
                        variant="outlined"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                  </div>
                  <div className={classes.field}>
                    <TextField
                        required
                        style={{width:'300px'}}
                        color="secondary"
                        name="adress"
                        label="Adresse"
                        placeholder="Entrer votre Adresse"
                        variant="outlined"
                        value={adress}
                        onChange={e => setAdress(e.target.value)}
                        />
                  </div>
                  <div className={classes.field}>
                    <PhoneInput
                          masks={{
                            tn: ".. ... ...",
                          }}
                        style={{width:'100%'}}
                        inputProps={{
                          required: true,
                        }}
                          country={'tn'}
                          value={phone}
                          onChange={(phone) => setPhone( phone )}
                        />
                  </div>
                  
                  <div className={classes.message}>
                    <TextField
                        style={{width:'300px', color:'secondary'}}
                        color="secondary"
                        name="message"
                        label="Information supplémentaire"
                        placeholder="Information supplémentaire"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        />
                  </div>
                  <div style={{position:'relative', zIndex:0}}>
                    <Button className={classes.myButton} type="submit">
                    Commander  
                    </Button>
                  </div>
                </form>
            </Grid>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <div className="thank-container">
              <div className="wrapper-1">
                <div className="wrapper-2">
                  <h4>Thank you !</h4>
                  <p>Votre commande a été passée avec succès.</p>
                  <Link href="/" style={{textDecoration:'none'}}>
                    <button className="track" onClick={handleClose}>
                       Accueil
                    </button>
                  </Link>
                </div>
                <div className="footer-like">
                  <p>Une fois votre commande traitée, vous recevrez un e-mail</p>
                </div>
            </div>
            </div>
          </Backdrop>
        </Grid>
    )
}
const mapStateToProps = (state) => ({
    cart: state.cart
   });
   const mapActionsToProps =   {
    
  };
   export default connect(
     mapStateToProps,
     mapActionsToProps
   )(OrderInfo);
