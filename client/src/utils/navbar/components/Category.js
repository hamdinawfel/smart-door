import React from 'react'
import { useHistory } from "react-router-dom";
//Mui
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, fade } from '@material-ui/core/styles';

//Redux
import { connect } from 'react-redux';
import { getBySubCategory } from '../../../pages/catalog/actions';
const useStyles = makeStyles((theme) => ({
    root: {
        height:65,
        marginTop:-20,
        margin:'0 auto',
        justifyContent:'cenetr',
        alignItems:'center',
        textAlign:'center',
        display:'flex',
        [theme.breakpoints.down('sm')]: {
          display:'none',
        },
    },
    item:{
        fontSize:'1rem',
        fontWeight:500,
        margin:20,
    },
    button:{
        textTransform:'uppercase',
        borderRadius:0,
        fontSize:15,
        fontWeight:300,
        margin:'0 10px',
        background: `rgba(232, 36, 48, 0.1)`,
        color: '#000',
        minWidth:200,
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, 0.25),
        },
    },
    menuList:{
      minWidth:200,
      background:theme.palette.primary.main,
      marginTop:12,
      color:'#fff', 
      textTransform:'uppercase',
      paddingTop:0,
      paddingBlock:0
    }
  }));
  function ItemCard(props) {
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
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
    return (
      <div>
        <div>
          <Button
            className={classes.button}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {props.name}
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:2}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.menuList}>
                      {props.subCategories.map(item =><React.Fragment>
                        <MenuItem key={item} onClick={(e) => { props.handleFilterBySubCategory(props.name, item); handleClose(e);}}>{item}</MenuItem>
                        {item !== props.subCategories[props.subCategories.length-1] ?<Divider style={{ background:"#fff"}}/>:null}
                      </React.Fragment>)}
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
function Category(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleFilterBySubCategory = (category, subCategory) =>{
    if(history.location.pathname.includes('/catalog/')){
     props.getBySubCategory(subCategory)
    }else{
      let url = `/catalog/${category.replace(/ /g, '-')}?subcategory=${subCategory.replace(/ /g, '-')}`
      history.push(url)
    }
 }
    return (
        <div className={classes.root}>
           {props.catalog.loadingCategories?
           null
          :
          <React.Fragment>
            {props.catalog.categories.map(item =>
               <ItemCard 
                  key={item._id}
                  name={item.name} 
                  subCategories={item.subCategories}
                  handleFilterBySubCategory={handleFilterBySubCategory}/>)}
          </React.Fragment>}
        </div>
    )
}
const mapStateToProps = (state) => ({
    catalog: state.catalog,
  });
  const mapActionsToProps =   {
    getBySubCategory
   };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Category);