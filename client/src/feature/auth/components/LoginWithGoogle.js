import React from 'react';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/fontawesome-free-brands';
//mui
import { makeStyles } from '@material-ui/core/styles';
//set up redux
import { connect } from 'react-redux';
import { authUser } from '../action';
const useStyles = makeStyles((theme) => ({
    loginButton: {
      background: '#000',
      color:'#fff',
      border:'0px transparent',
      textAlign:'center',
      }
  }));

function LoginWithGoogle(props) {
    const classes = useStyles();
    const responseGoogle = (res) => {
         const userData = {
           name:`${ res.profileObj.givenName} ${res.profileObj.familyName}`,
           email: res.profileObj.email,
         }
        // props.authUser(userData);
      }
    
    return (
         <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <FontAwesomeIcon icon={faGoogle}  onClick={renderProps.onClick} style={{ color: 'rgba(255,255,255,0.8)', fontSize:28}}/>
            )}
            buttonText=""
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
const mapActionsToProps = {
 authUser
};
export default connect(
  null,
  mapActionsToProps
)(LoginWithGoogle);