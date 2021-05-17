import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root:{
    margin:'50px 100px',
    [theme.breakpoints.down('xs')]: {           
      margin:'50px 10px',
    },

  },
  title: {
        textAlign:'center',
        fontSize:'28px',
        fontWeight:900,
        color:'#22223b'
    },
  leftBorder: {
        width:100,
        height:2,
        background: `linear-gradient(284deg, rgba(34, 34, 59,1) 0%, rgba(34, 34, 59, 0.1) 100%)`,
        marginTop:7
      },
  rightBorder: {
        width:100,
        height:2,
        background: `linear-gradient(90deg, rgba(34, 34, 59,1) 0%, rgba(34, 34, 59, 0.1) 100%)`,
        marginTop:7
      },
 shape: {
     width:15,
     height:15,
     background:'rgba(34, 34, 59,1)',
     transform: 'rotate(45deg)'
      }
  }));
export default function Title({title}) {
  const classes = useStyles();

    return (
        <div  className={classes.root}>
          <h2 className={classes.title}>{title}</h2>
          <Grid contaiter style={{ display:'flex', justifyContent:'center', marginTop:5 }}>
            <Grid item className={classes.leftBorder}/>
            <Grid item  className={classes.shape}/>
            <Grid item className={classes.rightBorder}/>
          </Grid>
        </div>
    )
}
