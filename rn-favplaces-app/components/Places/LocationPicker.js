import { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Image, Text } from 'react-native';
// run expo install expo-location
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getAddress, getMapPreview } from '../../util/location';

function LocationPicker({onPickLocation}) {

    // useRoute to get hold of route params so we can get data passed from another screen to this screen
    const route = useRoute();

    // navigation hook to change to bigger map screen 
    const navigation = useNavigation();

    // state to save the location picked
    const [pickedLocation, setPickedLocation] = useState();

    /* 
        If we move from the screen component that this component is connected, the AddPlace, to another one
        this hook will be false, otherwise, aka, if the screen been displayed is the one that has this component
        then it's true. 
        So that the useEffect can be used 
    */
    const isFocused = useIsFocused();

    // hook to use ask location permission
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    
    // effect should rerun whenever the value mapPickedLocation changes, so we update the state
    useEffect(() => {
        // check if we're in the screen that this component is, aka the, AddPlace, and if there's params == true
        if(isFocused && route.params) {
            // get the lat & lng parameters from another screen if there's one
            const mapPickedLocation = { 
                lat: route.params.pickedLat, 
                lng: route.params.pickedLng 
            };
            // if so, define the state of the location as an obj with lat & lng
            setPickedLocation(mapPickedLocation);
        }
        
        // know we should be able to see the PREVIEW of the location that we've picked in the map screen 
    }, [route, isFocused]);
    

    // to avoid infinite loops, we wrapped the pickLocationHandler from PlaceForm component with useCallBack
    useEffect(() => {

        // add helper function to wait for the http response
        async function handleLocation() {
            if (pickedLocation) {                
                // make the HTTP resquest from the google API by passing the latitute and longitude
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                
                /* 
                    pass to the PlaceForm an object that has the lat & lng as well as the human readable address
                    from our API call 9that the user've picked so we can use in the other component 
                */
                onPickLocation({ ...pickedLocation, address: address });
            }
        }
        // call the async function to get the address
        handleLocation();

    }, [pickedLocation, onPickLocation])




    // async function to wait for the permission
    async function verifyPermission() {
        // check if the permission is still undetermined
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            // if that's the case, then ask permission
            const permissionResponse = await requestPermission();
            // return TRUE if granted, and FALSE if not
            return permissionResponse.granted;
        }
        // if permission not allowed
        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            // send an alert to the user
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    };


    async function getLocationHandler() {
        // call and await to the boolean value of the user permission
        const hasPermission = await verifyPermission();
        // if we don't have permission
        if(!hasPermission) {
            // return aka terminate the function 'cause we don't have permission
            return;
        }
        // variable to receive the location as an Object
        const location = await getCurrentPositionAsync();
        // define the picked location with useState
        setPickedLocation({
            // pass as the lat and lng coords to the state as new object     
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });

        console.log(location);
    };

    // funct to open the Map.js screen component to make the map bigger
    function pickOnMapHandler() {
        navigation.navigate('Map');
    };

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation) {
        /* 
            pass the source as an uri which will be the coordinates from the state
            and then run in the location.js file in which it'll call the googleMaps API
            then receive the uri of the image in the map
        */
        locationPreview = (<Image 
            style={styles.image}
            source={{
                uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)
            }}
        />);
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      overflow: 'hidden'
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      // borderRadius: 4
    },
  });