import { StatusBar } from 'expo-status-bar';

// run npm install @react-navigation/native @react-navigation/native-stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces'; 
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';


const Stack = createNativeStackNavigator();

export default function App() {

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

