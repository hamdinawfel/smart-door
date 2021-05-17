import React from 'react';
import { useHistory } from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//list
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
//icon
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LockIcon from '@material-ui/icons/Lock';
import ListAltIcon from '@material-ui/icons/ListAlt';
//redux
import { connect } from 'react-redux';
import { logoutUser } from '../../../feature/auth/action'
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250
  },
  root: {
    width: 250,
    maxWidth: 360,
    // backgroundColor: ,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title:{
   paddingLeft:20,
   fontSize: 15,
   fontWeight:600,
  },
  closeIcon: {
    position:'absolute',
    right:0,
    float:'right',
    margin:'15px 10px 10px 10px',
    color:'rgba(255,255,255,0.5)',
    '&:hover': {
      color: fade('#f44336', 1),
    }
  },
  hover: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  avatar:{
    color:'#fff',
    float:'right',
    borderColor: '#5590e2',
    textTransform:'lowercase',
    [theme.breakpoints.up('md')]: {
        display:'none',  
    },
},
  acountIcon:{
    '&:hover': {
    color:theme.palette.primary.main,
    },
    display:'none',
    [theme.breakpoints.down('sm')]: {
        display:'flex',
        cursor:'pointer',
        position:'absolute',
        right:20,
        top:25,
      },
  },
  paper:{
    backgroundColor:'#2E3141',
  },
  icon:{
    color: '#f67e61',
    // boxShadow: '0 0 5px #f67e61, 0 0 20px #f67e61, 0 0 60px #f67e61'
  },
  item:{
    color:theme.palette.primary.main
  }
}));

function NestedList(props) {
  const classes = useStyles();
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <List
      component="nav"
      aria-labelledby=""
      subheader={
        <div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'15px 0'}}>
                <Chip
                       className={classes.avatar}
                        avatar={<AccountCircleIcon style={{ color:'#1DA1F2'}}/>}
                        label={props.name}
                        onClick={handleClick}
                        variant="outlined"
                    />
                <CloseIcon  className={classes.closeIcon} onClick={props.close} />
            </div>
            <Divider style={{ backgroundColor: '#5590e2', boxShadow: '0 0 5px #5590e2, 0 0 20px #5590e2, 0 0 60px #5590e2'}}/>
        </div>
      }
      className={classes.root} > 
         <MenuItem >
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Profile" className={classes.item}/>
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <AccountBalanceWalletIcon fontSize="small" className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Balence" className={classes.item} />
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <ListAltIcon fontSize="small" className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Mes orders" className={classes.item}/>
        </MenuItem>
        <MenuItem onClick={props.handleLogOut}>
          <ListItemIcon>
            <LockIcon fontSize="small" className={classes.icon}/>
          </ListItemIcon>
          <ListItemText primary="Déconnexion" className={classes.item}/>
        </MenuItem>
    </List>
  );
}
function PhoneDrawer(props) {
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

const handleLogOut = () => {
  props.logoutUser()
}
return (
    <div  >
      <React.Fragment>
          <Chip
            className={classes.avatar}
              avatar={<AccountCircleIcon style={{ color:'#5590e2'}}/>}
              label={props.user.user.name} 
              onClick={toggleDrawer}
              variant="outlined"
            />
        <Drawer
              classes={{ paper: classes.paper }}
              anchor='right'
              open={open}
              onClose={handleClose}
            >
              <NestedList 
                 close={handleClose}
                 authenticated={!props.user.authenticated}
                 handleLogOut={handleLogOut}
                 name={props.user.user.name}
                 />
            </Drawer>
        </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
 });
 const mapActionsToProps =   {
  logoutUser
 };
 export default connect(
   mapStateToProps,
   mapActionsToProps
 )(PhoneDrawer);
