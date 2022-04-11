import  {useLayoutEffect } from 'react'
import { View,  Text, Image, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
//import function to change state of store
import { addFavorite, removeFavorite } from '../store/redux/favorites'; 

function MealDetailScreen({ route, navigation }) {
    /*
        variable that get the favorites ids by using the useSelector from redux
        which pass as argument the state because it will be provided by the react-Redux 
        an then state in order to drill into our store, so that you can pass
        any keys that we defined in of the reducer dictionary from store.js file
    */
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    //dispatch in order to use the functions to change the the favorites.
    const dispatch = useDispatch();
    
    /* 
        Each screen component in your app is provided with the route prop 
        automatically. The prop contains various information regarding current 
        route (place in navigation hierarchy component lives).
        more doc in route: https://reactnavigation.org/docs/route-prop
    */
    const mealId = route.params.mealId;

    // select the MEALS info from the respective mealid by 
    // searching in the MEALS object from dummy-data
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    // function to check if in the favoriteMealIds has the mealId
    const mealIsFavorite = favoriteMealIds.includes(mealId);    

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
          dispatch(removeFavorite({ id: mealId }));
        } else {
          dispatch(addFavorite({ id: mealId }));
        }
      }

    // useEffect to keep track of the navigation and function changes
    useLayoutEffect(() => {
        // if the user go to this screen, load this Button on the headerRight
        navigation.setOptions({
            headerRight: () => {
                // return this customized button, and run the function when pressed
                return (
                    <IconButton 
                        //passing props to the button
                        icon={mealIsFavorite ? 'star' : 'star-outline'} 
                        color="black"
                        onPress={changeFavoriteStatusHandler} 
                    />
                );
            },
        }); 
    }, [navigation, changeFavoriteStatusHandler]);

    return(
        <ScrollView style={styles.rootContainer}> 
            <Image style={styles.image} source={{uri: selectedMeal.imageUrl}}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails 
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                style={styles.detailText} //passing the styles to the MealDetail component
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                        <List data={selectedMeal.ingredients} /* list the ingredients*/ />
                    <Subtitle>Steps</Subtitle>
                        <List data={selectedMeal.steps} /* list the steps to make the food*//>
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 250
    },
    title: {
        fontWeight: 'bold', 
        fontSize: 24,
        margin: 8,
        textAlign: 'center'
    },
    detailText: {
        color: 'black'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%'
    }
});