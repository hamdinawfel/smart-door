import React, { useEffect }from 'react';
import { useParams, Redirect } from "react-router-dom";
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
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Pagination from '@material-ui/lab/Pagination';
import Collapse from '@material-ui/core/Collapse';

//MUI ICONS
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
// components
import Catalog from './components/Catalog'
import Skeleton from '../home/components/Skeleton'
//utils
import Navbar from '../../utils/navbar/index'
//redux set up
import { connect } from 'react-redux';
// import { getProducts, getCountedCategory, getAllByPrice, getByCategory, changePage} from './actions'
import { getCategories, getCatalog} from './actions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor:'#FFF',
    paddingBottom:50
  },
  appBar: {
    top :140,
    zIndex:1,
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
    marginTop:-2,
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
  activeCategory:{
    backgroundColor:'#606060',
    color:'#fff'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: 5,
    // color: theme.palette.secondary.light,
  }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function HomeCatalog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
   
  const [open, setOpen] = React.useState(true);
  const [openPhoneFilter, setOpenPhoneFilter] = React.useState(false);
  const [ activeSort, setActiveSort ] = React.useState('');
  const [ activeCategory, setActiveCategory ] = React.useState('all');
//
  const [openCategory, setOpenCategory] = React.useState(false);
  const [expanded, setExpanded] = React.useState('');

  useEffect(() => {
    props.getCategories();
  }, []);

  const handleClick = (expanded) => {
    setOpenCategory(!openCategory);
    setExpanded(expanded);
  };
  
  const handleDrawerOpen = () => {
    setOpen(true);
    setOpenPhoneFilter(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenPhoneFilter(false);
  };
  const handleFilterBySubCategorie = (tag) =>{
    props.getCatalog(tag)
    setOpenPhoneFilter(false);
  }
let { category } = useParams();
 
  // useEffect(() => {
  //   props.getCountedCategory();
  //   if(category !== "all"){
  //     handleCategoryFilter(category)
  //   }else{
  //     props.getProducts(props.products.page)
  //   }
  // }, []);
 
  const handleSortByDescPrice = () =>{
    const category = activeCategory;
    props.getAllByPrice(-1, category);
    setActiveSort('high')
  }
  const handleSortByAscPrice = () =>{
    const category = activeCategory;
    // props.getAllByPrice(1, category);
    setActiveSort('low')
  }
  // const handleCategoryFilter = (category) =>{
  //   // props.getByCategory(category)
  //   setActiveCategory(category);
  //   setActiveSort('')
  // }
  
  const handleGetProduts = () => {
    // props.getProducts(0); //FIXME:
    setActiveCategory('all');
    setActiveSort('');
  }
 //PAGINATION
  const handleChangePage = (event, page) => {
    window.scrollTo(0, 300);
    // props.changePage(page);
    // props.getProducts(page)
    
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
        // className={classes.catalogNavigation}
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
            <ArrowBackIcon />
          </IconButton>
          {activeCategory ==='all'? 
            <Typography variant="h6" >
              All Products
            </Typography>
            :
            <Typography variant="h6" >
              {activeCategory}
            </Typography>
          }
          {/* <Chip variant="outlined" size="small" label="50" className={classes.chipPhone}/> */}
        </Toolbar>
        <Divider style={{ marginTop: -2}}/>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
         <Typography variant="h6">
           Filter
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        
        </div>
        <Divider />
          <Typography variant="h6" style={{ margin:'10px 20px'}}>
             All Categories
          </Typography>
        <List>
           { props.catalog.loadingCategories?
              <Skeleton />
           :
           <React.Fragment>
             <ListItem button onClick={()=>handleFilterBySubCategorie('best selling')}>
                  <ListItemText primary='Best Selling' style={{textTransform:'capitalize'}}/>
              </ListItem>
              {props.catalog.categories.map(item =>
              <div key={item._id}>
                <ListItem button onClick={()=>handleClick(item._id)}>
                  <ListItemText primary={item.name} style={{textTransform:'capitalize'}}/>
                  {openCategory && expanded === item._id? <UnfoldLessIcon className={classes.icon}/> : <UnfoldMoreIcon className={classes.icon} />}
                </ListItem>
                <Collapse in={openCategory && expanded === item._id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding style={{ backgroundColor:'rgba(0, 0, 0, 0.1)'}}>
                    {item.subCategories.map(item =>
                      <ListItem key={item} button style={{textTransform:'capitalize'}} onClick={()=>handleFilterBySubCategorie(item)}>
                      <ListItemText primary={item}/>
                    </ListItem>)}
                  </List>
                </Collapse>
              </div>)}
              {/* { props.products.countedCategoryList.length !== 0?
              <div>
                 { props.products.countedCategoryList.map((category)=>
                  <ListItem key={category._id} button onClick={()=>handleCategoryFilter(category._id)}>
                    <ListItemText primary={category._id} />
                    <Chip variant="outlined" size="small" label={category.count} className={activeCategory === category._id ?classes.activeCategory:null}/>
                  </ListItem>) }
              </div>: null} */}
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
        {/* <DialogTitle id="responsive-dialog-title">{"Estimer votre collecte en 3 click"}</DialogTitle> */}
        <div className={classes.filterHeader}>
         <Typography variant="h6">
          filter
          </Typography>
        </div>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleDrawerClose}>
            <ArrowForwardIcon />
        </IconButton>
        
        <Divider />
        <Typography variant="h6" style={{ margin:'10px 20px'}}>
           All Categories
          </Typography>
        <List>
        { props.catalog.loadingCategories?
              <Skeleton />
           :
           <React.Fragment>
               <ListItem button onClick={()=>handleFilterBySubCategorie('best selling')}>
                  <ListItemText primary='Best Selling' style={{textTransform:'capitalize'}}/>
              </ListItem>
              {props.catalog.categories.map(item =>
              <div key={item._id}>
                <ListItem button onClick={()=>handleClick(item._id)}>
                  <ListItemText primary={item.name} style={{textTransform:'capitalize'}}/>
                  {openCategory && expanded === item._id? <UnfoldLessIcon className={classes.icon}/> : <UnfoldMoreIcon className={classes.icon} />}
                </ListItem>
                <Collapse in={openCategory && expanded === item._id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding style={{ backgroundColor:'rgba(0, 0, 0, 0.1)'}}>
                    {item.subCategories.map(item =>
                      <ListItem key={item} button onClick={()=>handleFilterBySubCategorie(item)} style={{textTransform:'capitalize'}}>
                      <ListItemText primary={item}/>
                    </ListItem>)}
                  </List>
                </Collapse>
              </div>)}
           </React.Fragment>}
        </List>
      </Dialog>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
         <Catalog />
         {/* PAGINATION */}
         {/* { activeCategory === 'all'?
          <div  style={{ display:'flex', justifyContent: 'center', textAlign:' center', margin: '50px auto', width:'100%'}}>
            {props.products.productsCount/12 > 1?<Pagination count={Math.trunc(props.products.productsCount/12)+1} page={props.products.page} onChange={handleChangePage} variant="outlined" color="primary"/>: null}
          </div>
          :
           null } */}
      </main>
    </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  catalog: state.catalog
 });
 
 const mapActionsToProps =   {
  getCategories,
  getCatalog,
  // getCountedCategory,
  // changePage
 };
 
 export default connect(
   mapStateToProps,
   mapActionsToProps
 )(HomeCatalog);