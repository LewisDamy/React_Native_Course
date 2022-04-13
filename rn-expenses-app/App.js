/* install:
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context

We're going to use the STACK, BOTTOM TABS
so run:
npm install @react-navigation/native-stack 
npm install @react-navigation/bottom-tabs
*/
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import { StatusBar } from 'expo-status-bar';

//vars that hold the .Screen to point at a screen and the .Navigator for each type
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// funct to handle the bottomTab type navigatons
function ExpensesOverview() {
  return <BottomTabs.Navigator 
      // passing as props the navigation into screenOptions 
      screenOptions={({ navigation }) => ({
        //adding style: color background color to tob header and bottom tabs
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 }, 
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        // creating topright button for all BottomTabs
        headerRight: ({ tintColor }) => (
          <IconButton 
            icon='add' 
            color={tintColor} 
            size={24} 
            // when the button + pressed, I want to navigate to the ManageExpense Screen
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
    })}
  >
    {/* Point at Recent Expenses and All expenses screens */}
    <BottomTabs.Screen 
      name="RecentExpenses" 
      component={RecentExpenses} 
      options={{
        // modify the default title
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        //add icon to the bottom tab
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='hourglass' size={size} color={color} />
        )
      }}
    />
    <BottomTabs.Screen 
      name="AllExpenses" 
      component={AllExpenses} // point at the AllExpenses component
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" size={size} color={color} />
        )
      }}
    />
  </BottomTabs.Navigator>
}

export default function App() {

  return (
    <>
    <StatusBar style='light'/>
    {/* add our store to wraped around our navigation */}
    <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',
            
          }}>
            {/* 
              Hierarch order, the top is the most important so it will display
              it first. First page is the ExpensesOverview which is the funct 
              def that handles our bottomtabs and then the ManageExpense screen
            */}
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview}
              options={{
                headerShown: false, //remove top header "there were 2 headers"
              }}
            />
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense} 
              options={{
                // change how the screen will appear, to a stack coming from bottom
                // to almost the top of the screen * WORKS ON IOS *
                presentation: 'modal'
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
