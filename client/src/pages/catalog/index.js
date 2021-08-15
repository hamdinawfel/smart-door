import React, { useEffect }from 'react';
import { useParams,useLocation } from "react-router-dom";
import clsx from 'clsx';
//M-UI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
//MUI ICONS
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// components
import Skeleton from '../home/components/Skeleton'
//utils
import Navbar from '../../utils/navbar/index'
import Footer from '../../utils/footer/index'
import Chat from '../../utils/Chat'

//redux set up
import { connect } from 'react-redux';
import { getCategories, getShowcaseProducts, getByCategory, getBySubCategory} from './actions'
import Showroom from './components/Showroom';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor:'#FFF',
    paddingBottom:50,
    [theme.breakpoints.down('sm')]: {
    },
  },
  appBar: {
    top :140,
    zIndex:1,
    [theme.breakpoints.down('sm')]: {
    top :80,
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop:2,
    zIndex:0,
    [theme.breakpoints.down('sm')]: {
      display:'none'
    },
  },
  drawerPaper: {
    width: drawerWidth,
    position:'relative',
    
  },
  drawerHeader: {
    marginTop:7,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginTop:0,
      marginBottom:40,

    },
  },
  filterHeader: {
    marginTop:80,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginTop:0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },// 
  categoryIndicator:{
    textTransform:'uppercase',
    fontSize:20,
    [theme.breakpoints.down('sm')]: {
      fontSize:16,
    },
  },
  subCategoryIndicator:{
    textTransform:'uppercase',
    fontSize:18,
    [theme.breakpoints.down('sm')]: {
      fontSize:14,
    },
  },
  closeButton: {
    position: 'absolute',
    left: theme.spacing(1),
    top: 5,
  },
 category:{
    borderTop:'1px solid #eee',
    borderLeft:'1px solid #eee',
    borderBottom:'1px solid #eee',
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderRadius:30,
    margin:'10px 0'
  },
  activeCategory:{
    background: 'linear-gradient(90deg, rgba(232, 36, 48, 0.1) 0%, rgba(255,255,255,0.6923144257703081) 100%)',
    borderTop:'1px solid #eee',
    borderLeft:'1px solid #eee',
    borderBottom:'1px solid #eee',
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderRadius:30,
    margin:'10px 0',
    marginLeft:10,
    transition: '0.5s',
  },
   subCategory:{
    textTransform:'uppercase',
    borderTop:'1px solid #eee',
    borderLeft:'1px solid #eee',
    borderBottom:'1px solid #eee',
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderRadius:30,
    marginBottom:3,
    padding:'0 0 0 5px',
    marginLeft:10,

  },
  activeSubCategory:{
    textTransform:'uppercase',
    background: 'linear-gradient(90deg, rgba(232, 36, 48, 0.1) 0%, rgba(255,255,255,0.6923144257703081) 100%)',
    borderTop:'1px solid #eee',
    borderLeft:'1px solid #eee',
    borderBottom:'1px solid #eee',
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderRadius:30,
    marginBottom:3,
    padding:'0 0 0 5px',
    marginLeft:20,
    transition: '0.5s',
  }, 
  filterBtn:{
    background:theme.palette.primary.main,
    color:'#fff',
    display:'block',
    marginLeft:'auto',
    marginRight:'auto',
    width:'80%',
    bottom:10,
  },
  phoneActiveSubCategory:{
    textTransform:'uppercase',
    background: 'linear-gradient(90deg, rgba(232, 36, 48, 0.1) 0%, rgba(255,255,255,0.6923144257703081) 100%)',
    border:'1px solid #eee',
    margin:'5px 20px',
    width:'80%',
    marginLeft:40,
    borderRadius:30,
    padding:'0 0 0 5px',
    transition: '0.5s',
  }, 
  phoneCategory:{
    margin:'5px 10px',
    borderRadius:30,
    border:'1px solid #eee',
    width:'90%',
    transition:'0.5s'
  },
   phoneActiveCategory:{
    background: 'linear-gradient(90deg, rgba(232, 36, 48, 0.1) 0%, rgba(255,255,255,0.6923144257703081) 100%)',
    border:'1px solid #eee',
    borderRadius:30,
    margin:'5px 30px',
    width:'90%',
    transition:'0.5s'
  },
  phoneSubCategory:{
    textTransform:'uppercase',
    border:'1px solid #eee',
    margin:'5px 20px',
    borderRadius:30,
    width:'80%',
    padding:'0 0 0 5px',
    transition: '0.5s',
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Catalog(props) {
  const classes = useStyles();
  const theme = useTheme();
  let { category } = useParams();
  let query = useLocation();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(true);
  const [openPhoneFilter, setOpenPhoneFilter] = React.useState(false);
  const [ activeCategory, setActiveCategory ] = React.useState('');
  const [ activeSubCategory, setActiveSubCategory ] = React.useState('');
  const [openCategory, setOpenCategory] = React.useState(false);

  
  useEffect(() => {
    if(category === 'showroom'){
      const sort=-1;
      const limit =9;
       props.getShowcaseProducts(sort,limit);
      setActiveCategory('showroom');
    }else if(query.search){
      let subCategory = query.search.split('?subcategory=')[1].replace('-',' ')
      let categorie = category.replace('-',' ')
      props.getBySubCategory(subCategory)
      setActiveCategory(categorie);
      setActiveSubCategory(subCategory);
    }else{
      let categorie = category.replace('-',' ')
      setActiveCategory(categorie);
      props.getByCategory(categorie)
      console.log(categorie)
    }
  }, []);

  
  // const handleClick = (expanded) => {
  //   setOpenCategory(!openCategory);
  //   setExpanded(expanded);
  // };
  
  const handleDrawerOpen = () => {
    setOpen(true);
    setOpenPhoneFilter(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenPhoneFilter(false);
  };
  const handleGetShowcaseProducts = ()=>{
    const sort=1;
    const limit =18;
    props.getShowcaseProducts(sort,limit);
    setActiveCategory('SHOWROOM');
    setActiveSubCategory('');
    window.scrollTo(0, 0);

  }
  
  const handleGetByCategory = (category) =>{
    props.getByCategory(category)
    setActiveCategory(category);
    setActiveSubCategory('');
    window.scrollTo(0, 0);

  }
  const handleGetBySubCategory = (category, subCategory) =>{
    props.getBySubCategory(subCategory)
    setActiveCategory(category);
    setActiveSubCategory(subCategory);
    window.scrollTo(0, 0);
  }
 
  return (
    <React.Fragment>
      <Navbar />
    <div className={classes.root}>
       {/* {!props.products.error === true?null:<Redirect to='/error'/>} */}
      <CssBaseline />
      <AppBar
        position="absolute"
        elevation={0}
        color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <FilterListIcon />
          </IconButton>
          <div style={{display:'flex',alignItems:'center'}}>
            <Typography variant="h6" className={classes.categoryIndicator}>
                {activeCategory}
              </Typography>
           {activeSubCategory !== ''?
            <div style={{display:'flex',alignItems:'center'}}>
              <ChevronRightIcon style={{ verticalAlign:'top'}}/>
              <Typography variant="h6" className={classes.subCategoryIndicator}>
                {activeSubCategory}
              </Typography>
            </div>:null}
          </div>
        </Toolbar>
        <Divider style={{ marginTop: -2}}/>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
         <Typography variant="h6">
            Filtre
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        
        </div>
        <Divider />
          <Typography variant="h6" style={{ margin:'10px 20px'}}>
             Choisir une catégorie
          </Typography>
        <List style={{marginLeft:10 }}>
           { props.catalog.loadingCategories?
              <Skeleton />
           :
           <React.Fragment>
             <ListItem button onClick={handleGetShowcaseProducts} className={activeCategory === 'SHOWROOM'?classes.activeCategory:classes.category}>
                  <ListItemText primary='SHOWROOM' style={{textTransform:'capitalize'}}/>
              </ListItem>
              {props.catalog.categories.map(item =>
              <div key={item._id}>
                <ListItem button className={activeCategory === item.name?classes.activeCategory:classes.category}>
                  <ListItemText primary={item.name} style={{textTransform:'capitalize'}} onClick={()=>handleGetByCategory(item.name)}/>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      {item.subCategories.map(element =>
                        <ListItem 
                          key={element}
                          button className={activeSubCategory === element?classes.activeSubCategory:classes.subCategory}
                          onClick={()=>handleGetBySubCategory(item.name, element)}>
                        <ListItemText secondary={element} style={{textTransform:'uppercase'}}/>
                      </ListItem>
                        )}
                  </List>
                </Collapse>
              </div>)}
          </React.Fragment>}
        </List>
      </Drawer>
      <Dialog
        fullScreen={matches}
        TransitionComponent={Transition}
        open={openPhoneFilter && matches}
        onClose={handleDrawerClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.filterHeader}>
        
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleDrawerClose}>
            <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          filter
          </Typography>
        </div>
        <Divider />
        <Typography variant="h6" style={{ margin:'10px 20px'}}>
             Choisir une catégorie
          </Typography>
        <List style={{marginBottom:100}}>
        { props.catalog.loadingCategories?
              <Skeleton />
           :
           <React.Fragment>
               <ListItem button onClick={handleGetShowcaseProducts} className={activeCategory === 'SHOWROOM'?classes.phoneActiveCategory:classes.phoneCategory}>
                  <ListItemText primary='SHOWROOM' style={{textTransform:'capitalize'}}/>
              </ListItem>
              {props.catalog.categories.map(item =>
              <div key={item._id}>
                <ListItem button className={activeCategory === item.name?classes.phoneActiveCategory:classes.phoneCategory}>
                  <ListItemText primary={item.name} style={{textTransform:'capitalize'}} onClick={()=>handleGetByCategory(item.name)}/>
                  {/* {openCategory && expanded === item._id? <UnfoldLessIcon className={classes.icon} onClick={()=>handleClick(item._id)}/> : <UnfoldMoreIcon className={classes.icon} onClick={()=>handleClick(item._id)}/>} */}
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subCategories.map(element =>
                    <ListItem 
                        key={element}
                        button
                        onClick={()=>handleGetBySubCategory(item.name,element)}
                        className={activeSubCategory === element?classes.phoneActiveSubCategory:classes.phoneSubCategory} >
                      <ListItemText secondary={element}/>
                    </ListItem>
                    )}
                  </List>
                </Collapse>
              </div>)}
           </React.Fragment>}
        </List>
        <div style={{display:'flex', justifyContent:'center',alignItems:'center', background:'#fff', padding:'20px 0 0 0', position:'fixed', bottom:0, width:'100%'}}>
          <Button onClick={()=>setOpenPhoneFilter(false)} className={classes.filterBtn}>Appliquer</Button>
        </div>
      </Dialog>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
         <Showroom />
      </main>
    </div>
    <Chat />
    <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  catalog: state.catalog
 });
 
 const mapActionsToProps =   {
  getCategories,
  getShowcaseProducts,
  getByCategory,
  getBySubCategory
 };
 
 export default connect(
   mapStateToProps,
   mapActionsToProps
 )(Catalog);