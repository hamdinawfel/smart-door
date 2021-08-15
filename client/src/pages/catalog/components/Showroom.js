import React , { useState, useEffect } from 'react';
//Mui
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useTheme } from '@material-ui/core/styles';
//Icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//
import LoadingProducts from './ProductsLoading'
//redux set up
import { connect } from 'react-redux';
import { getShowcaseProducts } from '../actions'
import { addToCart,  subQuantity, getCart} from '../../cart/actions'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    margin:'15px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
       margin:'15px 0',
    },
  },
  cardMedia: {
    paddingTop: '70.25%', 
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
    fontWeight:900,
    fontSize:20,
    opacity:0.6,
    color:'#000'
  },
  title:{
    fontWeight:300,
    textTransform:'uppercase',
    '&:hover': {
        cursor:'pointer',
        color:theme.palette.primary.main
     },
  },
  dialogTitle:{
    fontWeight:600,
    textTransform:'capitalize',
    marginBottom:15,
    [theme.breakpoints.down('sm')]: {
        textAlign:'center',
        margin:'15px auto'
       },
  },
  price:{
    float:'right',
    fontSize:'1.1rem',
    fontWeight:600,
    color: '#fff',
  },
  dialogPrice:{
    fontWeight:600,
    color: '#008000',
    border: `1px solid #9ef01a`,
    padding: 5,
    borderRadius:'5px',
    [theme.breakpoints.down('sm')]: {
       align:'center'
      },
  },
  dialogPriceContainer:{
      display:'flex',
    justifyContent:'left',
    [theme.breakpoints.down('sm')]: {
      display:'flex',
        justifyContent:'center',
      },
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
  dialogContainer:{
      margin:'5px',
  },
  dialogIconsContainer:{
    display:'block',
    justifyContent:'space-around',
    marginTop:'30px',
  },
  dialogBtnContainer:{
   display:'flex',
   justifyContent:'space-between',
   padding:'0 24px',
    [theme.breakpoints.down('sm')]: {
        padding:'0px',
      },
  },
  myButton:{
    color: '#fff',
    fontSize:20,
    fontWeight:900,
    padding:'10px 50px',
    marginTop:15,
    borderRadius:0,
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
     letterSpacing:0.8,
     textTransform:'capitalize',
    transition: '0.5s',
    '&:hover': {
     backgroundColor: '#fff',
     color: theme.palette.primary.main
    },
},
characteristics:{
  padding:2,
  background:'#f5f5f5',
  marginTop:25,
},
feature:{
  background:'#fff',
  border:'1px solid #f5f5f5',
  display:'flex',
  alignItems:'center',
  padding:'0 5px'
},
topTitleBar:{
  height:40,
  width:120,
  display:'flex',
  justifyContent:'start',
  padding:0,
  background:'inherit',
  
},
  bottomTitleBar:{
      width:'100%',
       background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
cardIcon:{
   transition: 'all 0.5s ease',
  '&:hover': {
      color:'#fff'
  },
}
}));

