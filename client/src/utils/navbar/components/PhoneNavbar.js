import React from 'react';
//Mui
import { fade, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
//icon
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/fontawesome-free-brands';
import {faGoogle} from '@fortawesome/fontawesome-free-brands';
import {faYoutube} from '@fortawesome/fontawesome-free-brands';
import PhoneIcon from '@material-ui/icons/Phone';
//assets
import logo from '../assets/logo.jpg'
//redux
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250
  },
  root: {
    width: 250,
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    textTransform:'uppercase',
    color:'#000',
    border:'1px solid #fff'
  },
  title:{
   paddingLeft:20,
   fontSize: 15,
   fontWeight:600,
  },
  closeIcon: {
    // margin:'17px 10px 10px 10px',
    position:'absolute',
    top:20,
    right:20,
    color:'rgba(0,0,0,0.5)',
    float:'right',
    '&:hover': {
      color: fade('#f44336', 1),
    },
  },
  hover: {
    color: 'rgba(0,0,0,0.8)',
    textTransform:'capitalize'
  },
  menuIcon:{
    cursor:'pointer',
    color:theme.palette.primary.dark,
    '&:hover': {
    },
    display:'none',
    [theme.breakpoints.down('sm')]: {
        display:'flex',
      },
  },
  paper:{
    backgroundColor:'#fff',
  },
 icon:{
   fontSize:18,
   margin:'0 8px',
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
 }
}));
  
function PhoneNavbar(props) {
  const classes = useStyles();
  const [openList, setOpenList] = React.useState(false);
  const [expanded, setExpanded] = React.useState('');

  const handleClick = (expanded) => {
    setOpenList(!openList);
    setExpanded(expanded);
  };

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

return (
    <div  >
      <React.Fragment>
       <IconButton style={{margin:'10px 0 0 0'}} onClick={toggleDrawer}>
         <MenuIcon  className={classes.menuIcon}/>
       </IconButton>
        <Drawer
              classes={{ paper: classes.paper }}
              anchor='left'
              open={open}
              onClose={handleClose}
            >
               <List
                  component="nav"
                  aria-labelledby=""
                  subheader={
                    <div>
                      <div style={{display:'flex', justifyContent:'start', alignItems:'center', background:'#EBEAF0', boxShadow: '0px 0px 8px rgba(91, 137, 158, 0.7)'}}>
                      <Link href="/"style={{textDecoration:'none', display:'flex', alignItems:'center'}}>
                        <img src={logo} style={{ width: 50, margin:'10px 0 8px 10px'}} alt="Dinari"/>
                        <h3 style={{color:'#E82430', marginLeft:20, fontWeight:900}}>Dinari</h3>
                      </Link>
                      <Divider style={{ backgroundColor: '#fff', }} />
                    </div>
                      <CloseIcon  className={classes.closeIcon} onClick={handleClose} />
                    </div>
                  }
                  className={classes.root}> 
                  <div style={{display:'flex', justifyContent:'center', marginTop:20}}>
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
                      <span>
                      <PhoneIcon style={{fontSize:20, margin:'0 8px'}}/>
                        </span>
                        <span className={classes.phoneNumber}>
                          22 550 675
                        </span>
                   </div>
                     {props.catalog.loadingCategories?
                      null
                      :
                      <div>
                      {props.catalog.categories.map(item =><div key={item._id} style={{marginTop:10}}>
                            <ListItem button onClick={()=>handleClick(item._id)}>
                              <ListItemText primary={item.name} className={classes.hover}/>
                              {open && expanded === item._id? <UnfoldLessIcon className={classes.icon}/> : <UnfoldMoreIcon className={classes.icon} />}
                            </ListItem>
                            <Collapse in={open && expanded === item._id} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding style={{ backgroundColor:'rgba(246, 126, 97, 0.1)'}}>
                                {item.subCategories.map(ele =>
                                  <Link href={`/catalog/${item.name.replace(/ /g, '-')}?subcategory=${ele.replace(/ /g, '-')}`} style={{textDecoration:'none'}}>
                                     <ListItem key={ele} button className={classes.nested}>
                                        <ListItemText primary={ele}/>
                                      </ListItem>
                                  </Link>
                                  )}
                              </List>
                        </Collapse>
                          </div>)}
                      </div>}
                </List>
            </Drawer>
        </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  catalog: state.catalog
 });

 export default connect(
   mapStateToProps,
   null
 )(PhoneNavbar);
