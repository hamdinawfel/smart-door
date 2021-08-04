import React from 'react';
import { useHistory } from "react-router-dom";
//Mui
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/fontawesome-free-brands';
import {faGoogle} from '@fortawesome/fontawesome-free-brands';
import {faYoutube} from '@fortawesome/fontawesome-free-brands';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
 //logo
 import logo from '../navbar/assets/logo.jpg'

export default function Footer() {
  let history = useHistory();

  const handleNavigateToHome = ()=>{
    history.push('/')
  };

  const handleNavigateToCatalog = ()=>{
    history.push('/catalog/all')
  };

  const handleNavigateToAuth= ()=>{
    history.push('/connextion')
  };
  return (
    <footer className="footer-distributed">
          <div className="footer-left">
          <div style={{ display:'flex', alignItems:'center'}}>
            <img src={logo} alt="Dinari" style={{width:70, cursor:'pointer'}} onClick={handleNavigateToHome}/>
            <h3  onClick={handleNavigateToHome}>Dinari</h3>
          </div>
          <div className="footer-icons">
            <Link target="_blank" rel="noreferrer" color="inherit" href="https://www.facebook.com/dinari.green/">
              <span>
                 <FontAwesomeIcon icon={faFacebookF}  className="icon"/>
              </span>
            </Link>
            <Link color="inherit" target="_blank" rel="noreferrer" href="https://www.google.com/maps/place/Dinari+green+life/@34.4311398,8.7756556,15z/data=!4m5!3m4!1s0x0:0xeabd5e6cd48f9c33!8m2!3d34.4311398!4d8.7756556">
              <span>
                <FontAwesomeIcon icon={faGoogle} className="icon"/>
              </span>
            </Link>
            <Link color="inherit" target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCt1IIo_U9Hc11kBEY6OxMVw/">
              <span>
                <FontAwesomeIcon icon={faYoutube}  className="icon"/>
              </span>
            </Link>
          </div>
            <p className="footer-company-name" style={{ color:'#92999f', marginTop:20}}>Powred by BS Partage. Copyright © 2021.</p>
          </div>
          
          <div className="footer-center">
          <Grid container>
            <Grid item xs={2}>
              <span style={{ padding:'13px 8px 3px 8px', background:'#4A4E69', borderRadius:2}}>
                <PhoneIcon style={{ color:'#fff', marginTop: 10}}/>
              </span>
            </Grid>
            <Grid item xs={10} style={{ marginTop:15, textAlign:'start'}}>
              <p style={{ marginLeft:5 }}>22 550 675</p>
            </Grid>
           </Grid>
          <Grid container style={{ marginTop:15}}>
            <Grid item xs={2}>
            <span style={{ padding:'13px 8px 3px 8px', background:'#4A4E69', borderRadius:2, }}>
              <MailOutlineIcon style={{ color:'#fff', marginTop: 10}}/>
            </span>
            </Grid>
            <Grid item xs={10} style={{ marginTop:15, textAlign:'start'}}>
              <p style={{ marginLeft:5 }}>najehdinari@gmail.com</p>
            </Grid>
           </Grid>
          <Grid container style={{ marginTop:15}}>
            <Grid item xs={2}>
              <span style={{ padding:'13px 8px 3px 8px', background:'#4A4E69', borderRadius:2, }}>
                <RoomIcon style={{ color:'#fff', marginTop: 10}}/>
              </span>
            </Grid>
            <Grid item xs={10} style={{ marginTop:15}}>
            <Link color="inherit" href="https://www.google.com/maps/place/Dinari+green+life/@34.4311398,8.7756556,15z/data=!4m5!3m4!1s0x0:0xeabd5e6cd48f9c33!8m2!3d34.4311398!4d8.7756556">
              <p style={{ marginLeft:5 }}> Lajama, Gafsa 2100</p>
              <p style={{ marginLeft:5 }}>Avenue Salah Din Ayoubi</p>
            </Link>
            </Grid>
           </Grid>
          </div>
    
          <div className="footer-right">
    
            <p className="footer-company-about">
              <span>A propos de nous</span>
              Nous ne sommes pas les seuls, mais nous avons les meilleurs rapports qualité prix dans la fabrication des portes et des menuiseries.<br/>
              La société Dinari green life, fondée en 2009 vous offre une vaste gamme des portes par des design modernes et de couleurs tendance.
            </p>
          </div>
        </footer>
  );
}