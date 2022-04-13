import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';


function ManageExpense({ route, navigation }) {

    // value that gives us our ExpensesContext with React
    const expenseCtx = useContext(ExpensesContext);

    /* 
        need to check whether the page was open in order to edit
        or to add a new expense item, so that we open the stack 
        navigator in a different format.
        In order to do that, we're passing the ID of the expense, 
        to know if we're editing then we have one, and if not, then
        we're adding
    */  

    // same name used "expenseId" used in ExpenseItem.js when passing the Id!
    // the "?" will be used to check whether there's an value in expenseId or not 
    const editedExpenseId = route.params?.expenseId; 
    // convert the editedExpenseId to a boolean value
    const isEditing = !!editedExpenseId; 

    // use layoutEffect to control when the function navigation should be
    // re-executed whether the navigation or isEditing var changes
    useLayoutEffect(() => {
        navigation.setOptions({
            // add the title dynamically
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpensehandler() {
        // calling the function from our expenses-context in order to delete the expense
        // then we passed as arg the value of our ID to be deleted
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    };

    function cancelHandler() {
        // goBack() means to go back to the screen that opended that screen
        navigation.goBack();
    };

    function confirmHandler() {
        if (isEditing) { // check if we're editing
            expenseCtx.updateExpense(
                editedExpenseId, // passing the id as first value to be updated
                { // passing dummy data:
                    description: 'Test Update new expense',
                    amount: 39.90,
                    date: new Date('2022-04-20')
                } // if so, then use the update function    
            ); 
        } else { // else we're adding an expense
            expenseCtx.addExpense(
                { // passing dummy data
                    description: 'Test Add new expense',
                    amount: 19.90,
                    date: new Date('2022-04-19')
                }
            ); // call the add function and pass some dummy data 
        }
        navigation.goBack();
    };

    return(
        <View style={styles.container}> 
            {/* Add the custom Form for getting the userInput */}
            <ExpenseForm /> 
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>
                    Cancel
                </Button>

                {/* If isEditing === true, display 'Update', else 'Add' in screen */}
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
            
            {/* When isEditing === true, display this trash button */}
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon='trash'
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpensehandler}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
});
