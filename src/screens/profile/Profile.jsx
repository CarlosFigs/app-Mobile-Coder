import { Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react'
import CameraIcon from '../../components/CameraIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from "expo-image-picker"
import { usePutProfilePictureMutation } from '../../services/profileApi'
import { setProfileImage } from '../../store/slice/userSlice'
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"

const Profile = () => {
    // const [image, setImage] = useState("") el local state lo remplazamos por el userSlice para traer la informacion desde fireBase con los metodos en profileApi
    // const [errorMsg, setErrorMsg] = useState("")
    const [location, setLocation] = useState(null)
    const [address, setAddress] = useState("")
    const [locationLoaded, setLocationLoaded] = useState(false)

    const user = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localID)
    const image = useSelector(state => state.userReducer.image)

    const dispatch = useDispatch()
    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()

    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        })
        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setProfileImage(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })
        }
    }

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                //Pido permisos:
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log("Error al obtener los permisos")
                    setLocationLoaded(true);
                    return;
                }


                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GMAPS_API_KEY}`
                    );
                    const data = await response.json()
                    setAddress(data.results[0].formatted_address)
                    console.log("Location:",location)
                    setLocation(location);
                }
            } catch (error) {
                console.log("Error al obtener la ubicación:", error);
            } finally {
                setLocationLoaded(true);
            }
        }

        getCurrentLocation();
    }, []);

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image ? <Image source={{ uri: image }} resizeMode="cover" style={styles.profileImage} />
                        : <Text style={styles.profilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]}>
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email:{user}</Text>
            <View style={styles.mapContainer}>
                {
                    location
                        ?
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }} title={"Tienda"} />
                        </MapView>
                        :
                        (
                            locationLoaded
                                ?
                                <Text>Hubo un problema al obtener la ubicación</Text>
                                :
                                <ActivityIndicator />
                        )

                }
            </View>
            <View style={styles.placeDescriptionContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{address || ""}</Text>
                </View>
            </View>
        </View>

    )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer: {
        paddingTop: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePlaceHolder: {
        color: colors.white,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    mapContainer: {
        width: '100%',
        height: 240,
        overflow: "hidden",
        elevation: 5,
        marginBottom: 16
    },
    map: {
        height: 300,
    },
    mapTitle: {
        fontWeight: '700'
    },
    placeDescriptionContainer: {
        flexDirection: 'row',
        gap: 16
    }
})