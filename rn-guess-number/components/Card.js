import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = props => {
    return(
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        // shadow style only works in iOS!
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // for Android:
        // elevation 5, 
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10 //borders of the shadow become rounded
    }
});

export default Card;