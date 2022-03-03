import React, { useState, useEffect } from 'react';
import {  
    View, 
    StyleSheet, 
    Button,
    TouchableWithoutFeedback,
    Keyboard, 
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
 
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });




    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue); // transform string to int
        if(isNaN( chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;//if the num is null or greater than 99 or less or equals then 0
        }
        setConfirmed(true); // confirm that we've entered an number
        setSelectedNumber(chosenNumber); // define the selected number
        setEnteredValue(''); // empty the text box
        Keyboard.dismiss(); //dismiss keyboard after inserting the number
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <View>
                <NumberContainer> {selectedNumber} </NumberContainer>
            </View>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                START GAME
            </MainButton>
        </Card>
        );
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30} >
                <TouchableWithoutFeedback onPress={() => { 
                    // component to handle touch anywhere scree
                    Keyboard.dismiss(); 
                    //if you touch anywhere in the screen, disable the keyboard
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText style={styles.text}> Select a Number</BodyText>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                autCaptalize='none' // no captalize letters
                                autoCorrect={false} // don't autocorrect
                                keyboardType='number-pad' //number keyboard
                                maxLength={2} //maximum numbers allowed
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button 
                                        title='Reset' 
                                        onPress={resetInputHandler} 
                                        color={Colors.accent}
                                    />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button 
                                        title='Confirm' 
                                        onPress={confirmInputHandler} 
                                        color={Colors.start}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, //take all the space available
        padding: 10, //content doesn't sit directly to the edges
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
         marginVertical: 10,
         fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%', //default 
        //maxWidth: '80%',
        maxWidth: '95%', //our container will never leave the screen
        minWidth: 300, // min width in a super small screen
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
});
export default StartGameScreen;