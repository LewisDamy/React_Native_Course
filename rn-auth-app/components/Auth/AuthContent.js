import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {

  // state to keep track whether each variable is valid or not
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  // react native hook to use the navigation to components that aren't
  // screens but we still want to change between screens with navigation
  const navigation = useNavigation();

  // Function to handle the change between login screen and SignUp
  // screen when the user press the 'Create a new user' button
  function switchAuthModeHandler() {
    if(isLogin) {//if isLogin === true
      // load signup screen with 'replace' so that we don't have a 
      // back button to go back to the login screen
      navigation.replace('Signup');
    } else { // if we're in SignUp screen
      // go back to login screen
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    // dictionary of crendetials
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim(); //remove spaces before or after user insert email
    password = password.trim();

    const emailIsValid = email.includes('@');
    // FireBase configuration that requires passwords with at least 6 chars
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) { // check if insert all inputs in form correctly, if not send alert
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    // pass to function email and password to be authenticated
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
