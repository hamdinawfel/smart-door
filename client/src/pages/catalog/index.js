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
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Collapse from '@material-ui/core/Collapse';

//MUI ICONS
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import DoneIcon from '@material-ui/icons/Done';
// components
import Skeleton from '../home/components/Skeleton'
//utils
import Navbar from '../../utils/navbar/index'
import Footer from '../../utils/footer/index'
//redux set up
import { connect } from 'react-redux';
import { getCategories, getShowcaseProducts, getByCategory, getBySubCategory} from './actions'
import Showroom from './components/Showroom';

const drawerWidth = 260;

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
  activeCategory:{
    backgroundColor:'#606060',
    color:'#fff'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: 5,
  },
  category:{
    textTransform:'uppercase',
    fontSize:20,
    [theme.breakpoints.down('sm')]: {
      fontSize:12,
    },
  },
  subCategory:{
    textTransform:'uppercase',
    fontSize:18,
    [theme.breakpoints.down('sm')]: {
      fontSize:10,
    },
  }
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
  const [expanded, setExpanded] = React.useState('');

  
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
  const handleGetShowcaseProducts = ()=>{
    const sort=1;
    const limit =18;
    props.getShowcaseProducts(sort,limit);
    setOpenPhoneFilter(false);
    setActiveCategory('SHOWROOM');
    setActiveSubCategory('');
  }
  
  const handleGetByCategory = (category) =>{
    props.getByCategory(category)
    setActiveCategory(category);
    setActiveSubCategory('');
    setOpenPhoneFilter(false);
  }
  const handleGetBySubCategory = (category, subCategory) =>{
    props.getBySubCategory(subCategory)
    setActiveCategory(category);
    setActiveSubCategory(subCategory);
    setOpenPhoneFilter(false);
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
            <Typography variant="h6" className={classes.category}>
                {activeCategory}
              </Typography>
           {activeSubCategory !== ''?
            <div style={{display:'flex',alignItems:'center'}}>
              <ChevronRightIcon style={{ verticalAlign:'top'}}/>
              <Typography variant="h6" className={classes.subCategory}>
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
             Toutes les categories
          </Typography>
        <List>
           { props.catalog.loadingCategories?
              <Skeleton />
           :
           <React.Fragment>
             <ListItem button onClick={handleGetShowcaseProducts}>
                  <ListItemText primary='SHOWROOM' style={{textTransform:'capitalize'}}/>
              </ListItem>
              {props.catalog.categories.map(item =>
              <div key={item._id}>
                <ListItem button >
                  <ListItemText primary={item.name} style={{textTransform:'capitalize'}} onClick={()=>handleGetByCategory(item.name)}/>
                  {openCategory && expanded === item._id? <UnfoldLessIcon className={classes.icon} onClick={()=>handleClick(item._id)}/> : <UnfoldMoreIcon className={classes.icon} onClick={()=>handleClick(item._id)}/>}
                </ListItem>
                <Collapse in={openCategory && expanded === item._id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      {item.subCategories.map(element =>
                      <Chip
                          key={element}
                          onClick={()=>handleGetBySubCategory(item.name, element)}
                          style={{textTransform:'capitalize', margin:'5px', width:'90%'}}
                          label={element}
                          onDelete={()=>console.log('')}
                          deleteIcon={<DoneIcon  style={{ display:element ===activeSubCategory?'flex':'none', float:'right'}}/>}
                          variant="outlined"
                        />)}
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
         <Typography variant="h6">
          filter
          </Typography>
        </div>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleDrawerClose}>
            <ArrowForwardIcon />
        </IconButton>
        
        <Divider />
        <Typography variant="h6" style={{ margin:'10px 20px'}}>
           Toutes les categories
          </Typography>
        <List>
        { props.catalog.loadingCategories?
              <Skeleton />
           :
           <React.Fragment>
               <ListItem button onClick={handleGetShowcaseProducts}>
                  <ListItemText primary='SHOWROOM' style={{textTransform:'capitalize'}}/>
              </ListItem>
              {props.catalog.categories.map(item =>
              <div key={item._id}>
                <ListItem button >
                  <ListItemText primary={item.name} style={{textTransform:'capitalize'}} onClick={()=>handleGetByCategory(item.name)}/>
                  {openCategory && expanded === item._id? <UnfoldLessIcon className={classes.icon} onClick={()=>handleClick(item._id)}/> : <UnfoldMoreIcon className={classes.icon} onClick={()=>handleClick(item._id)}/>}
                </ListItem>
                <Collapse in={openCategory && expanded === item._id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subCategories.map(element =>
                      <Chip
                      key={element}
                      clickable
                      onClick={()=>handleGetBySubCategory(item.name, element)}
                      style={{textTransform:'capitalize', margin:'5px', width:'90%'}}
                      label={element}
                      onDelete={()=>console.log('')}
                      deleteIcon={<DoneIcon  style={{ display:element ===activeSubCategory?'flex':'none', float:'right'}}/>}
                      variant="outlined"
                    />)}
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
         <Showroom />
      </main>
    </div>
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