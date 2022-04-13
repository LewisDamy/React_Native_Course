import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Input from './Input';

function ExpenseForm() {
    // React Hook to keep track of multiple values by an object
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    });

    // function to handle the amount value by receiving the value enterend
    // as well as the input which the user wants to change
    function inputChangedHandler(inputIdentifier, enteredValue) {
        // function to modify the state 
        setInputValues((curInputValues) => {
            // return the updated object by spreading all my curInputValues
            // but overwriting that one value that has ben modified or multiple ones
            return {
                ...curInputValues,
                /* 
                    standard JS that allows to target property dynamically
                    In this case, the property name we're setting is not 
                    inputIdentifier, but the value stored in inputIdentifier.
                    So that this allows us to dynamically target and set property
                    names.
                */
                [inputIdentifier]: enteredValue
            };
        });
    };

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label="Amount"
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: 'numeric',
                        // the second arg, enteredValue is passed automatically
                        // by using bind it's pointing at the first argument, when
                        // the function is activated
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        // whenever we change the amountValue
                        // it'll reflect in the amount value from the object in our state
                        value: inputValues.amount
                    }}
                />
                <Input 
                    label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        // keep default keyboard
                        placeholder: 'YYYY-MM-DD', 
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputValues.date
                    }}
                />
            </View>
            <Input 
                label="Description"
                textInputConfig={{
                    // keep default keyboard
                    multiline: true,
                    autoCorrect: false,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputValues.description
                }}
            />
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
    }
});