import { View, Text, StyleSheet } from 'react-native';

// component to list all the informations about one food
function List({ data }) {
    return(
        data.map((dataPoint) => ( //map each string text of info and 
            // display as a text wrapped in a view
            <View key={dataPoint} style={styles.listItem}>
                <Text style={styles.itemText}>{dataPoint}</Text>
            </View>
        ))
    );
};

export default List;

// add styles
const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal:  12,
        backgroundColor: 'gray'
    },
    itemText: {
        color: 'black',
        textAlign: 'center'
    }
});