import React from 'react'
//M-UI
import { makeStyles } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid';
//Components
import Steper from './components/Steper'
import Order from './components/Order'

const useStyles = makeStyles(theme => ({
    root: {
        padding:'120px 100px',
        display:'flex',
        flexDirection:'row',
        [theme.breakpoints.down('md')]: {
            padding:'100px 10px',
        },
        [theme.breakpoints.down('sm')]: {
         flexDirection:'column-reverse',
        }
    },
  steper:{
    padding:'0 5px 0 0',
    [theme.breakpoints.down('sm')]: {
        padding:'10px 0px',
    }
  },
  order:{
    padding:'0 0 0 5px',
    [theme.breakpoints.down('sm')]: {
        padding:'10px 0px',
    }
  }
  }));

export default function Checkout(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
           <Grid item xs={12} md={7} className={classes.steper}>
              <Steper />
           </Grid>
           <Grid item xs={12} md={5} className={classes.order}>
              <Order />
           </Grid>
        </Grid>
      
    )
}
