import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {  } from 'react-native';

import PlacesList from '../components/Places/PlacesList';

function AllPlaces({ route }) {
    // state to keep track of the loaded places 
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    // hook to know whether the user is on this screen aka "it's focused in here"
    const isFocused = useIsFocused();

    // useEffect to know when the route parameters passed from AddPlace screen to here
    useEffect(() => {
      // if the isFocused is true and the parameters have already received from the other screen
      if (isFocused && route.params) {
        // update my list of places to include the new place, handled by the useState
        setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
      }
    }, [isFocused, route]);
  
    return <PlacesList places={loadedPlaces} />;
  }
  
  export default AllPlaces;