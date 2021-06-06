import React from 'react'
//M-UI
import { makeStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
//M-ICONS
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
//Redux
import { connect } from 'react-redux';
const useStyles = makeStyles(theme => ({
    root: {
       padding:10
    },
    title:{
        color:theme.palette.primary.text,
        fontWeight:600,
        verticalAlign:'middle',
        marginTop:20
    },
    count:{
        color:theme.palette.primary.text,
        fontSize: '2rem',
        fontWeight:900,
        margin:0,
        marginTop:5,
        verticalAlign:'middle',
        opacity:0.7
    },
    price:{
        color:theme.palette.primary.text,
        verticalAlign:'middle',

    },
    cart:{
        display:'flex',
        justifyContent:'space-between',
        backgroundColor:'#f7f7f7',
        padding:'0 50px',
        borderTop:'1px solid #e5e5e5',
        [theme.breakpoints.down('sm')]: {
            padding:'20px',
        }
    }
  }));

function Order(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
          <Card  variant="outlined" square >
            { props.products.addedItems.map(item => (
                <div>
                <Grid container className={classes.root}>
                    <Grid item xs={2} >
                        <img src={item.imageUrl} alt="article" style={{ width : 50, verticalAlign:'middle' }} />
                    </Grid>
                    <Grid item xs={2} >
                        <h3 className={classes.count}>{item.quantity} x</h3>
                    </Grid>
                    <Grid item xs={6} >
                        <p className={classes.title}>{item.title}</p>
                    </Grid>
                    <Grid item xs={2} >
                        <h3 className={classes.price}>{parseFloat(item.sellPrice* item.quantity ).toFixed(2)} DT</h3>
                    </Grid>
                    <Divider />
                </Grid>
                <Divider />
                </div>))}
            <div className={classes.cart}>
               <h3>Total :</h3>
               <h3>
                 {parseFloat(props.products.total).toFixed(2)} DT
               </h3>
            </div>
        </Card>
            <Grid container className={classes.root}>
                <Grid item xs={1} >
                  <LocalShippingIcon style={{ marginTop : 10}}/>
                </Grid>
                <Grid item xs={11} >
                  <p style={{ fontSize:'14px', color: "#525c65"}}>Livraison gratuit pour les commandes qui dépassent <span style={{ color: '#000', fontWeight: 600}}>25 DT</span>.</p> 
                </Grid>
                <Grid item xs={1} >
                    <AccountBalanceWalletIcon style={{ marginTop : 10}}/>
                </Grid>
                <Grid item xs={11} >
                   <p style={{ fontSize:'14px', color: "#525c65"}}>Paiement à la livraison.</p>
                </Grid>
                <Grid item xs={1} >
                    <SwapHorizontalCircleIcon style={{ marginTop : 10}}/>
                </Grid>
                <Grid item xs={11} >
                   <p style={{ fontSize:'14px', color: "#525c65"}}>Changez vos Bouteilles vides par un cadeau.</p>
                </Grid>
            </Grid>
       </React.Fragment>
      
    )
}
const mapStateToProps = (state) => ({
    products: state.products,
  });

  export default connect(
    mapStateToProps,
    null
  )(Order);