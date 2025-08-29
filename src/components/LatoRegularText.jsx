import { StyleSheet, Text} from 'react-native'

const LatoRegularText = ({ children }) => {
    return (
        // Esto seria un componente wrapper para poder envolver los componentes que necesito que tengan este texto.. lo mismo con otros textos
        <Text style={{ fontFamily: "LatoRegular" }}>{children}</Text>
    )
}

export default LatoRegularText

const styles = StyleSheet.create({})