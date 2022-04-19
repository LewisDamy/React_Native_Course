import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
// run npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// run expo install expo-app-loading
import AppLoading from 'expo-app-loading';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }} 
    >
      {/* Render LoginScreen */}
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Render SigupScreen */}
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
// function to handle the navigation when user authenticated
function AuthenticatedStack() {

  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      {/* Render Screens after the user being authenticated */}
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{
          headerRight: ({tintColor }) => (
            <IconButton 
              icon='exit' 
              color={tintColor} 
              size={24} 
              // call the logout function from auth-context
              // to clear the token and then change the isAuthenticated to false
              // consequently in Navigation, we'll change the Stack to login Screen
              onPress={authCtx.logout}
            />
          ),
      }}

      />
    </Stack.Navigator>
  );
}

// Function that handles the navigation
function Navigation() {
  // load the useContext so we can manipulate the data
  const authCtx = useContext(AuthContext);


  return (
      <NavigationContainer>
        {/* 
          Load the AuthStack which is the Login/SignUp screens when
          function from auth-context isAuthenticated is FALSE
          or the AuthenticatedStack if it's TRUE, then
          when we click logini with correct email and password, we 
          go to the first AuthenticatedStack which is the WelcomeScreen component!
        */}
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
  );
}

function Root() {

  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  // BY DOING THIS WHEN YOU CLOSE THE APP AND RESTART IT 
    // WE SHOULD BE ABLE TO MOVE FORWARD TO THE welcomeScreen!!
    useEffect(() => {
      async function fetchToken() {
          // this function will getItem as an promise
          const storedToken = await AsyncStorage.getItem('token');
          // if there's an storedToken in the local storage 
          if (storedToken) {
              // auto login the user by passing the storage token
              authCtx.authenticate(storedToken);
          } 
          setIsTryingLogin(false);
      }

      fetchToken();
  }, [])

  // if isTryingLogin is true, then prolong the AppLoading from expo
  // while we're trying to auto login the user
  if(isTryingLogin) {
    return <AppLoading />;
  }
  // return the default navigation screen
  return <Navigation />
};

export default function App() {





  // wrap the navigations with AuthContextProvider so that the context
  // can be used everywhere in our app
  return (
    <>
      <StatusBar style="light" />
      {/* Load the Navigation component */}
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}