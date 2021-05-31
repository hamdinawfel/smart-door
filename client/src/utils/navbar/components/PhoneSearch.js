import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Skeleton from '@material-ui/lab/Skeleton';

//Redux
import { connect } from 'react-redux';
import { search } from '../../../pages/catalog/actions';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
    width:'100%',
    color:'#000'

  },
  inputInput: {
      backgroundColor: '#eee',
      padding:10,
      borderRadius:20 
  },
  searchIcon:{
    [theme.breakpoints.up('sm')]: {
      display:'none',
    },
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PhoneSearch(props) {
  const classes = useStyles();
  //dialog
  const [open, setOpen] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSearching(false)
    setSearchText('');
  };
//input
const [searchText, setSearchText] =  React.useState('');
  const handleSearch = () => {
    if(searchText !== ''){
      props.search(searchText);
      setSearching(true)
    }
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
          <SearchIcon className={classes.searchIcon}/>
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar style={{background:'#fff', boxShadow: '0px 0px 8px rgba(91, 137, 158, 0.3)'}} elevation={0}>
          <Toolbar>
            <Grid container style={{marginTop:5}}>
           <Grid item xs={2}>
              <IconButton style={{ marginTop:-5 }} onClick={handleClose}>
                <ArrowBackIcon />
              </IconButton>
           </Grid>
            <Grid item xs={8}>
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
             </Grid>
             <Grid item xs={2}>
              <IconButton style={{ marginTop:-5 }} onClick={handleSearch}>
                <SearchIcon  />
              </IconButton>
             </Grid>
          </Grid> 
          </Toolbar>
        </AppBar>
        <div style={{marginTop:60, zIndex:1}}>
          {props.catalog.loadingSearch?
          <div>
            {[1,2,3].map(item =>
              <Grid container key={item} style={{ padding: 20}}>
                <Grid item xs={2}>
                    <Skeleton variant="circle" width={40} height={40} />
                </Grid>
                <Grid item xs={10}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                </Grid>
                <Divider />
            </Grid>)}
          </div>
          :
          <div>
            {props.catalog.searchData.length === 0 &&  !props.catalog.loadingSearch && searching?
            <div>
              <div style={{padding:20}}>
                <h2 style={{fontSize:18, marginTop:20, fontWeight:300, textAlign:'center'}}>Aucun résultat trouvé</h2>
                <h2 style={{fontSize:18, marginTop:20, fontWeight:600, textAlign:'center'}}>Essayer autre mots</h2>
              </div>
            </div>:
            <List>
               {props.catalog.searchData.map(item =>
                  <div key={item._id}>
                     <ListItem button>
                     <Grid container>
                       <Grid item xs={4}>
                         <img src={item.imageUrl} alt={item.title} style={{ width:'80%'}}/>
                       </Grid>
                       <Grid item xs={8}>
                            <ListItemText primary={item.title} secondary={item.description.slice(0, 30)} />
                       </Grid>
                     </Grid>
                     </ListItem>
                     <Divider />
                  </div>)}
            </List>
          }
          </div>}
        </div>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => ({
  catalog: state.catalog,
});
const mapActionsToProps =   {
  search
 };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(PhoneSearch);