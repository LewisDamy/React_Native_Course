// run expo install expo-image-picker
// must add config plugin in app.json!
import { Alert, Button, View, Image, Text, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';



function ImagePicker() {

    // store the state of the image to display the preview of it
    const [pickedImage, setPickedImage] = useState();

    // hook to use ask camera permission
    const [cameraPermissionInfo, requestPermission ] = useCameraPermissions();
    // async function to wait for the permission
    async function verifyPermission() {
        // check if the permission is still undetermined
        if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            // if that's the case, then ask permission
            const permissionResponse = await requestPermission();
            // return TRUE if granted, and FALSE if not
            return permissionResponse.granted;
        }
        // if permission not allowed
        if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
            // send an alert to the user
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        // call and await to the boolean value of the user permission
        const hasPermission = await verifyPermission();
        // if we don't have permission
        if(!hasPermission) {
            // return aka terminate the function 'cause we don't have permission
            return;
        }

        // function return a promise
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        }); 
        // pass to the state the image uri (local locationi of the image)
        setPickedImage(image.uri);
    };
    // default text if no image picked
    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) { // check wether we've picked a photo
        // if so, then load the Image preview component
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />
    } // else, display the text No image taken


    return (
        <View>
            <View style={styles.imagePreview}>
                {/* point the source of the image preview to the uri that we've chosen */}
                {imagePreview}
            </View>
            <OutlinedButton 
                icon='camera'      
                onPress={takeImageHandler}
                children='Take Image'
            />
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    },
});