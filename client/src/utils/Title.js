import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../utils/navbar/assets/logo.jpg'
const useStyles = makeStyles((theme) => ({
  root:{
    margin:'50px 100px',
    [theme.breakpoints.down('xs')]: {           
      margin:'50px 10px',
    },

  },
  title: {
        textAlign:'center',
        fontSize:'30px',
        fontWeight:900,
        color: theme.palette.primary.main
    },
  leftBorder: {
        width:100,
        height:2,
        background: `linear-gradient(284deg, rgba(232, 36, 48,1) 0%, rgba(232, 36, 48, 0.1) 100%)`,
        marginTop:14
      },
  rightBorder: {
        width:100,
        height:2,
        background: `linear-gradient(90deg, rgba(232, 36, 48,1) 0%, rgba(232, 36, 48, 0.1) 100%)`,
        marginTop:14
      },
 shape: {
     width:30,
     height:30,
     background:theme.palette.primary.main,
     transform: 'rotate(45deg)'
      },
 icon: {
    color:'#fff',
    textAlign:'center',
    marginTop:3,
    fontSize:15,
    fontWeight:600,
     transform: 'rotate(-35deg)'
      }
  }));
export default function Title({title}) {
  const classes = useStyles();

    return (
        <div  className={classes.root}>
          <h2 className={classes.title}>{title}</h2>
          <Grid contaiter style={{ display:'flex', justifyContent:'center', marginTop:5 }}>
            <Grid item className={classes.leftBorder}/>
            <Grid item  className={classes.shape}>
              <p className={classes.icon}>D</p>
            </Grid>
            <Grid item className={classes.rightBorder}/>
          </Grid>
        </div>
    )
}
