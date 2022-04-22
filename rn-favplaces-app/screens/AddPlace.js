import { View, Text, StyleSheet } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';

function AddPlace({ navigation }) {
    
    // function that handles the info coming from PlaceFrom as props
    function createPlaceHandler(place) {
        navigation.navigate('AllPlaces', {
            place: place //pass the data place to the AllPlaces screen through route parameters
        });        
    }

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
};

export default AddPlace;

