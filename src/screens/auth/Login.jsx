import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch } from 'react-native'
import { colors } from '../../global/colors'
import { useEffect, useState } from 'react'
import { useLoginMutation } from '../../services/authApi'
import { useDispatch } from 'react-redux'
import { setUserEmail, setLocalId } from '../../store/slice/userSlice'
import LatoText from '../../components/LatoText'
import Loader from '../../components/Loader'
import { clearSession, saveSession } from '../../DB'

const textInputWidth = Dimensions.get('window').width * 0.7
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [peristSession, setPeristSession] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [triggerLogin, result] = useLoginMutation()
    const dispatch = useDispatch()

    const onSubmit = () => {
        setErrorMessage("")

        if (!email || !password) {
            setErrorMessage("Por favor ingresa tu correo y contraseña.")
            return
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("El formato del correo no es válido.")
            return
        }
        triggerLogin({ email, password, returnSecureToken: true })
    }

    useEffect(() => {
        const guardarDb = async () => {
            if (result.status === "rejected" && result.error) {
                const firebaseError = result.error?.data?.error?.message
                if (firebaseError) {
                    setErrorMessage("Hubo un error en la clave o en el correo")
                }
            }

            if (result.status === "fulfilled") {
                try {
                    //de esta manera aunque el switch de "mantener sesion" no este en true igual se ingresa a la app
                    dispatch(setUserEmail(result.data.email))
                    dispatch(setLocalId(result.data.localId))
                    if (peristSession) {
                        // si y solo si el switch esta en true ingresa y luego graba la session en la DB
                        await saveSession(result.data.localId, result.data.email)
                    } else {
                        clearSession()
                    }

                    setEmail("")
                    setPassword("")
                } catch (error) {
                    console.log(error)
                }
            }
        }
        guardarDb()
    }, [result])


    return (
        <View style={styles.container}>
            <Loader visible={result.isLoading} />

            <Text style={styles.title}>Tienda</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text.trim().toLowerCase())
                        if (errorMessage) setErrorMessage("")
                    }}
                    placeholderTextColor={colors.textSecondary}
                    placeholder="Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text)
                        if (errorMessage) setErrorMessage("")
                    }}
                    placeholderTextColor={colors.textSecondary}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={styles.footTextContainer}>
                <Text style={styles.secondaryText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={[styles.secondaryText, styles.underLineText]}>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable
                style={[
                    styles.btn,
                    result.isLoading && { backgroundColor: colors.disabled }
                ]}
                onPress={onSubmit}
                disabled={result.isLoading}
            >
                <Text style={styles.btnText}>
                    {result.isLoading ? "Iniciando..." : "Iniciar sesión"}
                </Text>
            </Pressable>
            <View style={styles.rememberMe}>
                <LatoText weight='light' style={styles.rememberMeText}>¿Mantener sesion?</LatoText>
                <Switch
                    onValueChange={() => setPeristSession(!peristSession)}
                    value={peristSession}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.backgroundDark
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.textPrimary,
        marginBottom: 5
    },
    subTitle: {
        fontSize: 20,
        color: colors.textSecondary,
        marginBottom: 20
    },
    inputContainer: {
        gap: 15,
        marginBottom: 10
    },
    textInput: {
        width: textInputWidth,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        color: colors.textPrimary,
        fontSize: 16,
        paddingVertical: 5
    },
    errorText: {
        color: colors.error,
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
        width: textInputWidth
    },
    btn: {
        backgroundColor: colors.accentCrimson,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10
    },
    btnText: {
        color: colors.textOnAccent,
        fontWeight: "bold",
        fontSize: 16
    },
    footTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10
    },
    secondaryText: {
        color: colors.textSecondary,
        marginRight: 5
    },
    underLineText: {
        textDecorationLine: "underline"
    },
    rememberMe: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    rememberMeText: {
        color: colors.textSecondary
    }
})
