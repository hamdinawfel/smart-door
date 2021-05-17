import React from 'react';
import { useHistory } from "react-router-dom";
//M-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { fade, makeStyles } from '@material-ui/core/styles';
 //M-UI icon
import SearchIcon from '@material-ui/icons/Search';
 //Components
import MobileNavbar from './components/MobileNavbar'
import Category from './components/Category'
import Profile from '../../pages/profile/index'

 //logo
import logo from './assets/mamogamers.png'
//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../feature/auth/action';


//
const useStyles = makeStyles((theme) => ({
  hideAppBar: {
    zIndex: 2,
    backgroundColor:theme.palette.primary.main,
    userSelect:'none',
    padding:'3px 80px 0 80px',
    [theme.breakpoints.down('sm')]: {
      padding:'3px 10px 0 10px',
    },
  },
  appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: 3,
    backgroundColor:'#fff',
    userSelect:'none',
    padding:'0 100px',
    boxShadow: '0px 0px 8px rgba(91, 137, 158, 0.3)',
    // [theme.breakpoints.down('md')]: {
    //   padding:'0 10px',
    // },
    [theme.breakpoints.down('sm')]: {
      padding:'10px',
    },
  },
 sginup:{
    color: '#fff',
    marginLeft:10,
    backgroundColor: '#31A8FF',
     letterSpacing:0.8,
     textTransform:'capitalize',
    transition: '0.5s',
    boxShadow: '0 0 5px #57AAB4,  0 0 25px #57AAB4,  0 0 25px #57AAB4, 0 0 25px #03e9f4',
    '&:hover': {
     backgroundColor: '#fff',
     color: '#31A8FF'
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
 logo:{
  width:150,
  [theme.breakpoints.down('sm')]: {
    width:120,
  },
 },
 //search
 search: {
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: fade(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    display:'none',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
},
searchIcon: {
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
inputRoot: {
  color: 'inherit',
},
inputInput: {
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '12ch',
    '&:focus': {
      width: '20ch',
    },
  },
},
phoneSearchIcon:{
  float:'right',
  [theme.breakpoints.up('md')]: {
    display:'none',
  },
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const handleLogOut = () => {
    props.logoutUser();
    setAnchorEl(null);
  }
  //
  let history = useHistory();

  const handleNavigateToCart = ()=>{
    history.push('/cart')
  };

  const handleNavigateToHome = ()=>{
    history.push('/')
  };

  const handleNavigateToCatalog = ()=>{
    history.push('/catalog/all')
  };

  const handleNavigateToCollecte = ()=>{
    history.push('/collecte')
  };
  const handleNavigateToLogin= ()=>{
    history.push('/login')
    setAnchorEl(null);

  };
  const handleNavigateToSignup = ()=>{
    history.push('/signup')
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <HideOnScroll {...props}>
        <AppBar  color="default" elevation={0}  className={classes.hideAppBar}>
          <Toolbar>
          <Grid container style={{ marginTop: -4}}>
               {/* <Grid item xs={4} sm={4}>
                  <img src={logo} alt='MamoGamers' className={classes.logo}/>
               </Grid> */}
               <Grid item xs={4} sm={4} className="fake-logo">
                  <h3>Company<span>logo</span></h3>
               </Grid>
               <Grid item xs={0} sm={4}>
                 <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                    />
                 </div>
               </Grid>
               <Grid item xs={8} sm={4}>
                 {
                    !props.user.authenticated? 
                      <React.Fragment>
                        <Link href="auth" style={{textDecoration:'none', float:'right'}}>
                          <Button variant="contained" className={classes.sginup}>Connextion</Button>
                        </Link> 
                      </React.Fragment>
                      :
                      <Profile />
                  }
               </Grid>
           </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
        {/* start phone category bar */}
        <div style={{ display :'flex', justifyContent:'space-between'}}>
          <MobileNavbar />
          <IconButton >
              <SearchIcon className={classes.phoneSearchIcon}/>
          </IconButton>
        </div>
         {/* end phone category bar */}
           <Category />
    </AppBar>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  products: state.products,
  user: state.user
});
const mapActionsToProps =   {
  logoutUser
 };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);