import { View, Pressable, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Button({ children, onPress, mode, style }) {
    return(
        <View style={style}>
            <Pressable 
                onPress={onPress} 
                style={({pressed}) => pressed && styles.pressed}>
                {/* 
                    I want to check this mode prop, and if it's equals
                    to flat style, then I want to override the background
                    color to the styles.flat which has a transparent color.
                    Same for the Text styles.
                */}
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },  
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 6
    }
});