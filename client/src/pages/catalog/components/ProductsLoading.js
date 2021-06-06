import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    xs:{
      display:'none',
       [theme.breakpoints.down('xs')]: {
         display:'flex',
         justifyContent:'center',
      },
    },
    sm:{
      display:'none',
      [theme.breakpoints.up('sm')]: {
        display:'flex',
        justifyContent:'center',
     },
      [theme.breakpoints.up('md')]: {
        display:'none'
     },
    },
    md:{
      display:'none',
       [theme.breakpoints.up('md')]: {
         display:'flex'
      },
       [theme.breakpoints.up('lg')]: {
         display:'none'
      },
    },
    lg:{
      display:'none',
       [theme.breakpoints.up('lg')]: {
         display:'flex'
      },
    },
   }));

export default function ProductsLoading() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <Grid container style={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'0 auto'}}>
            {[0,1,2].map(item =>
                <Grid item xs={12} className={classes.xs} >
                    <Skeleton 
                        key={item} 
                        variant="rect"
                        width={380} 
                        height={350}
                        style={{borderRadius:19, margin:10}}/>
                </Grid>
            )}
         </Grid>
        <Grid container  style={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'0 auto'}}>
            {[0,1,2,3].map(item =>
            <Grid item  sm={6} className={classes.sm}>
                <Skeleton 
                    key={item} 
                    variant="rect"
                    width={380} 
                    height={350}
                    style={{borderRadius:19, margin:10}}/>
            </Grid>
            )}
         </Grid>  
        <Grid container style={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'0 auto'}}>
            {[0,1,2,3,4,5].map(item =>
            <Grid item md={4} className={classes.md}>
                <Skeleton 
                    key={item} 
                    variant="rect"
                    width={380} 
                    height={350}
                    style={{borderRadius:19, margin:10}}/>
            </Grid>
            )}
         </Grid> 
        <Grid container  style={{ display:'flex', justifyContent:'center', alignItems:'center', margin:'0 auto'}}>
            {[0,1,2,3,4,5].map(item =>
            <Grid item lg={4} className={classes.lg}>
                <Skeleton 
                    key={item} 
                    variant="rect"
                    width={380} 
                    height={350}
                    style={{borderRadius:19, margin:10}}/>
            </Grid>
            )}
         </Grid>
    </React.Fragment>
  );
}

