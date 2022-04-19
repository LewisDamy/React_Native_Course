import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';

function LoginScreen() {

  // manage the loading state by defult as false, so it's NOT authenticated
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // bring the useContext to call funct and modify states in auth-context 
  const authCtx = useContext(AuthContext);

  // define asnyc funct to handle the email and password from AuthContent.js
  // and display the loading spinner while waiting on it
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    // try & catch to handle API errors 
    try {
      // await for the login auth.js funct to send the http POST method
      const token = await login(email, password);
      // pass the token to the authenticate funct in auth-context.js file
      authCtx.authenticate(token);

    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  // load the spinner when it's autheticating
  if(isAuthenticating) {
    return (
      <LoadingOverlay message="Logging you in..." />
    );
  } 
  // screen to load AuthContent when login in
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
