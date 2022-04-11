import { Button, StyleSheet } from 'react-native';
// install npm install @react-navigation/drawer and 
// if problem with reanimated run: npm install react-native-reanimated@1 --save --save-exact
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView } from '@react-navigation/drawer'; 
//must install npm install @react-navigation/native-stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Ionicons } from '@expo/vector-icons';
// install npm install @reduxjs/toolkit react-redux
import { Provider } from 'react-redux';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoriteScreen from './screens/FavoritesScreen';
import { store } from './store/redux/store';


/* 
  Stack andn Drawer are objects with two properties where every 
  property holds a object that acts as a components 

*/
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#808080' }, //add color to title 
        headerTintColor: 'white', //add color to title
        sceneContainerStyle: { backgroundColor: 'white' }, //add background color to all page content 
        drawerContentStyle: { backgroundColor: '#808080'},
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: '#a3a0a0',
      }}
    >
      <Drawer.Screen name='Categories' component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({color, size}) => (
            <Ionicons name='list' color={color} size={size}/>
          ),
        }}
      />
      <Drawer.Screen name='Favorites' component={FavoriteScreen} 
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name='star' color={color} size={size}/>
          ),          
        }}  
      />
    </Drawer.Navigator>
  );
};
/*
  This Stack.Screen component is a component that allow us to 
  register a  screen that will be managed by the Stack.Navigator
*/
export default function App() {
  return (
    <>
      <Provider store={store}>
        { /* 
          we should wrap our redux provider and our store around all
          the components that need to interact with the redux store, so
          we're providing this store to our app in different parts 
        */ }
      
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ //ALL PAGES WILL HAVE THIS CONFIG
              headerStyle: { backgroundColor: '#545454' }, //add color to title 
              headerTintColor: 'white', //add color to title
              contentStyle: { backgroundColor: 'white' } //add background color to all page content 
            }}
          >
            <Stack.Screen
              name="Drawers" 
              component={DrawerNavigator} 
              options={{
                //remove stack navigator bar when used in one of the drawer navigator screens
                headerShown: false
              }} 
            />
            <Stack.Screen 
              name="MealsOverview" 
              component={MealsOverviewScreen} 
            />
            <Stack.Screen 
              name="MealDetail" 
              component={MealDetailScreen} //point to the component
                options={{
                  title: 'Meal Detail', //add title to screen
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});