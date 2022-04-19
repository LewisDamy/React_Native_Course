import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';

import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';


function SignupScreen() {

  // manage the loading state by defult as false, so it's NOT authenticated
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // bring the useContext to call funct and modify states in auth-context   
  const authCtx = useContext(AuthContext);

  // define asnyc funct to handle the email and password from AuthContent.js
  // and display the loading spinner while waiting on it
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    // try & catch to handle API errors 
    try {
      // await for the HTTP POST request and receive the token
      const token = await createUser(email, password);
      // call the authenticate funct from context, and pass the token
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not create new user. Please check your input and try again later!'
      );
      setIsAuthenticating(false);
    }
  };

  // load the spinner when it's autheticating
  if(isAuthenticating) {
    return (
      <LoadingOverlay message="Creating user..." />
    );
  } 

  // screen to load AuthContent when signing up
  return (
  <AuthContent 
    onAuthenticate={signupHandler}
  />
  );
}

export default SignupScreen;
