import React from 'react'
//M-UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Components
import OrderSummary from './OrderSummary'
import OrderInfo from './OrderInfo';
import Title from '../../../utils/Title'
const useStyles = makeStyles(theme => ({
    root:{
      padding:'0px 100px',
      marginBottom:50,
      [theme.breakpoints.down('sm')]: {
        padding:'0px 10px',
      },
    },
    mainContainer:{
      display:'flex',
      flexDirection:'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection:'column-reverse',
      },
    },
  }));
  export default function Main() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
           <Title title="Commandez" />
        <Grid container className={classes.mainContainer}>
          <Grid item xs={12} md={8}>
            <OrderInfo />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary />
          </Grid>
        </Grid>
        
      </div>
    )
}


