import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import OutlinedButton from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../util/database';

function PlaceDetails({ route, navigation }) {
    // state to handle the data from the database fetched with the query funct
    const [fetchedPlace, setFetchedPlace] = useState();

    // funct to display minimap in this place detail screen
    function showOnMapHandler() {
        navigation.navigate('Map', {
          initialLat: fetchedPlace.location.lat,
          initialLng: fetchedPlace.location.lng,
        });
      }
    // get from the route passed from the PlaceList as param the place Id of the item
    const selectededPlaceId = route.params.placeId;

    useEffect(() => {
        // use selectedPlace Id to fetch data for a single place
        // async function to wait for the db response
        async function loadPlaceData() {
            // make the call for the DB with the fetchPlaceDetails function by passing the id selected
            const place = await fetchPlaceDetails(selectededPlaceId);
            // save the place from the query response to the state 
            setFetchedPlace(place);
            // add the title as an option from the navigation config as the title that the user selected
            // once this place details screen is created
            navigation.setOptions({
                title: place.title
            });
        }
        loadPlaceData();

    }, [selectededPlaceId]);

    if(!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>
    );
};

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})