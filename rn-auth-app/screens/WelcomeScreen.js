import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';

// screen to load when you've been authenticated!
function WelcomeScreen() {
  // handle the message received from the server 
  const [fetchedMessage, setFetchedMessage] = useState('');
  // init userContext in here to use object and functions
  const authCtx = useContext(AuthContext);
  // get the token from useContext
  const token = authCtx.token;
 
  // the TOKEN is your ticket to get access to screens and protect resource
  // so that's why we're managing it on the front-end and why we don't just use
  // to find out whether a user is authenticated but why we also attach it to 
  // outgoing HTTP requests



  useEffect(() => {
    // HTTP GET request with the insert of ?auth=[TOKEN] in order to FireBase authenticate the user
    // and display a protected resource to read and write that has been modifed in rules:
    /* 
      {
        "rules": {
          ".read": "auth.uid != null",
          ".write": "auth.uid != null", 
        }
      }
    */
    axios.get(
      'https://react-native-course-d8cbc-default-rtdb.firebaseio.com/message.json?auth=' + 
        token
    )
    // when received the response 
    .then((response) => {
      // modify the state as pointing at the data
      setFetchedMessage(response.data);
    });
    // keep track of the token
  }, [token])
  


  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
