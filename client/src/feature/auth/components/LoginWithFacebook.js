import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF} from '@fortawesome/fontawesome-free-brands';
import FacebookLogin from 'react-facebook-login';
//set up redux
import { connect } from 'react-redux';
import { authUser } from '../action';
function LoginWithFacebook(props) {
    const responseFacebook = (res) => {

        const userData = {
            name: res.name,
            email: res.email,
          }
         props.authUser(userData);
      }
     
    return (
        <FacebookLogin
        textButton={""}
        cssClass="btnFacebook"
        icon={<FontAwesomeIcon icon={faFacebookF} style={{color: '#57AAB4'}}/> }
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        // autoLoad={true}
        // reauthenticate={true}
        fields="email, name, picture"
        // onClick={componentClicked}
        callback={responseFacebook} />
    )
}
const mapActionsToProps = {
    authUser
   };
   export default connect(
     null,
     mapActionsToProps
   )(LoginWithFacebook);