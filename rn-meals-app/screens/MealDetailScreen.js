import  {useLayoutEffect } from 'react'
import { View,  Text, Image, StyleSheet, ScrollView } from 'react-native'

import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';

function MealDetailScreen({ route, navigation }) {
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
    // functon to handle when the user press the right button
    function headerButtonPressHandler() {
        console.log('Pressed!');
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
                        icon="star"  
                        color="black"
                        onPress={headerButtonPressHandler} 
                    />
                );
            }
        }); 
    }, [navigation, headerButtonPressHandler]);

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