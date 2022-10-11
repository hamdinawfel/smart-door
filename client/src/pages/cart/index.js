import React , {useEffect } from 'react'
//M-UI
import { makeStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
//Icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
//Utils
import Title from '../../utils/Title'
import Footer from '../../utils/footer/index'
import Navbar from '../../utils/navbar/index'
import Chat from '../../utils/Chat'
//assets
import empty from './assets/empty.svg'
//Redux
import { connect } from 'react-redux';
import {getCart, addToCart, subQuantity} from './actions';

const useStyles = makeStyles(theme => ({
    root: {
        padding:'10px 100px 200px 100px',
        marginTop:-20,
        backgroundColor:'#f2f2f2',
        [theme.breakpoints.down('md')]: {
            padding:'20px 20px 200px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            padding:'20px 10px 200px 10px', 
        }
    },
    table:{
        marginTop:50
    },
      link: {
        marginTop: 30,
        fontWeight:600,
        fontSize:'0.85rem',
        '&:hover': {
          color:theme.palette.primary.main,
        },
        transition:'0.1s'
      },
      container:{
        padding:20,
        borderBottom:'3px solid #f2f2f2',
        [theme.breakpoints.down('sm')]: {
          padding:'5px 2px',
        }
      },
      image:{
        width:100,
        [theme.breakpoints.down('sm')]: {
          width:50,
          display:'block',
          margin:'0 auto',
          marginTop:15

        }
      },
      title:{
        fontWeight:600,
        color:'rgba(0,0,0,0.5)',
        fontSize:18,
        marginLeft:20,
        display:'flex',
        [theme.breakpoints.down('sm')]: {
          display:'none',
        }
      },
      total:{
        fontWeight:900,
        color:'rgba(0,0,0,0.5)',
        fontSize:22,
        marginLeft:20,
        display:'flex'
      },
      count:{
        textAlign:'center',
        padding:'0.3rem 0.3rem',
        fontWeight:600,
        fontSize:18,
        opacity:0.6,
        color:'#000',
      },
      totalContainer:{
        marginTop: 20,
        padding :'30px 50px',
        [theme.breakpoints.down('sm')]: {
          padding :'30px 10px',

        },
      },
        btnContainer:{
          display:'flex',
          justifyContent:'space-between',
          padding:'0 24px',
            [theme.breakpoints.down('sm')]: {
                padding:'0px',
              },
        },
      emptyContainer:{
        padding:50,
        background:'#fff',
        borderRadius:'20px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'0 auto'
      },
      emptyImage:{
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        width:250,
         marginBottom:20
      },
    myButton:{
      display:'block',
      marginLeft:'auto',
      marginRight:'auto',
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
  }));

 function Cart(props) {
    const classes = useStyles();
    useEffect(() => {
      props.getCart()
    }, []);

    const handleAddToCart = (item)=>{
      props.addToCart(item); 
    }
    const handleSubQuantity = (item)=>{
      props.subQuantity(item)
    }
   
    return (
        <div>
          <Navbar />
          <div container className={classes.root}>
            {props.cart.addedItems.length !== 0?
            <div>
            <Title title="Mon panier" />
            <Grid className={classes.table} component={Paper}>
                  {props.cart.addedItems.map((row) => (
                    <Grid container key={row.title} className={classes.container}>
                      <Grid xs={3} sm={4}>
                            <div style={{ display:'flex', alignItems:'center'}}> 
                                <img src={row.imageUrl} alt={row.title} className={classes.image} />
                                <p className={classes.title}>{row.title}</p>
                            </div>
                        </Grid>
                      <Grid xs={6} sm={4} style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <CardActions style={{display:'flex'}}>
                          <IconButton sise="small" onClick={()=>handleSubQuantity(row)}>
                            <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}} />
                          </IconButton>
                          <div className={classes.countContainer}>
                            <Typography className={classes.count}>{row.quantity}</Typography>
                          </div>
                          <IconButton onClick={()=>handleAddToCart(row)}>
                            <AddBoxIcon fontSize="large" style={{color:'#E82430'}}/>
                            </IconButton>
                        </CardActions>
                      </Grid>
                      <Grid xs={3}  sm={4} style={{ display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                        <sapn className={classes.count}>
                           {parseFloat(row.price* row.quantity ).toFixed(0)} DT
                        </sapn>
                      </Grid>
                    </Grid>
                  ))}
          </Grid>
          <Grid container component={Paper} className={classes.totalContainer}> 
              <Divider /> 
            <Grid item xs={6}>
              <p className={classes.total}>
                Total
              </p>
            </Grid>
            <Grid item xs={6} >
              <p className={classes.title} style={{display:'block', textAlign:'end', fontWeight:900}}>
                {Math.abs(parseFloat(props.cart.total).toFixed(2))} DT
              </p></Grid>
          </Grid>
          <div className={classes.btnContainer}>
            <Link href='/catalog/showroom' style={{textDecoration:'none'}}>
              <Button color="primary" variant="outlined" className={classes.link} style={{ textDecoration:'none'}}>
                 <ArrowBackIosIcon  fontSize='small'/>  Continuer 
               </Button>
            </Link>
              <Button  href='/checkout' color="primary" variant="outlined" className={classes.link}>
              Commander  <ArrowForwardIosIcon style={{marginLeft: 10}}/>
            </Button>
          </div>
          </div>
          :
           <div>
              <Title title="Mon panier est vide" />
              <img src={empty} alt="Pannier vide" className={classes.emptyImage}/>
              <Link href='/catalog/showroom' style={{textDecoration:'none'}}>
                <Button className={classes.myButton}>
                  Voir Notre catalogue
                </Button>
              </Link> 
           </div>
            }
          </div>
           <Chat />
           <Footer />
        </div>
      
    )
}
const mapStateToProps = (state) => ({
    cart: state.cart
  });
  const mapActionsToProps = {
    getCart,
    addToCart,
    subQuantity,
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Cart);
