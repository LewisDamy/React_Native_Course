import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    /*
        React Hook to keep track of multiple values by an object

        defaultValues will be UNDEFINED when we're adding an new expense
        and DEFINED when we're only on editing mode
        In order to do that we're checking if defaultValues are defined with '?'
        and if it's true, we set as default state to a string and if not, set to 
        an empty string
        We've added an object for each input so that we know if the amount, date, 
        or description is valid for true as default so that we don't display the error
        of invalid form right from the beggining
    */ 
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    // function to handle the amount value by receiving the value enterend
    // as well as the input which the user wants to change
    function inputChangedHandler(inputIdentifier, enteredValue) {
        // function to modify the state 
        setInputs((curInputs) => {
            // return the updated object by spreading all my curInputValues
            // but overwriting that one value that has ben modified or multiple ones
            return {
                ...curInputs,
                /* 
                    standard JS that allows to target property dynamically
                    In this case, the property name we're setting is not 
                    inputIdentifier, but the value stored in inputIdentifier.
                    So that this allows us to dynamically target and set property
                    names.
                    Set default isValid to true, and later check if the value
                    just inserted is actually valid
                */
                [inputIdentifier]: { value: enteredValue, isValid: true }
            };
        });
    };

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value, //'+' convert string to number
            date: new Date(inputs.date.value), // convert date string into date object
            description: inputs.description.value 
        };

        // make validation in order to prevent user to insert or leave some input blank
        // check whether the amount is not an number and if it's not 0
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        // if when creating an new Date() it'll return 'Invalid Date' if not correct
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        // check if not empty the description by removing the space at start or end
        // and checking if the size is > 0
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // update the state, but only the isValid for the one that we've just 
            // validated, in order to modify to false, if the user enter incorrect
            setInputs((curInputs) => {
                return {
                    // update the isValid field to our value that hold that validation
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { 
                        value: curInputs.description.value, 
                        isValid: descriptionIsValid 
                    },
                };
            });
            return; 
        }
        // should hold a value that is a function that wants this expenseData 
        // for using in the ManageExpense.js file 
        onSubmit(expenseData);

    };

    // if one of those inputs is not valid, then I know that the overall form
    // is not valid aka, invalid
    const formIsInvalid = 
        !inputs.amount.isValid || 
        !inputs.date.isValid || 
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label="Amount"
                    invalid={!inputs.amount.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: 'web-search',
                        placeholder: 'Price',
                        // the second arg, enteredValue is passed automatically
                        // by using bind it's pointing at the first argument, when
                        // the function is activated
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        // whenever we change the amountValue
                        // it'll reflect in the amount value from the object in our state
                        value: inputs.amount.value
                    }}
                />
                <Input 
                    label="Date"
                    invalid={!inputs.date.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        // keep default keyboard
                        placeholder: 'YYYY-MM-DD', 
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input 
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    // keep default keyboard
                    placeholder: 'Enter here the description of the expense',
                    multiline: true,
                    autoCorrect: false,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {formIsInvalid && 
                <Text style={styles.errorText}>
                    Invalid input values - Please check your entered data!
                </Text> 
            }
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>
                    Cancel
                </Button>

                {/* If isEditing === true, display 'Update', else 'Add' in screen */}
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },

});