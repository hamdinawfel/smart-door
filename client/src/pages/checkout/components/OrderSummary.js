import React from 'react'
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

//redux
import { connect } from 'react-redux';
import { addQauntity, subQuantity } from '../actions';

const useStyles = makeStyles((theme) => ({
    root:{
        border: '1px solid rgba(0, 0, 0, .125)',
        background:'#fff',
        width:'90%',
        marginLeft:10,
        zIndex:0,
        fontSize:22,
        [theme.breakpoints.down('sm')]: {
          marginLeft:0,
          width:'100%',
          marginBottom:20
        },
    },
    image:{
      display:'block',
      margin:'10px',
      width:'50%'
    },
  myButton:{
    textTransform:'capitalize',
      width: '100%',
      padding: '10px',
      margin: '0 auto',
      cursor: 'pointer',
      display: 'block',
      background:'#47cf73',
      color: '#fff',
      border:0,
      outline: 'none',
      borderRadius:' 30px', 
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
      rightSide:{
          textAlign:'end',
          margin:'10px 0'
      },
      totalContainer:{
        borderTop:'1px solid #eee',
        padding:'0 10px',
        fontWeight:600,
        fontSize:20
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
      countContainer:{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius:'25px',
        width:'100%',
        padding:'5px auto',
        [theme.breakpoints.up('md')]: {
          width:'50%',
        },
        [theme.breakpoints.down('sm')]: {
          width:'100%',
        },
        [theme.breakpoints.down('xs')]: {
          width:'100%',
        },
      },
      count:{
        textAlign:'center',
        padding:'0.3rem 0.3rem',
        fontWeight:900,
        fontSize:20,
        opacity:0.6,
        color:'#000'
      },
      editCartBtn:{
        color:'#31A8FF',
        marginRight:5,
        padding:'5px',
        textDecoration:'underline'
      }
    }));

function OrderSummary(props) {
  const classes = useStyles();
  const handleAddQauntity = () => {
    props.addQauntity()
  }
  const handleSubQauntity = () => {
    props.subQuantity()
  }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.titleContainer}>
              <Typography className={classes.title}>Commande</Typography>
             <Link href='/cart/' style={{textDecoration:'none', color:'inherit'}}>
               <div>
                  <Button size="small" className={classes.editCartBtn}>Editer</Button>
                </div>
             </Link>
            </Grid>
            {props.cart.addedItems.map(item => 
              <Grid container>
                <Grid item xs={2}>
                  <img src={item.imageUrl} alt="product" className={classes.image} />
                </Grid>
                <Grid item xs={5} style={{ display:'flex', alignItems:'center'}}>
                  <Typography style={{margin:'10px 0 10px 10px'}}>{item.title}</Typography>
                </Grid>
                <Grid item xs={5} style={{ display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                  <Typography style={{margin:'10px 10px 10px 0' }}>{item.quantity} x</Typography>
                  <Typography style={{margin:'10px 10px 10px 0', fontWeight:600}}>{item.price} DT</Typography>
                </Grid>
              </Grid>
              )}
           <Grid container className={classes.totalContainer}>
            <Grid item xs={6} style={{margin:'10px 0', fontWeight:900, fontSize:'1.2rem'}}>
                <p>Total</p>
                </Grid>
                <Grid item xs={6} className={classes.rightSide}>
                <p style={{ fontWeight:900, fontSize:'1.2rem'}}>{Math.abs(parseFloat(props.cart.total).toFixed(2))} DT</p>
                </Grid>
           </Grid>
        </Grid>
    )
}
const mapStateToProps = (state) => ({
    checkout: state.checkout,
    cart: state.cart
   });
   const mapActionsToProps =   {
    subQuantity,
    addQauntity
  };
   export default connect(
     mapStateToProps,
     mapActionsToProps
   )(OrderSummary);
