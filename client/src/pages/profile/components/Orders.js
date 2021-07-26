import React, { useState, useEffect } from 'react';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
//redux
import { connect } from 'react-redux';
// import { getOrders, getOrdersCount } from '../actions';
import IsEmpty from './IsEmpty';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin:'10px 200px',
    [theme.breakpoints.down('sm')]: {
      margin:'10px',
     },
  },
  title: {
    fontSize: 14,
  },
  //ordersList
  desktopPrice:{
    display:'flex',
    [theme.breakpoints.down('sm')]: {
      display:'none',
     },
  },
  mobilePrice:{
    display:'none',
    [theme.breakpoints.down('sm')]: {
      display:'flex',
      justifyContent:'space-between',
      borderBottom:'0.5px solid #f2f2f2',
      padding:'10px 0'
     },
  },
  image:{
    width:50, 
    marginTop:5,
    [theme.breakpoints.down('sm')]: {
     width:'100%'
     },
  },
}));

function OrderCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid container style={{borderBottom:'0.5px solid #f2f2f2'}}>
           <Grid item xs={11} md={10}>
              <div style={{display:'flex'}}>
                <Typography variant="h5" component="h2">
                {/* Order: #{props.orderNumber} */}
                Order: #25187
                </Typography>
              </div>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
              {/* Created at {props.createdAt.split('T')[0]} */}
              Created at 25-25-25
             </Typography>
              
           </Grid>
           <Grid item md={2} className={classes.desktopPrice}>
              <Typography variant="h5" component="h2">
              {/* Total: {props.total} DT */}
              Total: 20 DT
              </Typography>
              
           </Grid>
           
        </Grid>
        <Grid className={classes.mobilePrice}>
              <Typography variant="h5" component="h2">
              Total
              </Typography>
              <Typography variant="h5" component="h2">
              {/* {props.total} DT */}
              20 DT
              </Typography>
           </Grid>
        <Grid container style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
           <Grid item xs={2} md={2}>
              {/* <img src={props.imageUrl} className={classes.image} alt="img" /> */}
           </Grid>
           <Grid item xs={6} md={8}>
             <Typography className={classes.title} color="textSecondary" gutterBottom>
              {/* {props.productTitle} */} aaaa
             </Typography>
           </Grid>
           <Grid item xs={4} md={2} style={{display:'flex', alignItems:'center'}}>
           <Chip
                  style={{margin:'5px 0 0 0', color:'#FF9F1A', border:'1px solid #FF9F1A'}}
                  variant="outlined"
                  size="small"
                  label="Waiting"
                />
           </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
function Orders(props) {
  const [page, setPage] = useState(1);

 const handleChangePage = (page) => {
  props.getOrders(page)
  setPage(page)
  window.scrollTo(0, 0);
 }
  useEffect(() => {
    // props.getOrders(1)
    // props.getOrdersCount()
  }, []);

  return (
    <React.Fragment>
      {!props.profile.loadingOrders?
      <div>
         
           {props.profile.orders.length > 0 ?
             <React.Fragment>
               {/* {props.profile.orders.map(item => */}
               {[1,2,3].map(item =>
                  <OrderCard 
                    //   key={item._id}
                    //   id={item._id}
                    //   orderNumber={item.orderNumber}
                    //   createdAt={item.createdAt}
                    //   total={item.total}
                    //   quantity={item.quantity}
                    //   deliveryBody={item.deliveryBody}
                    //   imageUrl={item.product.imageUrl}
                    //   productTitle={item.productTitle}
                    //   status={item.status}

                  />)}
                  <div style={{display:'flex', justifyContent:'center', marginTop:50}}>
                    <Pagination 
                        color="primary" 
                        page={page}
                        onChange={(e, page)=>handleChangePage(page)}
                        count={Math.floor(props.profile.count/5)+1} />
                  </div>
             </React.Fragment>:<IsEmpty />

           }
      </div>:
      <CircularProgress style={{display:'block', margin:'0 auto', marginTop:50}}/>}
      
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  profile: state.profile
 });
 
 const mapActionsToProps =   {
//   getOrders,
//   getOrdersCount
 };
 
 export default connect(
   mapStateToProps,
   mapActionsToProps
   )(Orders);