import React , { useState, useEffect } from 'react';
// //M-UI
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
//M-UI ICONS
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// //components
import PhoneDrawer from './PhoneDrawer'
import logo from '../../../utils/navbar/assets/logo.jpg'
// //Redux setup
import { connect } from 'react-redux';
import { logoutUser } from '../../../feature/auth/action'

const useStyles = makeStyles((theme) => ({
    dropList:{
      minWidth:200,
      background:theme.palette.primary.main,
      marginTop:18,
      color:'#fff',
      textTransform:'uppercase',
      paddingTop:0, 
      paddingBlock:0,
    },
    divider:{
      backgroundColor: '#fff', 
    },
    avatar:{
      color:'#fff',
      float:'right',
      background: theme.palette.primary.main,
      marginTop:12,
      textTransform:'uppercase',
    //   [theme.breakpoints.down('sm')]: {
    //       display:'none',  
    //   },
  },
  phoneAvatar:{
      textAlign:'end',
      marginLeft:70,
      [theme.breakpoints.up('md')]: {
          display:'none',  
      },
  },
  link:{
    textDecoration:'none',
    color:'inherit',
    cursor:'pointer',
    display:'flex',
    alignItems:'center'
  }
  }));
  
  function DropList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
   const handleLogout = () => {
     props.logoutUser()
   }
   
    return (
      <div>
        <div>
        <Avatar
            className={classes.avatar}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
              {/* {props.user.user.name[0]}  */} j
          </Avatar>
        {/* <PhoneDrawer className={classes.phoneAvatar}/> */}
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex:2}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.dropList}>
                      <MenuItem  style={{ background:'#fff', display:'block',padding:'40px 0'}}>
                         <Link href='/profile/controle-panel' style={{ textDecoration:'none', cursor:'pointer'}}>
                            <img src={logo} style={{width:30, display:'block', margin:'auto'}} alt="mamogamers"/>
                            <p style={{fontSize:15, fontWeight:600,textAlign:'center', color:'#000',marginTop:10 }} >{props.user.user.name}</p>
                            <p style={{ fontSize:12,fontWeight:300, textAlign:'center',color:'#000', textTransform:'lowercase', marginTop:10 }} >{props.user.user.email}</p>
                         </Link>
                    </MenuItem>
                      <MenuItem onClick={handleClose} className={classes.item}>
                        <Link href='/profile/controle-panel' className={classes.link} style={{ textDecoration:'none'}}>
                          <ListItemIcon>
                            <AccountBoxIcon fontSize="small" style={{color:'#fff'}}/>
                          </ListItemIcon>
                          <ListItemText primary="Mon Profil" />
                        </Link>
                    </MenuItem>
                    <Divider className={classes.divider}/>
                      <MenuItem onClick={handleClose} className={classes.item}>
                      <Link href='/profile/orders' className={classes.link} style={{ textDecoration:'none'}}>
                        <ListItemIcon>
                          <ShoppingCartIcon fontSize="small" style={{color:'#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Mes commandes" />
                      </Link>
                    </MenuItem>
                    <Divider className={classes.divider}/>
                    <MenuItem onClick={handleClose} className={classes.item}>
                      <Link href='/profile/settings' className={classes.link} style={{ textDecoration:'none'}}>
                        <ListItemIcon>
                          <SettingsIcon fontSize="small" style={{color:'#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Paramètres" />
                      </Link>
                    </MenuItem>
                    <Divider className={classes.divider}/>
                      <MenuItem onClick={handleClose} className={classes.item} onClick={handleLogout}>
                        <ListItemIcon>
                          <LockIcon fontSize="small" style={{color:'#fff'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Se déconnecter" />
                    </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }

  const mapStateToProps = (state) => ({
    user: state.user,
  });
  const mapActionsToProps =   {
    logoutUser
   };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(DropList);

