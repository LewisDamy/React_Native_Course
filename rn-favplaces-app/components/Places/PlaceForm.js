import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';

function PlaceForm() {
    // state to handle entered text in input field
    const [enteredTitle, setEnteredTitle] = useState();

    // function to handle text from user and modify the state
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    return (
            // scroll view instead of flatlist because we know the length of the items
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    onChange={changeTitleHandler} 
                    value={enteredTitle}
                    style={styles.input}
                />
            </View>
            <ImagePicker />
        </ScrollView>
    );
};

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2, 
        backgroundColor: Colors.primary100
    }

});