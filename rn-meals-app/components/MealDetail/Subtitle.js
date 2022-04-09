import { View, Text, StyleSheet } from 'react-native';

// display the subtitle of some info such as ingredients, or steps
// with respective styles
function Subtitle({ children }) {
    return(
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{children}</Text>
        </View>
    );
};

export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitleContainer: {
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        padding: 6,
        margin: 4,
        marginHorizontal: 12
    }  
});