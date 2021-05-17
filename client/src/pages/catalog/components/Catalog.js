import React , { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//Mui
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

//Icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
//components
import ProductCard from './ProductCard'
import ProductsLoading from './ProductsLoading'
//redux set up
import { connect } from 'react-redux';
// import { getProducts, addToCart, subQuantity} from '../actions'
import { getProducts, getCatalog} from '../actions'

const useStyles = makeStyles((theme) => ({
 root:{
    padding:'0px',
 },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    margin:'10px 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    objectFit: 'cover',
    backgroundSize: '50% auto',

    transition: 'all 0.5s ease',
    '&:hover': {
      transform : 'scale(1.1)',
      cursor:'pointer'
   },
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
  },
  title:{
    fontWeight:600,
    textTransform:'capitalize',
    '&:hover': {
        cursor:'pointer',
        color:'#008000'
     },
  },
  price:{
    float:'right',
    fontWeight:600,
    color: '#008000',
    border: `1px solid #9ef01a`,
    padding: 5,
    borderRadius:'5px',
  },
  link: {
    margin: 10,
    fontWeight:600,
    fontSize:'0.85rem',
    '&:hover': {
      color:theme.palette.primary.main,
    },
    transition:'0.1s',
    [theme.breakpoints.down('xs')]: {
      margin:'5px',
    },
  },
}));


function Catalog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState('');
  let history = useHistory();
  
  const handleAddToCart = (id)=>{
    // props.addToCart(id); 
  }
 const handleSubQuantity = (id)=>{
    // props.subQuantity(id)
 }
 
 const handleNavigateToCart = ()=>{
    history.push('/cart')
  }
//  useEffect(() => {
//    if(history.location.pathname === '/'){
//     //  props.getProducts(props.products.page);
//    }
//     },[]);
useEffect(() => {
  props.getCatalog("best selling");
}, []);
  const handleClickOpen = (id) => {
    setOpen(true);
    setSelected(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
   <div className={classes.root}>
        <Grid container>
         { !props.catalog.loadingProducts?
          <React.Fragment>
             {props.catalog.products.map(item => 
              <ProductCard 
                  key={item._id}
                  title={item.title}
                  price={item.price}
                  theme={item.theme}
                  description={item.description}
                  imageUrl={item.imageUrl}
                   />)}
          </React.Fragment>
          :
          <ProductsLoading  />
        }
       {/* { !props.products.loading?
           <React.Fragment>
               {props.products.data.map(item => 
                 <Grid item key={item._id} xs={12} sm={6} md={4} style={{ marginTop:20}}>
                    <Card className={classes.card} elevation={3}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={item.imageUrl}
                        title={item.name}
                        onClick={()=>handleClickOpen(item._id)}
                    />                  
                    <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                        <IconButton sise="small"onClick={()=>handleSubQuantity(item._id) } disabled={props.products.addedItems.find(ele => ele._id === item._id)? false: item.quantity === 0} >
                        <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}}/>
                        </IconButton>
                        <div className={classes.countContainer}>
                          { props.products.addedItems.length !== 0 && props.products.addedItems.find(ele => ele._id === item._id) ?
                              <Typography className={classes.count}>{props.products.addedItems.find(ele => ele._id === item._id).quantity}</Typography>:
                              <Typography className={classes.count}>{item.quantity}</Typography>
                          }
                        </div>
                        <IconButton onClick={()=>handleAddToCart(item._id)}>
                        <AddBoxIcon fontSize="large" style={{color:'#4528ba'}}/>
                        </IconButton>
                    </CardActions>
                    <Grid container style={{padding:10}}>
                        <Grid item xs={8}>
                        <Typography onClick={()=>handleClickOpen(item._id)} className={classes.title}>
                        {item.title} 
                        </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography className={classes.price}>
                            {item.sellPrice}{' DT'}
                        </Typography>
                        </Grid>
                    </Grid>
                    </Card>
                    <Dialog
                       open={open && item._id === selected}
                      keepMounted
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogContent dividers>
                      <Grid container>
                        <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center'}}>
                          <img src={item.imageUrl } alt={item.title } style={{ width : '100%' }} />
                        </Grid>
                        <Grid  item xs={12} sm={6}>
                          <h3 style={{ fontSize: '1.2rem'}}>{item.title}</h3>
                          <h3 style={{ fontSize: '1.2rem'}}>{item.sellPrice} DT</h3>
                          < DialogContentText id="alert-dialog-slide-description">
                            {item.description }
                          </DialogContentText>
                          <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                            <IconButton sise="small" onClick={()=>handleSubQuantity(item._id)} disabled={props.products.addedItems.find(ele => ele._id === item._id)? false: item.quantity === 0}>
                              <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}}/>
                            </IconButton>
                            <div className={classes.countContainer}>
                            { props.products.addedItems.length !== 0 && props.products.addedItems.find(ele => ele._id === item._id) ?
                              <Typography className={classes.count}>{props.products.addedItems.find(ele => ele._id === item._id).quantity}</Typography>:
                              <Typography className={classes.count}>{item.quantity}</Typography>}
                            </div>
                            <IconButton onClick={()=>handleAddToCart(item._id)}>
                              <AddBoxIcon fontSize="large" style={{color:'#4528ba'}}/>
                              </IconButton>
                          </CardActions>
                        </Grid>
                      </Grid>
                      <div style={{ display:'flex', marginTop:'30px'}}>
                        <LocalShippingIcon style={{ marginRight : 20}}/>
                        <DialogContentText>
                          Livraison gratuit pour les commandes qui dépassent <span style={{ color: '#000', fontWeight: 600}}>25 DT</span>
                        </DialogContentText>
                      </div>
                      <div style={{ display:'flex'}}>
                        <AccountBalanceWalletIcon style={{ marginRight : 20}}/>
                        <DialogContentText>
                          Paiement à la livraison
                        </DialogContentText>
                      </div>
                    </DialogContent>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button onClick={handleClose} color="primary" variant="outlined" className={classes.link} style={{ textDecoration:'none'}}>
                          <ArrowBackIosIcon  fontSize='small'/>  Continuer 
                        </Button>
                        <Button onClick={handleNavigateToCart} color="primary" variant="outlined" className={classes.link}>
                          Commander  <ArrowForwardIosIcon fontSize='small'/>
                        </Button>
                    </div>
                </Dialog>
                </Grid>)}
           </React.Fragment>:
           <div style={{ margin :'0 auto', marginTop:100}}>
               <CircularProgress  />
           </div>
       }*/}
    </Grid> 
   </div>
  )
}

const mapStateToProps = (state) => ({
 catalog: state.catalog
});

const mapActionsToProps =   {
 getProducts,
 getCatalog,
//   addToCart,
//   subQuantity,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Catalog);