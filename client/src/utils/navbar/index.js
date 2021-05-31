import React from 'react';
import { useHistory } from "react-router-dom";
//M-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { fade, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Skeleton from '@material-ui/lab/Skeleton';
 //M-UI icon
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
 //Components
import PhoneNavbar from './components/PhoneNavbar'
import PhoneSearch from './components/PhoneSearch'
import Category from './components/Category'
import Profile from '../../pages/profile/index'

 //logo
import logo from './assets/logo.jpg'
//Redux
import { connect } from 'react-redux';
import { search } from '../../pages/catalog/actions';
//
const useStyles = makeStyles((theme) => ({
  hideAppBar: {
    zIndex: 2,
    backgroundColor:theme.palette.primary.white,
    userSelect:'none',
    padding:'3px 80px 0 80px',
    [theme.breakpoints.down('sm')]: {
      padding:'3px 10px 0 10px',
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
    },
  },
 sginup:{
    color: '#fff',
    float:'right',
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
    [theme.breakpoints.down('xs')]: {
      marginTop:10,
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
 //search
 search: {
  position: 'relative',
  marginTop:15,
  borderRadius: 0,
  backgroundColor: fade('#000', 0.3),
  '&:hover': {
    backgroundColor:'#fff',
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
  marginTop:5,
  float:'right',
  cursor:'pointer',
  '&:hover': {
    color: fade('#000', 0.6),
  },
},
searchResultBox:{
  minWidth: 300,
  marginTop:25,
   zIndex:4
},
inputRoot: {
  color: 'inherit',
},
inputInput: {
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '12ch',
    '&:focus': {
      width: '20ch',
    },
  },
},
searchResult:{
  [theme.breakpoints.down('sm')]: {
    display:'none',
  },
},
searchResultItem:{
  padding:15,
  borderBottom:'1px solid #eee',
  width:360, 
  cursor:'pointer',
  transition:'0.5s',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.1)',
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
  //START SERCH SETUP
  const [searchText, setSearchText] =  React.useState('');
  const handleSerch = (event) => {
    if(searchText !== ''){
      props.search(searchText);
      setAnchorEl(event.currentTarget);
    }
  }
 
 

 const [anchorEl, setAnchorEl] = React.useState(null);

 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
   setSearchText('')
 };

 const open = Boolean(anchorEl);
 const id = open ? 'simple-popover' : undefined;

  //NAVIGATION
  let history = useHistory();

  const handleNavigateToCart = ()=>{ //FIXME:
    history.push('/cart')
  };

  const handleNavigateToHome = ()=>{
    history.push('/')
  };

  const handleNavigateToCatalog = ()=>{ //FIXME:
    history.push('/catalog/all')
  };

  const handleNavigateToAuth= ()=>{
    history.push('/connextion')
  };
  

  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar  color="default" elevation={0}  className={classes.hideAppBar}>
          <Toolbar>
          <Grid container style={{ marginTop: -4}}>
               <Grid item xs={4} sm={4} className="logo">
                  <img src={logo} alt="Dinari" style={{width:70, cursor:'pointer'}} onClick={handleNavigateToHome}/>
                  <h3  onClick={handleNavigateToHome}>Dinari</h3>
               </Grid>
               <Grid item sm={4}>
               <div className={classes.search}>
                    <InputBase
                      placeholder="Recherche"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      value={searchText}
                     onChange={(e)=>setSearchText(e.target.value)}
                      inputProps={{ 'aria-label': 'Recherche' }}
                    />
                    <div className={classes.searchIcon}>
                      <Tooltip title="Recherche" placement="left">
                          <SearchIcon 
                         aria-describedby={id}
                          onClick={handleSerch}
                          />
                    </Tooltip>
                    <Popover
                        style={{marginLeft:30, marginTop:22}}
                        className={classes.searchResult}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                       <div >
                         {props.catalog.loadingSearch?
                         <div>
                           {[1,2,3].map(item =>
                            <Grid container key={item} style={{width:380, padding:20}}>
                              <Grid item xs={2}>
                                  <Skeleton variant="circle" width={40} height={40} />
                              </Grid>
                              <Grid item xs={10}>
                                  <Skeleton variant="text" />
                                  <Skeleton variant="text" />
                              </Grid>
                         </Grid>)}
                         </div>
                         :
                         <div>
                            <div style={{ position:'fixed', top:'60px' , marginBottom:10 , display:anchorEl ===null?'none': 'block'}}>
                              <IconButton onClick={handleClose}>
                                <CloseIcon  />
                              </IconButton>
                            </div>
                            <div>
                              {props.catalog.searchData.length === 0?
                              <div style={{padding:20, width:380}}>
                                 <h2 style={{fontSize:18, marginTop:20, fontWeight:300, textAlign:'center'}}>Aucun résultat trouvé</h2>
                                 <h2 style={{fontSize:18, marginTop:20, fontWeight:600, textAlign:'center'}}>Essayer autre mots</h2>
                            </div>
                              :
                              <div>
                                  {props.catalog.searchData.map(item => 
                                        <div key={item._id}>
                                            <Grid container className={classes.searchResultItem}>
                                              <Grid item xs={4}>
                                                <img src={item.imageUrl} alt={item.title} style={{width:'80%', marginLeft:20}}/>
                                              </Grid>
                                              <Grid item xs={8}style={{paddingLeft:10, marginTop:5}}>
                                                <h2 style={{fontSize:18, fontWeight:600}}>{item.title}</h2>
                                                <p style={{fontSize:15, fontWeight:300}}>{item.description.slice(0, 27)}...</p>
                                              </Grid>
                                              
                                            </Grid>
                                        </div>)}
                              </div>
                              
                              }
                            </div>
                        </div>}
                       </div>
                          
                      </Popover>
                    </div>
                 </div>
               </Grid>
               <Grid item xs={8} sm={4}>
                 {
                    !props.user.authenticated? 
                      <React.Fragment>
                          <Button variant="contained" onClick={handleNavigateToAuth} className={classes.sginup}>Connextion</Button>
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
          <PhoneNavbar />
          <PhoneSearch />
        </div>
         {/* end phone category bar */}
           <Category />
    </AppBar>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  catalog: state.catalog,
  user: state.user
});
const mapActionsToProps =   {
  search
 };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);