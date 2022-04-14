// component to manage my own custom input component
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

function Input({ label, style, textInputConfig, invalid }) {
    // var to save the input styles
    const inputStyles = [styles.input];
    // check if there's an text input config and inside of it
    // if there's a multiline === true, if so:
    if(textInputConfig && textInputConfig.multiline) {
        // increment the styles from that textinput to the inputMultiLine styles
        inputStyles.push(styles.inputMultiLine);
    }

    if (invalid) { //if true
        // push to the inputStyles this invalidInput style
        inputStyles.push(styles.invalidInput)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            {/* 
                Adding a generic prop, and spreading onto the TextInput,
                in order to avoid a lot of paramaters recieved in this 
                component, so instead the config shall be based in the 
                TexInput configs that are allowed (See Doc!)
            */}
            <TextInput  style={inputStyles} {...textInputConfig} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 10,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiLine: {
        minHeight: 100,
        textAlignVertical: 'top' 
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});

