import React, { useState } from "react";
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker,  MuiPickersUtilsProvider,} from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';

import { createMuiTheme, Grid } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import { ThemeProvider } from "@material-ui/styles";
// import {ButtonContainer } from './Buttom'
//redux set up
import { connect } from 'react-redux';
// import { nextStep } from '../../../redux/actions/uiAction'
// import { addShippingDate } from '../../../redux/actions/shopAction'
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:-70
  },
    checkoutBtn:{
        padding:10,
        marginTop:15,
        marginBottom:10,
        backgroundColor:theme.palette.primary.main,
        width:'100%',
        color:'#fff',
        border: `2px solid ${theme.palette.primary.main}`,
        '&:hover': {
        color:theme.palette.primary.main,
        },
            transition:'0.1s',
            [theme.breakpoints.down('xs')]: {
            margin:'5px',
            },
        textTransform:'uppercase',
        transition: '0.2s',
        cursor:'pointer',
    },
}));

function ShippingDate(props) {
  const classes = useStyles();
  const [error, setError] = useState(" ");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleChangeDate = () => {
      if(moment().add(0.5,'hours') <= moment(selectedDate)){
        props.addShippingDate(moment(selectedDate).format('LLL'))
        setError(" ")
        if(props.drawer){
            props.drawer();
        }
      }else{
        setError("Désolé, Entrer une date valide.") 
      }
      
  }
  
  return (
    // <ThemeProvider theme={theme}>  
    <div style={{ margin:'auto'}}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
         variant='static'
         disablePast
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </MuiPickersUtilsProvider>
    <Button className={classes.checkoutBtn} active onClick={()=> handleChangeDate()}>Valider</Button>
    </div>
    //  {/* {error !== ' '? <div>
    //  <Alert severity="warning" style={{width:'100%'}}>{error}</Alert>
    // </div>:null} */}
    // {/* <Button style={{width:'100%'}} active onClick={()=> handleChangeDate()}>Valider</Button> */}

    // </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
    // ui : state.ui,
  });
  const mapActionsToProps = {
    // nextStep,
    // addShippingDate
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(ShippingDate);
