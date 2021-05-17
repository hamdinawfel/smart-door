import React from 'react';
//Mui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//IMAGE
import product0 from '../assets/product0.jpg'
const useStyles = makeStyles((theme) => ({
  root: {
    margin:10,
    maxWidth:200,
    [theme.breakpoints.down('xs')]: {
       maxWidth:'100%'
    },
  },
  cardMedia:{
   
    padding: '200px 0px 0 0', // 16:9
    objectFit: 'cover',
    backgroundSize: '60% ',
    transition: 'all 0.5s ease',
    '&:hover': {
      transform : 'scale(1.1)',
      cursor:'pointer'
   },
  },
  title: {
    fontSize: 14,
  },
  buttonContainer:{
    display:'flex',
    justifyContent:'center',
    backgroundColor:'#F6F7F9',
  },
  button:{
      backgroundColor:'#48cd89',
      color:'#fff',
      borderRadius:'2rem',
      border:'1px solid #48cd89',
      '&:hover': {
        backgroundColor: '#FFF',
         color:'#48cd89',
      },
  }
}));

export default function ItemCard() {
  const classes = useStyles();
  

  return (
    <Card className={classes.root} variant="outlined">
       <CardMedia
            className={classes.cardMedia}
            image={product0}
            // title={item.name}
        />      
      <CardContent>
        
        <Typography variant="body2" component="p" style={{ textAlign:'center'}}>
        STEAM WALLET CODE 50,000WON (KR).
          
        </Typography>
        <Typography variant="h5" component="h2"  style={{ textAlign:'center'}}>
          $15,5
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonContainer}>
        <Button className={classes.button} size="small">BUY</Button>
      </CardActions>
    </Card>
  );
}
