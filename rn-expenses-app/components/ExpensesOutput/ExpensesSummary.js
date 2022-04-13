import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({ expenses, periodName }) {
    /* 
        this var will keep the list of expenses received as props
        and then use the reduce to combine multiple values in an 
        array int oa single value.
        This function pass as arguments the value that will save 
        the sum, and the object of our list of sums, in the expense.amount
        which is defined as the value to be sum will be incremented 
        in each execution
    */
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount //values to be passed in the next reduce execution
    }, 0); //def starting value of sum = 0

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>$ {expensesSum.toFixed(2)} {/* Print 2 fixed decimals */}</Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'  
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
});