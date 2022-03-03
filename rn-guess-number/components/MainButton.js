import React from 'react';
import { 
View, 
Text, 
StyleSheet, 
TouchableOpacity, 
TouchableNativeFeedback,
Platform
} from 'react-native';

import Colors from '../constants/colors'

const MainButton = props => {

    // save an component in a variable, by default this type is for iOS
    let ButtonComponent = TouchableOpacity;
    // check if the platform is android and the version
    if(Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;// modify the type of touchable
    }

    // it will return TOuchableOpacity for iOS and NativeFeedBack for Android
    return(
        <Text style={styles.buttonContainer}>
            <ButtonComponent onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </Text>
    );
};
 
const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,// only for Android
        //overflow: 'hidden'//clipt the ripple effect the button
    },  
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;