import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';


function ManageExpense({ route, navigation }) {

    // value that gives us our ExpensesContext with React
    const expenseCtx = useContext(ExpensesContext);

    // useState to know whether we're loading data or not
    const [isSubmmiting, setIsSubmmiting] = useState(false);

    // useState to handle some errors
    const [error, setError] = useState();


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

    // function to check whether the expense we're currenctly looking at is the same as
    // the edited expenseId, then we know that this is the expense you wanna edit
    const selectedExpense = expenseCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
        );

    // use layoutEffect to control when the function navigation should be
    // re-executed whether the navigation or isEditing var changes
    useLayoutEffect(() => {
        navigation.setOptions({
            // add the title dynamically
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpensehandler() {
        // change the state to load the loadingOverlay component
        setIsSubmmiting(true);

        try {
            // HTTP function to delete an expense by getting its id
            await deleteExpense(editedExpenseId);
            // calling the function from our expenses-context in order to delete 
            // the expense then we passed as arg the value of our ID to be deleted
            expenseCtx.deleteExpense(editedExpenseId);
            // navigate to one page back
            navigation.goBack();

        } catch(error) {
            setError('Could not delete expense - please try again later!');
            // Need for change to false, 'cause if there's an error than, we must modify
            setIsSubmmiting(false);
        }

    };

    function cancelHandler() {
        // goBack() means to go back to the screen that opended that screen
        navigation.goBack();
    };

    // this function will recieve data from the ExpenseForm.js file when the
    // onSubmit is activated an then modify the Expense in our store
    async function confirmHandler(expenseData) {
        
        // change the state to load the loadingOverlay component
        setIsSubmmiting(true); //NO need to turn off, since we're going back in screen

        try {
            if (isEditing) { // check if we're editing
                
                // passing the id as first value to be updated
                expenseCtx.updateExpense(editedExpenseId, expenseData); 

                // HTTP function to update the firebase db by passing the data and id
                await updateExpense(editedExpenseId, expenseData);

            } else { // else we're adding an expense

                // calling the http request as POST and passing the paramethers
                // and waiting to receive the id and saved as id
                const id = await storeExpense(expenseData);
        
                // pass as arg to the addExpense funct the data and the id that've 
                // just received
                expenseCtx.addExpense({...expenseData, id: id}); 
            }
            navigation.goBack();

        } catch (error) { // if something went wrong
            // define in the state what could have happenned
            setError('Could not save data - please try again later!');
            // modify the submit state to false (couldn't be submmitted)
            setIsSubmmiting(false);
        };
    };

    if(error && !!isSubmmiting) {
        return (
            <ErrorOverlay message={error} />
        );
    }

    // check if isSubmmiting = true
    if(isSubmmiting) {
        // if so, load this component
        return(
            <LoadingOverlay />
        );
    }


    return(
        <View style={styles.container}> 
            {/* Add the custom Form for getting the userInput */}
            <ExpenseForm
                submitButtonLabel={isEditing ? 'Update' : 'Add'} 
                onCancel={cancelHandler} 
                // passing the expense new data from the 
                // ExpenseForm to the confirmHandler which
                // will manage through the update/add Expense functions
                onSubmit={confirmHandler} 
                // pass an default value for when we're editing the expense
                // it displays as default the values that were insert previously
                defaultValues={selectedExpense}
            />   
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },
});
