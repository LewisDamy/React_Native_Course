import { useNavigation } from '@react-navigation/native';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

function PlacesList({ places }) {
    const navigation = useNavigation();

    // function to handle the change of screen and passing the id 
    function selectPlaceHandler(id) {
        // navigate to the PlaceDetails screen and pass as route params the id that should be an arg from this funct
        navigation.navigate('PlaceDetails', {
            // and the place.id forward from the PlaceItem will be passed as params to the PlaceDetails screen
            placeId: id
        })
    }

    if (!places || places.length === 0) {//if there's no places
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No Places added yet - Start adding some!</Text>
            </View>
        );
    }

    // render list of places w/ FlatList
    return (
        <FlatList 
            style={styles.list}
            data={places}
            keyExtractor={(item) => item.id} //point to the id from each item
            // render an PlaceItem component that has the place the item as whole
            renderItem={({item}) => (
            <PlaceItem 
                place={item} 
                // when select, the selectPlaceHandler will receive as first argument the place.id
                onSelect={selectPlaceHandler}
            />
            )} 
        />
    );
};

export default PlacesList;

const styles = StyleSheet.create({
    list: {
        margin: 14
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    },  
});