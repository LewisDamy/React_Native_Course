import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert, 
    FlatList,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';



const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);//round it up
    max = Math.floor(max); // round it down
    //give random integer number between min and max 
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude) { // if we guess the number right away
        return generateRandomBetween(min, max, exclude); // generate again
    } else { // if the first rndNum is not the of the beggining
        return rndNum; 
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}> 
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText> 
    </View>
);


const GameScreen = props => {


    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    // useState to keep track of the guesses from the computer 
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

   // const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    //    Dimensions.get('window').width);
    const [availableDeviceHight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height);

    // const number that aren't modify when we re-render the component
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    
    const { userChoice, onGameOver } = props; //object deestructuring 

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });


    useEffect(() => { // function by default runs after every render cycle of this component
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]); 
    //whenever anything else in the props changes this effect will rerun

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) ||
        direction === 'greater' && currentGuess > props.userChoice) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', 
            [{text: 'Sorry!', style: 'cancel'}
        ]);
        return;
        }
        if (direction === 'lower') {
            // change the value of the currentHigh (which is an object in React) because it's the new higher
            currentHigh.current = currentGuess; 
        } else {
            currentLow.current = currentGuess + 1;
        }
        // generating new random number with new upper and lower bound excluding 
        const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess
        );
        setCurrentGuess(nextNumber); // update the currentGuess
        //setRounds(curRounds => curRounds + 1);
        //
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    if (availableDeviceHight < 500) {
        return (
            <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                    <NumberContainer> {currentGuess} </NumberContainer>
                    <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white'/>
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    <FlatList 
                        keyExtractor={(item) => item}
                        data={pastGuesses} 
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                    />
                </View>
        </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <NumberContainer> {currentGuess} </NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MainButton  onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                    <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white'/>
                    </MainButton>
                </Card>
                <View style={styles.listContainer}>
                    <FlatList 
                        keyExtractor={(item) => item}
                        data={pastGuesses} 
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                    />
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10, 
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', //add space between buttons
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        // condition to check the height of the device, if it's > 600, set to 20, else 10
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 25,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%', 
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 400 ? '60%' : '80%'
    }, 
});

export default GameScreen;