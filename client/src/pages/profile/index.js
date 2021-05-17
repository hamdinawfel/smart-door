import React from 'react';
//M-UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
//M-UI ICONS
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//components
import PhoneDrawer from './components/PhoneDrawer'
//Redux setup
import { connect } from 'react-redux';
import { logoutUser } from '../../feature/auth/action'

const useStyles = makeStyles((theme) => ({
    avatar:{
        color:'#fff',
        float:'right',
        borderColor: '#5590e2',
        textTransform:'lowercase',
        [theme.breakpoints.down('sm')]: {
            display:'none',  
        },
    },
    phoneAvatar:{
        textAlign:'end',
        marginLeft:70,
        marginTop:20,
        [theme.breakpoints.up('md')]: {
            display:'none',  
        },
    }
  }));
 function Profile(props) {
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
  return (
    <div>
      <Chip
        className={classes.avatar}
        avatar={<AccountCircleIcon style={{ color:'#5590e2'}}/>}
        label={props.user.user.name}
        onClick={handleClick}
        variant="outlined"
      />
      <PhoneDrawer className={classes.phoneAvatar}/>
      <Menu
       style={{ marginTop: 45}}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBalanceWalletIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Balence" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mes ordres" />
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </MenuItem>

      </Menu>
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
 )(Profile);
