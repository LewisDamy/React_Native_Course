import React, { useState }from 'react';
import { 
    View, 
    TextInput, 
    Button, 
    StyleSheet,
    Modal 
} from 'react-native';

const GoalInput = props => {
    //useState to keep track of the user input
    const [enteredGoal, setEnteredGoal] = useState('');

    //create an function to handle the user input
    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
      props.onAddGoal(enteredGoal);
      setEnteredGoal('');
  }


    return (
    <Modal visible={props.visible} animationType='slide'>
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Course Goal' 
                style={styles.input} 
                onChangeText={goalInputHandler}//for every keystroke call this function
                value={enteredGoal}
            />
            <View style={styles.ButtonContainer}>
                <Button title='CANCEL' color='red' onPress={props.onCancel} />
                <Button title='ADD' onPress={addGoalHandler} style={styles.addButton} /> 
            </View>
        </View>
    </Modal>
    );
}


const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    input: {
        width: '80%', 
        borderColor: 'black', 
        borderWidth: 1, 
        padding: 10, 
        marginBottom: 10
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    }
});

export default GoalInput;