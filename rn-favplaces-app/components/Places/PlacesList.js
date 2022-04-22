import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

function PlacesList({ places }) {

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
            renderItem={({item}) => <PlaceItem place={item}/>} 
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