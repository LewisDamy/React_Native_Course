import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Image,
    Dimensions,
    ScrollView
} from 'react-native';


import BodyText from '../components/BodyText'; 
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';


const GameOverScreen = props => {
    return (
            <ScrollView> 
                <View style={styles.screen}> 
                    <TitleText style={styles.gameOverText}> The Game is Over!</TitleText>
                    <View style={styles.imageContainer}> 
                        <Image 
                            //fadeDuration={1000}
                            style={styles.image} 
                            //source={require('../assets/success.png')}
                            source={{uri: 'https://s3.amazonaws.com/www.explorersweb.com/wp-content/uploads/2021/08/23231435/Mont-Blanc-from-Italy-c-V-Luca-Shutterstock-e1628215861985.jpg'
                        }}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}> Your phone needed
                                <Text style={styles.highlight}> {props.roundsNumber} </Text>
                                rounds to guess the number
                                <Text style={styles.highlight}> {props.userNumber} </Text>
                        </BodyText>
                    </View>
                    <MainButton onPress={props.onRestart}> NEW GAME </MainButton>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    gameOverText: {
        fontSize: 25
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: 150,
        overflow: 'hidden',//if anychild inside of the container
        //tries to break out of it, it's cut off
        marginVertical: Dimensions.get('window').height / 30
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20

    },  
    highlight: {
        color: Colors.primary
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default GameOverScreen;