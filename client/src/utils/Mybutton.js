import React from 'react'
//M-UI
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    myButton:{
        textTransform:'capitalize',
        // width: 85%,
        padding: '10px 30px',
        cursor: 'pointer',
        display: 'block',
        margin: '0',
        background:theme.palette.primary.main,
        color: '#fff',
        // background: 'linear-gradient(to right, #03a9f4,#57AAB4,#03a9f4)',
        border:0,
        outline: 'none',
        borderRadius:' 30px', 
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',   
        // color:'#fff',
        fontWeight: 600,
        fontSize:'15px', 
        transition: '0.5s',
        '&:hover': {
            backgroundColor: 4,
            background:theme.palette.primary.main,
            color: '#57AAB4',
            // borderRadius: '30px',
            boxShadow: '0 0 5px #57AAB4,  0 0 25px #57AAB4,  0 0 50px #57AAB4, 0 0 100px #03e9f4',
          },
          [theme.breakpoints.down('sm')]: {
            padding:'10px',
          },
    },
    
  }));
export default function Mybutton(props) {
  const classes = useStyles();
    return (
        <button className={classes.myButton}>
            {props.content}
        </button>
    )
}
