import { useCallback, useState, useLayoutEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
// mapView package, run: expo install react-native-maps
import MapView, { Marker } from 'react-native-maps';

import IconButton from '../components/UI/IconButton';

function Map({ navigation, route }) {
    
    // set the intial location if there's params, else set to unidefined
    const initialLocation = route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
    };
    // set the selected location to be as initialLocation as the default of the state
    // once we've gather already the info from the params IF THERE'S ONE, else it's undefined
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    // by doing this, we can view the marker when clicked in the view map from our PlaceDetail screen
    
    const region = {
        // will define the center of the map
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        // will define how much content besides the center will be visible
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    
    function selectLocationHandler(event) {
        // if we do have an initial location, so we're in read mode only
        if (initialLocation) { // just return teh function 
          return;
        }
        // take the location from the api, lat and lng, and save it
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        // pass that location to the state handler
        setSelectedLocation({ lat: lat, lng: lng });
      }
      
    /*
        variable that holds a function to save the location
        the useCallBack is used to hep ensure that a function defined inside
        of a component is not recreated unnecessarily
        */
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) { // check if location has NOT been picked
            Alert.alert( // send an alert if that's the case
            'No location picked!', 
            'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }
        // RN knows that we're going back, than it will display back, and then
        // we've passed the info of lat and lng 
        navigation.navigate('AddPlace', {
            // pass data back
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        });
        // keep track of those two variables, if they change, only then, this function
        // will change
    }, [navigation, selectedLocation]); 

    /*
        code to execute before render this Map screen
        in our case we want to add an topRight button in the header and then
        call the function savePickedLocationHandler but in since it's a function, we needed 
        to modify it as a constant that point to a function and add the useCallBack to avoid
        infinite loops and unecessary re-executions
    */
    useLayoutEffect(() => {
        // if an initial location is defined, do nothing
        // in this case it'll happen when we're on the place details screen we don't want the save button
        if(initialLocation) {
            return;
        }
        navigation.setOptions({
            headerRight: ({tintColor}) => (
                <IconButton 
                    icon='save'
                    size={24}
                    color={tintColor}
                    onPress={savePickedLocationHandler}
                />
            ),
        });
        // keep track those two things
    }, [navigation, savePickedLocationHandler, initialLocation])


    return (
        <MapView 
            style={styles.map} 
            initialRegion={region} 
            onPress={selectLocationHandler}
        >
        {/* if selectedLocation is DEFINED then render this Marker component */}
           {selectedLocation && (
            <Marker 
                    title="Picked Location"
                    coordinate={{
                        latitude: selectedLocation.lat, 
                        longitude: selectedLocation.lng
                    }}
                />
            )}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});