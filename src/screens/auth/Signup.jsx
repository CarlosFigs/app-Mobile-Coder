import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Alert } from 'react-native'
import { colors } from '../../global/colors'
import { useEffect, useState } from 'react'
import { useSignupMutation } from '../../services/authApi'
import Loader from '../../components/Loader'

const textInputWidth = Dimensions.get('window').width * 0.7
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [triggerSignup, result] = useSignupMutation()

    const onSubmit = () => {
        setErrorMessage("")

        if (!email || !password || !confirmPassword) {
            setErrorMessage("Completa todos los campos.")
            return
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("El formato del correo no es válido.")
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.")
            return
        }

        triggerSignup({ email, password, returnSecureToken: true })
    }

    useEffect(() => {
        if (result.status === "fulfilled") {
            Alert.alert(
                "Cuenta creada",
                "Tu cuenta fue creada con éxito. Ahora inicia sesión.",
                [{ text: "OK", onPress: () => navigation.replace("Login") }]
            )
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        } else if (result.status === "rejected" && result.error) {
            const firebaseError = result.error?.data?.error?.message
            switch (firebaseError) {
                case "EMAIL_EXISTS":
                    setErrorMessage("Ya existe una cuenta con este correo.")
                    break
                case "INVALID_EMAIL":
                    setErrorMessage("El correo no es válido.")
                    break
                default:
                    setErrorMessage("No se pudo crear la cuenta. Intenta nuevamente.")
                    break
            }
        }
    }, [result])

    return (
        <View style={styles.container}>
            <Loader visible={result.isLoading} />

            <Text style={styles.title}>Tienda</Text>
            <Text style={styles.subTitle}>Crear cuenta</Text>

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
                <TextInput
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text)
                        if (errorMessage) setErrorMessage("")
                    }}
                    placeholderTextColor={colors.textSecondary}
                    placeholder='Confirmar Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={styles.footTextContainer}>
                <Text style={styles.secondaryText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.replace('Login')}>
                    <Text style={[styles.secondaryText, styles.underLineText]}>
                        Inicia sesión
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
                    {result.isLoading ? "Creando..." : "Crear cuenta"}
                </Text>
            </Pressable>
        </View>
    )
}

export default SignupScreen

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
        color: colors.textSecondary,
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
    }
})
