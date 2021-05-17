import React from 'react';
//Mui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//ASSETS
import '../assets/style.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: 600,
    textAlign: 'center',
  },
  wrapper:{
    paddingTop: 40,
    paddingBottom: 40,
    '&:focus ':{
      outline: 0
    }
  },
  clashCard:{
    background: '#fff',
    width: 300,
    display: 'inline-block',
    margin: 'auto',
    borderRadius: 5,
    position: 'relative',
    textAlign: 'center',
    boxShadow: '-1px 15px 30px -12px rgb(0,0,0)',
    zIndex: 1,
  },
  clashCardImage:{
    position: 'relative',
    height: '230px',
    marginBottom: '35px',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  //
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
    margin:'20px auto',
      // backgroundColor:'#48cd89',
      padding:'5px 60px',
      color:'#fff',
      borderRadius:'2rem',
  }
}));

export default function ProductCard(props) {
  const classes = useStyles();
  

  return (
    <Grid item xs={12} sm={6}md={4} lg={3}>
         <div className="slide-container">
          <div className="wrapper">
            <div className="clash-card goblin">
              <div className="clash-card__image" style={{ background:`${props.theme}`}}>
                <img src={props.imageUrl} alt={props.title} />
              </div>
              <div className="clash-card__unit-name">{props.title}</div>
                <Typography variant="h5" component="h2"  style={{ textAlign:'center', fontWeight:600}}>
                {props.price}<span style={{ fontSize:15}}>DT</span>
                </Typography>
                <Button 
                  className={classes.button}
                  style={{backgroundColor:`${props.theme}`, border:`1px solid ${props.theme}`}}>
                    BUY
                </Button>
              </div>
          </div>
      </div> 
    </Grid>
  
  );
}