function Showroom(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState('');
  const theme = useTheme();
  const screen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleAddToCart = (item)=>{
    props.addToCart(item); 
  }
 const handleSubQuantity = (item)=>{
    props.subQuantity(item)
 }

 useEffect(() => {
    props.getCart()
    },[]);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelected(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
   <div>
        <Grid container >
       { !props.catalog.loadingProducts?
           <React.Fragment>
               {props.catalog.products.map(item => 
                 <Grid item key={item._id} xs={12} sm={6} md={4} style={{ margin:'10px 0'}}>
                    <Card className={classes.card} elevation={3}>
                        <GridListTile style={{listStyle:'none'}}>
                        <CardMedia
                          onClick={()=>handleClickOpen(item._id)}
                          className={classes.cardMedia}
                          image={item.imageUrl}
                          title={item.name}
                      /> 
                      <GridListTileBar
                          titlePosition="bottom"
                          title={
                          <Grid container>
                              <Grid item xs={8}>
                              <Typography onClick={()=>handleClickOpen(item._id)} className={classes.title}>
                              {item.title} 
                              </Typography>
                              </Grid>
                              <Grid item xs={4}>
                              <Typography className={classes.price}>
                                  {item.price} <span style={{fontSize:12}}>DT</span>
                              </Typography>
                              </Grid>
                          </Grid>
                          }
                          classes={{
                            root: classes.bottomTitleBar,
                          }}
                        />
                      <GridListTileBar
                          titlePosition="top"
                          title={
                           <div>
                              <IconButton size="small" onClick={()=>handleClickOpen(item._id)}>
                                 <VisibilityIcon fontSize="small" className={classes.cardIcon}/>
                              </IconButton>
                               { props.cart.addedItems.findIndex(el => el._id === item._id) !== -1 ?
                                <Link href="/cart">
                                    <IconButton size="small">
                                      <ShoppingCartIcon fontSize="small" className={classes.cardIcon}/>
                                    </IconButton>
                               </Link>
                               :null}
                           </div>
                          }
                          classes={{
                            root: classes.topTitleBar,
                          }}
                        />
                      </GridListTile> 
                      <CardActions style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:-20}}>
                          <IconButton sise="small" onClick={()=>handleSubQuantity(item)} disabled={props.cart.addedItems.findIndex(el => el._id === item._id) === -1}>
                          <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}} />
                          </IconButton>
                          <div className={classes.countContainer}>
                            { props.cart.addedItems.findIndex(el => el._id === item._id) !== -1 ?
                                <Typography className={classes.count}>{props.cart.addedItems.find(ele => ele._id === item._id).quantity}</Typography>:
                                <Typography className={classes.count}>{item.quantity}</Typography>
                            }
                          </div>
                          <IconButton onClick={()=>handleAddToCart(item)}>
                          <AddBoxIcon fontSize="large" style={{color:'#E82430'}}/>
                          </IconButton>
                      </CardActions>
                    </Card>
                    <Dialog
                       open={open && item._id === selected}
                      keepMounted
                      maxWidth={screen?'sm':'md'}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogContent dividers>
                      <Grid container className={classes.dialogContainer}>
                        <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'center',paddingRight:30 }}>
                          <img src={item.imageUrl } alt={item.title } style={{ width : '100%' }} />
                        </Grid>
                        <Grid  item xs={12} sm={6}>
                          <h3 className={classes.dialogTitle}>{item.title}</h3>
                          <div className={classes.dialogPriceContainer}>
                            <span className={classes.dialogPrice}>{item.price} DT</span>
                          </div>
                          < DialogContentText id="alert-dialog-slide-description" style={{ margin:'15px 0'}}>
                            {item.description }
                          </DialogContentText>
                          <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                            <IconButton sise="small" onClick={()=>handleSubQuantity(item)} disabled={props.cart.addedItems.findIndex(el => el._id === item._id) === -1}>
                              <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}}/>
                            </IconButton>
                            <div className={classes.countContainer}>
                            { props.cart.addedItems.findIndex(el => el._id === item._id) !== -1 ?
                              <Typography className={classes.count}>{props.cart.addedItems.find(ele => ele._id === item._id).quantity}</Typography>:
                              <Typography className={classes.count}>{item.quantity}</Typography>
                          }
                            </div>
                            <IconButton onClick={()=>handleAddToCart(item)}>
                              <AddBoxIcon fontSize="large" style={{color:'#E82430'}}/>
                              </IconButton>
                          </CardActions>
                          <Grid container className={classes.characteristics}>
                             <Grid item xs={6} sm={4} className={classes.feature}>
                                <DialogContentText style={{padding:0}}>Dimensions</DialogContentText>
                             </Grid>
                             <Grid item  xs={6} sm={8} className={classes.feature}>
                                <DialogContentText>{item.dimensions}</DialogContentText>
                             </Grid>
                             <Grid item xs={6} sm={4} className={classes.feature}>
                                <DialogContentText>Couleur</DialogContentText>
                             </Grid>
                             <Grid item xs={6} sm={8} className={classes.feature}>
                                <DialogContentText>{item.color}</DialogContentText>
                             </Grid>
                             <Grid item xs={6} sm={4} className={classes.feature}>
                                <DialogContentText>Matériaux</DialogContentText>
                             </Grid>
                             <Grid item xs={6} sm={8} className={classes.feature}>
                                <DialogContentText>{item.material}</DialogContentText>
                             </Grid>
                             <Grid item  xs={6} sm={4} className={classes.feature}>
                                <DialogContentText>Livraison</DialogContentText>
                             </Grid>
                             <Grid item  xs={6} sm={8} className={classes.feature}>
                                <DialogContentText>{item.deliveryMode}</DialogContentText>
                             </Grid>
                             <Grid item  xs={6} sm={4} className={classes.feature}>
                                <DialogContentText>Paiement</DialogContentText>
                             </Grid>
                             <Grid item xs={6} sm={8} className={classes.feature}>
                                <DialogContentText>Paiement à la livraison</DialogContentText>
                             </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                    </DialogContent>
                    <div className={classes.dialogBtnContainer}>
                        <Button onClick={handleClose} color="primary" variant="outlined" className={classes.link} style={{ textDecoration:'none'}}>
                          <ArrowBackIosIcon  fontSize='small'/>  Continuer 
                        </Button>
                       <Link href='/cart' style={{textDecoration:'none'}}>
                        <Button color="primary" variant="outlined" className={classes.link}>
                            Commander  <ArrowForwardIosIcon fontSize='small'/>
                        </Button>
                       </Link>
                    </div>
                </Dialog>
                </Grid>)} 
           </React.Fragment>:<LoadingProducts />
       }
    </Grid>
   </div>
  )
}

const mapStateToProps = (state) => ({
 catalog: state.catalog,
 cart :state.cart
});

const mapActionsToProps =   {
 getShowcaseProducts,
  addToCart,
  subQuantity,
  getCart
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Showroom);