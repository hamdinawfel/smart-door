import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//list
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';


import Divider from '@material-ui/core/Divider';

//icon
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
//assets
import logo from '../assets/logo.jpg'

//redux

import { connect } from 'react-redux';
import { getCategories, getCatalog } from '../../../pages/catalog/actions';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250
  },
  root: {
    width: 250,
    maxWidth: 360,
    backgroundColor: '#2E3141',
  },
  nested: {
    paddingLeft: theme.spacing(4),
    textTransform:'capitalize',
    color:'#F67E61'
  },
  title:{
   paddingLeft:20,
   fontSize: 15,
   fontWeight:600,
  },
  closeIcon: {
    margin:'17px 10px 10px 10px',
    color:'rgba(255,255,255,0.5)',
    float:'right',
    '&:hover': {
      color: fade('#f44336', 1),
    },
  },
  hover: {
    color: theme.palette.primary.main,
    textTransform:'capitalize'
  },
  menuIcon:{
    cursor:'pointer',
    // margin:'0 15px',
    color:theme.palette.primary.dark,
    '&:hover': {
    },
    display:'none',
    [theme.breakpoints.down('sm')]: {
        display:'flex',
      },
  },
  paper:{
    backgroundColor:'#2E3141',
  },
  icon:{
    color: '#5590e2'
  }
}));

function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState('');

  const handleClick = (expanded) => {
    setOpen(!open);
    setExpanded(expanded);
  };

  // const handleFilterBySubCategorie = (tag) =>{
  //   props.getCatalog(tag)
  //   setOpenPhoneFilter(false);
  // }

  let history = useHistory();

 const handleNavigateToLogin = ()=>{
    history.push('/login');
    props.close();
  };

 const handleNavigateToSignup = ()=>{
    history.push('/signup');
    props.close();
  };

  const handleNavigateToHome = ()=>{
    history.push('/');
    props.close();
  };
  const handleNavigateToCatalog = ()=>{
    history.push('/catalog/all');
    props.close();
  };
  const handleNavigateToCollecte = ()=>{
    history.push('/collecte');
    props.close();
  };
  return (
    <List
      component="nav"
      aria-labelledby=""
      subheader={
        <div>
          <CloseIcon  className={classes.closeIcon} onClick={props.close} />
          <img src={logo} style={{ width: 150, margin:'10px 0 8px 10px'}} alt="mamogamers"/>
    
           <Divider style={{ backgroundColor: '#5590e2', boxShadow: '0 0 5px #5590e2, 0 0 20px #5590e2, 0 0 60px #5590e2' }} />
        </div>
      }
      className={classes.root} > 
      {props.categories.map(item =>
        <div key={item._id}>
          <ListItem button onClick={()=>handleClick(item._id)}>
            <ListItemText primary={item.name} className={classes.hover}/>
            {open && expanded === item._id? <UnfoldLessIcon className={classes.icon}/> : <UnfoldMoreIcon className={classes.icon} />}
           </ListItem>
           <Collapse in={open && expanded === item._id} timeout="auto" unmountOnExit>
             <List component="div" disablePadding style={{ backgroundColor:'rgba(246, 126, 97, 0.1)'}}>
               {item.subCategories.map(item =>
                <ListItem key={item} button className={classes.nested}>
                <ListItemText primary={item}/>
              </ListItem>)}
             </List>
      </Collapse>
        </div>)}
    </List>
  );
}
function PhoneNavbar(props) {
  const classes = useStyles();

const [open, setOpen] = React.useState(false)
  const toggleDrawer  = (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open)
  };
const handleClose = () => {
  setOpen(false)
}
useEffect(() => {
  props.getCategories()
}, []);

return (
    <div  >
      <React.Fragment>
       <IconButton>
         {/* <MenuIcon  onClick={toggleDrawer} className={classes.menuIcon}/> */}
         <MenuIcon  className={classes.menuIcon}/>
       </IconButton>
        <Drawer
              classes={{ paper: classes.paper }}
              anchor='left'
              open={open}
              onClose={handleClose}
            >
               {props.catalog.loadingCategories?
                null
                :
                <React.Fragment>
                  <NestedList close={handleClose} categories={props.catalog.categories} />
                </React.Fragment>}
            </Drawer>
        </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  catalog: state.catalog
 });
 const mapActionsToProps =   {
  getCategories,
  getCatalog
 };
 export default connect(
   mapStateToProps,
   mapActionsToProps
 )(PhoneNavbar);
