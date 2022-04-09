import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';

/* 
  passing navigation as props in order to access function and pass as
  argument the name of the screen to be move forward and some data, in 
  this case we called categoryId and it's pointing at the id of the item
  defined in the the class from category.js and used in dummy-data.js.
*/
function CategoriesScreen({ navigation }) { 
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id, 
      });
    }
    // return each tile of the grid
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color} 
        //function to handle the change of the CategoryGridTile
        onPress={pressHandler} 
      />
    );
  }
  /* 
    return the list of tiles, as a flatlist component and passing
    as arguments, the location of the data, in this case the variable
    CATEGORIES defined in dummy-data.js, the id and the item to be displayed
  */
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;