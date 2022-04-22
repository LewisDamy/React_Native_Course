import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import Button from '../UI/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

function PlaceForm({ onCreatePlace }) {
    // state to handle entered text in input field
    const [enteredTitle, setEnteredTitle] = useState('');

    // state for image selected
    const [selectImage, setSelectedImage] = useState();

    // state for picked location handler
    const [pickedLocation, setPickedLocation] = useState();

    // function to handle text from user and modify the state
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }
    // function to handle imageUri, that it's expected to get from the ImagePicker component
    function takeImageHandler(imageUri) {
      setSelectedImage(imageUri); //pass to our state component
    }

    /*
      function to handle location picked that it's expected to get from the LocationPicker component
      to avoid infinite loops on the useEffect from LocationPicker component,
      we wrapped the pickLocationHandler with useCallBack
    */
    const pickLocationHandler = useCallback((location) => {
      setPickedLocation(location)
    }, []);


    function savePlaceHandler() {
      // create new instance of Place object, to forward all the info to AddPlace via onCreatePlace props
      const placeData = new Place(
        enteredTitle, //pass the title
        selectImage, //pass the uri image from state
        pickedLocation, //pass the human readable address as well as the coordinates
      );
      // pass the instance placeData to the props on AddPlace.js component
      onCreatePlace(placeData);
    };

    return (
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={changeTitleHandler}
            value={enteredTitle}
          />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </ScrollView>
    );
  }

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});