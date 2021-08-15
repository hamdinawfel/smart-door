import React, {useEffect} from 'react';
//M-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Chip from '@material-ui/core/Chip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
//icon
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import {faFacebookF} from '@fortawesome/fontawesome-free-brands';
 import {faGoogle} from '@fortawesome/fontawesome-free-brands';
 import {faYoutube} from '@fortawesome/fontawesome-free-brands';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

 //Components
import PhoneNavbar from './components/PhoneNavbar'
import Category from './components/Category'
// import Category from './components/Category2'
 //logo
import logo from './assets/logo.jpg'
//Redux
import { connect } from 'react-redux';
import { getCategories } from '../../pages/catalog/actions';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -10,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    float:'right'
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  hideAppBar: {
    zIndex: 4,
    backgroundColor:theme.palette.primary.white,
    userSelect:'none',
    padding:'3px 80px 0 80px',
    [theme.breakpoints.down('sm')]: {
      padding:'3px 0 0 0',
    boxShadow: '0px 0px 8px rgba(91, 137, 158, 0.7)',
    },
  },
  appBar: {
    zIndex: 3,
    backgroundColor:'#fff',
    userSelect:'none',
    padding:'0 100px',
    boxShadow: '0px 0px 8px rgba(91, 137, 158, 0.3)',
    [theme.breakpoints.down('sm')]: {
      padding:'10px',
      display:'none'
    },
  },
 sginup:{
    color: '#fff',
    marginTop:15,
    borderRadius:0,
    backgroundColor: theme.palette.primary.main,
     letterSpacing:0.8,
     textTransform:'capitalize',
    transition: '0.5s',
    '&:hover': {
     backgroundColor: '#fff',
     color: theme.palette.primary.main
    },
    [theme.breakpoints.down('sm')]: {
      marginTop:15,
    },
 },
 desktop:{
   display:'flex',
   [theme.breakpoints.down('sm')]: {
     display:'none',
   },
 },
 phone:{
    display:'none',
    [theme.breakpoints.down('sm')]: {
       display:'flex',  
   },
 },
 iconContainer:{
   display:'flex',
   justifyContent:'center',
   alignItems:'center',
   [theme.breakpoints.down('sm')]: {
       display:'none',  
   },
 },
 icon:{
   fontSize:20,
   margin:'0 10px',
   [theme.breakpoints.down('sm')]: {
       display:'flex',  
   },
 },
 phoneNumber:{
  fontWeight:600,
    color: '#008000',
    border: `1px solid #9ef01a`,
    padding: 5,
    borderRadius:'5px',
 },
cart:{
  marginTop:20,
  float:'right',
  cursor:'pointer',
  [theme.breakpoints.down('sm')]: {
    marginRight:10
  }
}
}));
//
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
//
function Navbar(props) {
  const classes = useStyles();
  useEffect(() => {
    props.getCategories()
  }, []);
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar  color="default" elevation={0}  className={classes.hideAppBar}>
          <Toolbar>
          <Grid container style={{ marginTop: -4}}>
               <Grid item xs={7} md={4} className="logo">
                 <PhoneNavbar />
                 <Link href="/"style={{textDecoration:'none', display:'flex'}}>
                    <img src={logo} alt="Dinari" style={{width:70, cursor:'pointer'}}/>
                    <h3>Dinari</h3>
                 </Link>
               </Grid>
               <Grid item sm={4} className={classes.iconContainer}>
                  <Link target="_blank" rel="noreferrer" color="inherit" href="https://www.facebook.com/dinari.green/">
                    <span>
                      <FontAwesomeIcon icon={faFacebookF}  className={classes.icon}/>
                    </span>
                  </Link>
                  <Link color="inherit" target="_blank" rel="noreferrer" href="https://www.google.com/maps/place/Dinari+green+life/@34.4311398,8.7756556,15z/data=!4m5!3m4!1s0x0:0xeabd5e6cd48f9c33!8m2!3d34.4311398!4d8.7756556">
                    <span>
                      <FontAwesomeIcon icon={faGoogle} className={classes.icon}/>
                    </span>
                  </Link>
                  <Link color="inherit" target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCt1IIo_U9Hc11kBEY6OxMVw/">
                    <span>
                      <FontAwesomeIcon icon={faYoutube}  className={classes.icon}/>
                    </span>
                  </Link>
                  <Chip
                    style={{fontWeight:600, fontSize:16}}
                    variant="outlined"
                    avatar={<WhatsAppIcon />}
                    size="medium"
                    label="+216 22 550 675"
                    />
                  
               </Grid>
               <Grid item xs={5} md={4}>
                <div className={classes.cart}>
                  <Link href='/cart' style={{textDecoration:'none', color:'inherit'}}>
                    <StyledBadge badgeContent={props.cart.count} color="primary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                  </Link>
                </div>
                 {/* {
                    !props.user.authenticated?
                      <Link href="/connextion" style={{ textDecoration:'none',  float:'right'}}>
                          <Button variant="contained" className={classes.sginup}>Connextion</Button>
                      </Link>
                      :
                      <DropList />
                  } */}
               </Grid>
           </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
        <div style={{ marginTop:'22px', display:'flex', justifyContent:'center'}}>
           <Category />
        </div>
    </AppBar>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  catalog: state.catalog,
  user: state.user,
  cart : state.cart
});
const mapActionsToProps =   {
  getCategories
 };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);