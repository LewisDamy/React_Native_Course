import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import MealDetails from './MealDetails';

/* 
    Component that display the meal items title 
    by getting the title as a prop

    Note: The image is part of the dummy-data as a link ref, 
    that we're also getting via props
*/
function MealItem({ id, title, imageUrl, duration, complexity, affordability }) {
    
    // doc of navigation: https://reactnavigation.org/docs/navigation-prop
    const navigation = useNavigation();

    function selectMealItemHandler() {
        navigation.navigate('MealDetail', {
            mealId: id 
        });
    };



    return(
        <View style={styles.mealItem}>
            <Pressable
                // Styles feedback for iOS when tapping
                style={({ pressed }) => pressed ? styles.buttonPressed : null}
                onPress={selectMealItemHandler} //navigate to the meal detail screen when press the item
            >
                <View styles={styles.innerContainer}>
                    <View>
                        <Image source={{uri: imageUrl }} style={styles.image}/>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <MealDetails 
                        duration={duration} 
                        complexity={complexity} 
                        affordability={affordability}
                    />
                </View>
            </Pressable>
        </View>
    );
}

export default MealItem;

const styles = StyleSheet.create({
    mealItem: {
        margin: 16, //pixels
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    buttonPressed: {
        opacity: 0.5
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%', 
        height: 200
    },
    title: {
       fontWeight: 'bold',
       textAlign: 'center',
        fontSize: 18,
        margin: 8
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', //center the child, the detailItems
        padding: 8
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12
    }
});