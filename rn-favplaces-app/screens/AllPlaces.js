import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {  } from 'react-native';

import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../util/database';

function AllPlaces({ route }) {
    // state to keep track of the loaded places 
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    // hook to know whether the user is on this screen aka "it's focused in here"
    const isFocused = useIsFocused();

    // useEffect to know when the route parameters passed from AddPlace screen to here
    useEffect(() => {
      // async funct to run and wait for the data from the DB
      async function loadPlaces() {
        // fetch our places from the DB 
        const places = await fetchPlaces();
        // pass the places fetched from the database to be the state in the correctly formmatted place objects
        setLoadedPlaces(places);
      }
      // if the isFocused is true and the parameters have already received from the other screen
      if (isFocused) {  
        // call the helper function to bring the data from db
        loadPlaces();

        // update my list of places to include the new place, handled by the useState
        // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
      }
    }, [isFocused]);
  
    return <PlacesList places={loadedPlaces} />;
  }
  
  export default AllPlaces;