import React, { useState, useEffect } from 'react';
//mui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//redux set up
import { connect } from 'react-redux';
import { submitCart, getLocations } from '../action'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:-70,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  paper: {
    position:'relative',
    top:0,
    margin: theme.spacing(4, 12),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(8, 4),
    //   top:-50,
      },
  },
   text: {
     fontWeight:600,
     marginTop:60,
     color: theme.palette.primary.title,
     [theme.breakpoints.down('xs')]: {
    //   marginTop:-10,
      },
   },
   inputText:{
    marginTop:10,
   },
    checkoutBtn:{
        padding:10,
        marginTop:40,
        marginBottom:10,
        backgroundColor:theme.palette.primary.main,
        width:'100%',
        color:'#fff',
        border: `2px solid ${theme.palette.primary.main}`,
        '&:hover': {
        color:theme.palette.primary.main,
        },
            transition:'0.1s',
            [theme.breakpoints.down('xs')]: {
           marginTop:40,

            },
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Adress(props) {
  const classes = useStyles();
  const [ city, setCity ] = useState('');
  const [ adress, setAdress ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ error, setError ] = useState(false);
  const [ products, setProducts ] = useState([]);
  const handleChopping = (e) => {
    e.preventDefault();
    props.products.addedItems.forEach(element => products.push({
      product: element._id,
      quantity : element.quantity,
    }));
        const orderData = {
          city,
          adress,
          phone,
          products
        }
    var phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;

        if(phone.match(phoneRegex)){
          setError(false);
          props.submitCart(orderData);
          setCity('');
          setAdress('');
          setPhone('');
        }else{
          setError(true)
        }
   }
  
   useEffect(() => {
     props.getLocations()
   }, []);
  return (
    <div  className={classes.root}>
       <div className={classes.paper}>
           {!props.checkout.loading?
            <React.Fragment>
              <Typography component="h1" variant="h5" className={classes.text}color="textSecondary">
                Entrer votre adresse de livraison
              </Typography>
              <form onSubmit={handleChopping} className={classes.form}>
                <TextField
                    select
                    label="Ville"
                    required
                    fullWidth
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                    // variant="filled"
                  >
                    {props.checkout.locations.map((item) => (
                      <MenuItem key={item._id} value={item.location}>
                        {item.location}
                      </MenuItem>
                    ))}
                  </TextField>
                <TextField
                    style={{ marginTop : 20}}
                    required
                    margin="dense"
                    label="Adresse"
                    name="adress"
                    type="text"
                    fullWidth
                    multiline = {3}
                    value={adress }
                    onChange={(e)=>setAdress(e.target.value)}
                />
                <TextField
                    required
                    error={error}
                    margin="dense"
                    label="Téléphone"
                    type="tel"
                    name="phone"
                    fullWidth
                    value={phone }
                    onChange={(e)=>setPhone(e.target.value)}
                />
                <Button type='submit' className={classes.checkoutBtn}>
                  Commander
                </Button>
              </form>
            </React.Fragment>
            :
              <CircularProgress style={{ marginTop : 50}}/>
           }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  products: state.products,
  checkout : state.checkout
});
const mapActionsToProps = {
  submitCart,
  getLocations
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Adress);