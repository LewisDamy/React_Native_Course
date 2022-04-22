import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
// run npm install @react-navigation/native @react-navigation/native-stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces'; 
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './util/database';
// run expo install expo-app-loading
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  // use state to keep track whether or not the db was initialized
  const [dbInitialized, setDbInitialized] = useState(false);



  // initialized the database when the app component was evaluated for the 1st time
  useEffect(() => {
    // since init funct return a primise we're wrapped it with then
    init().then(() => {
      // if everything work out in the db side, set the state in here to true
      setDbInitialized(true);
    }).catch((err) => { // if something went wrong
      console.log(err);
    });
  }, []); // that's why we've the empty array

  // if the db has not initilized yet, we'll ensure that we still see the startup screen
  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen 
            name='AllPlaces' 
            component={AllPlaces} 
            // pass as function to use navigation in options
            options={({navigation}) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => (
                <IconButton 
                  icon='add'
                  size={24}
                  color={tintColor}
                  // when button press use navigation to navigate AddPlace screen
                  onPress={() => navigation.navigate('AddPlace')}
                />
              )
            })}
          />
          <Stack.Screen 
            name='AddPlace' 
            component={AddPlace}
            options={{
              title: 'Add a new Place',
            }}  
          />
          <Stack.Screen 
            name='Map' 
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

