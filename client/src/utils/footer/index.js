import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/fontawesome-free-brands';
import {faGoogle} from '@fortawesome/fontawesome-free-brands';
import {faYoutube} from '@fortawesome/fontawesome-free-brands';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
export default function Footer() {
  return (
    <footer class="footer-distributed">
          <div class="footer-left">
    
            <h3>Company<span>logo</span></h3>
    
            <p class="footer-links">
              <a href="#" class="link-1">Accueil</a>
              <a href="#" >Catalogue</a>
              <a href="#"> A propos</a>
              <a href="#">Faq</a> 
              <a href="#">Contact</a>
            </p>
    
            <p class="footer-company-name" style={{ color:'#92999f'}}>Powred by BS Partage. Copyright © 2021.</p>
          </div>
          
          <div class="footer-center">
          <Grid container>
            <Grid item xs={2}>
              <span style={{ padding:'13px 8px 3px 8px', background:'#4A4E69', borderRadius:2}}>
                <PhoneIcon style={{ color:'#fff', marginTop: 10}}/>
              </span>
            </Grid>
            <Grid item xs={10} style={{ marginTop:15, textAlign:'start'}}>
              <p style={{ marginLeft:5 }}>+216 71 961 457</p>
            </Grid>
           </Grid>
          <Grid container style={{ marginTop:15}}>
            <Grid item xs={2}>
            <span style={{ padding:'13px 8px 3px 8px', background:'#4A4E69', borderRadius:2, }}>
              <MailOutlineIcon style={{ color:'#fff', marginTop: 10}}/>
            </span>
            </Grid>
            <Grid item xs={10} style={{ marginTop:15, textAlign:'start'}}>
              <p style={{ marginLeft:5 }}>support@company.com</p>
            </Grid>
           </Grid>
          <Grid container style={{ marginTop:15}}>
            <Grid item xs={2}>
              <span style={{ padding:'13px 8px 3px 8px', background:'#4A4E69', borderRadius:2, }}>
                <RoomIcon style={{ color:'#fff', marginTop: 10}}/>
              </span>
            </Grid>
            <Grid item xs={10} style={{ marginTop:15}}>
            <p style={{ marginLeft:5 }}>Tunis Angle avenue principale,</p>
            <p style={{ marginLeft:5 }}>Rue lac Mälaren,les berges du lac</p>
            </Grid>
           </Grid>
          </div>
    
          <div class="footer-right">
    
            <p class="footer-company-about">
              <span>A propos de nous</span>
              Fondée en 2021, la société Campany name est le pionnier tunisien dans le domaine des portes de sécurité. Elle réalise des produits toujours innovants du point de vue technologique.
            </p>
    
            <div class="footer-icons">
            <span>
            <FontAwesomeIcon icon={faFacebookF}/>
            </span>
            <span>
              <FontAwesomeIcon icon={faGoogle}/>
            </span>
            <span>
              <FontAwesomeIcon icon={faYoutube}/>
            </span>
            </div>
          </div>
        </footer>
  );
}