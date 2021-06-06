import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
//components
import Auth from './Auth'
import Adress from './Adress'
// import ShippingDate from './ShippingDate'
//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../../feature/auth/action';


const useStyles = makeStyles(theme => ({
    root: {
       padding:10
    },
    
  }));
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

function Steper(props) {
    const classes = useStyles();

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
 
  const handleLogout = () => {
    props.logoutUser()
  }
  return (
    <div>
      <Accordion square expanded={expanded === 'panel1' } onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{ fontSize:'1.2rem', fontWeight: 600, opacity:0.8}}>
              { props.user.authenticated? 
              <CheckCircleIcon fontSize="large" style={{ color:'#00a152', verticalAlign:'middle',marginRight:10 }} />
              : 
              <span style={{ fontSize:'1.2rem', fontWeight: 900, opacity:0.8}}>1 • </span>} 
            S'identifier
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        { props.user.authenticated? 
        <Grid container>
          <Grid item xs={12} style={{ display:'flex', justifyContent:'center'}}>
            {props.user.imageUrl !== ''?<img src={props.user.imageUrl} alt={props.user.firstname} style={{ borderRadius:'50%', width:150, height:150 }} />:null
            }
          </Grid>
          <Grid item xs={12}style={{ display:'flex', justifyContent:'center'}}>
           <p style={{ fontSize:'1rem', fontWeight: 600}}>
              Connecté en tant que {' '}
              <span style={{ color:'#4528ba', fontWeight: 900, textTransform:'capitalize'}}>
                {props.user.firstname} {props.user.lastname}
              </span>
            </p>
          </Grid>
          <Grid item xs={12}style={{ display:'flex', justifyContent:'center'}}>
            <Button variant="outlined" onClick={handleLogout}>déconnecter</Button>
          </Grid>
         
        </Grid >
        : 
        <div style={{margin:'0 auto'}}>
          <Auth />
        </div> }
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={ true } disabled={!props.user.authenticated} square expanded={expanded === 'panel2' && !props.checkout.success} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          { !props.checkout.success? 
            <Typography style={{ fontSize:'1.2rem', fontWeight: 600, opacity:0.8}}>
              <span style={{ fontSize:'1.2rem', fontWeight: 900, opacity:0.8}}>2 • </span>
                Terminer votre commande
            </Typography>
           : 
           <Typography style={{ fontSize:'1.2rem', fontWeight: 600, opacity:0.8}}>
             <CheckCircleIcon fontSize="large" style={{ color:'#00a152', verticalAlign:'middle',marginRight:10 }} />
              Votre commande a été envoyé avec succès
            </Typography>} 
        </AccordionSummary>
        <AccordionDetails style={{display:'flex',justifyContent:'center'}}>
          <Adress />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion disabled={!props.user.authenticated} square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography style={{ fontSize:'1.2rem', fontWeight: 600, opacity:0.8}}>
              <span style={{ fontSize:'1.2rem', fontWeight: 900, opacity:0.8}}>3 • </span> 
              Date de livraison
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShippingDate />
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  checkout : state.checkout
});
const mapActionsToProps = {
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Steper);
