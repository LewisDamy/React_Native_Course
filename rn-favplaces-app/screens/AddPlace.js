import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';

function AddPlace({ navigation }) {
    
    // function that handles the info coming from PlaceFrom as props
    async function createPlaceHandler(place) {
        // insert into database and wait for the response   
        await insertPlace(place);
        // just navigate to the allplaces screen
        navigation.navigate('AllPlaces');        
    }

    return (
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    );
};

export default AddPlace;

