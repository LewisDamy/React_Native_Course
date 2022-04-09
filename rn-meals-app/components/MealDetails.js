import { View, Text, StyleSheet } from 'react-native'

// props with object deestructuring to get the info of duration/complexity/affordability
function MealDetails({ duration, complexity, affordability, style, textStyle }) {
    return(
        // using cascading styles  
        <View style={[styles.details, style]}>
            <Text style={[styles.detailItem, textStyle]}>{duration}m</Text>
            <Text style={[styles.detailItem, textStyle]}>{complexity.toUpperCase()}</Text>
            <Text style={[styles.detailItem, textStyle]}>{affordability.toUpperCase()}</Text>
        </View>
    );
};

export default MealDetails;

const styles = StyleSheet.create({
    detailItem: {
        marginHorizontal: 14, //pixels
        fontSize: 12
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', //center the child, the detailItems
        padding: 8
    }
});

