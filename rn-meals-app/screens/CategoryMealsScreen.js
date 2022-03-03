import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';


const CategoryMealsScreen = props => {
    //get the value stored on that parameter
    const catId = props.navigation.getParam('categoryId'); 

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId); 

    return (
        <View style={styles.screen}>
            <Text>The Category Meals Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Meal Detail" onPress={() => {
                props.navigation.push({
                    routeName: 'MealDetail'
                }); 
            }}/>
        </View>
    );  
};

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;