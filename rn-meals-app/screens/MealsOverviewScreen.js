import { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import MealItem from '../components/MealItem';
import { MEALS, CATEGORIES } from '../data/dummy-data';

/* 
  Component that receive as argument the route props that is
  imported in the App.js as an element of the react-navigation library
  
  This element passed as props will reference and then saved as catId from 
  the navigation of the CategorieScreen.js the second element passed as argument 
  which is we named as categoryId that points at the itemData.item.id defined 
  in an object from the category class.
*/
function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  /*
    Function that gives us our displayed meals and with that
    or all the meals that belong to each category 
  */
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  /*
    We'll import the navigation as props also, in our MealsOverviewScreen funct
    so that we can use in line 31, and then display the var stored in categoryTitle as title

    Also, we've imported CATEGORIES from dummy data, in order to find the title of
    the category id by checking if it's the same catId then, we save in the categoryTitle 
    var that we want to display as title from our MealOverview screen

    useEffect is being used in here in order to prevent warning from react-native, and then it's keep 
    tracking of the catId variable as well as the navigation, so once they change the useEffect rerun.
    It may occur with some delay but you can also use useLayoutEffect which is another react hook for 
    this scenario.
  */
 useEffect(() => {
    const categoryTitle = CATEGORIES.find(
        (category) => category.id === catId
      ).title;


    navigation.setOptions({  
      title: categoryTitle
    });
  }, [catId, navigation]);



  // Function to display the meals by title and image 
  function renderMealItem(itemData) {
    //short cut for the item
    const item = itemData.item;
    // object to handle all the props arguments for the component
    const mealItemProps = {
      id: item.id, //pass id to mealItem component (NOT a screen!)
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability
    };

    return (
      <MealItem {...mealItemProps} />
    );
  }
  // Display the meals in a flat list by rendering each item
  return (
    <View style={styles.container}>
      <FlatList 
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});