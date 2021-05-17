import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root:{
      display:'none',
       [theme.breakpoints.down('xs')]: {
         display:'flex',
         justifyContent:'center',
      },
    },
   }));

export default function LoadingBestSelling() {
  const classes = useStyles();
  return (
    <Grid className={classes.root} >
      <Skeleton 
          variant="rect"
          width={240} 
          height={340}
          style={{borderRadius:19, margin:10}}/>
    </Grid>
  );
}

