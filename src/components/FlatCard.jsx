import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors'

// Componente wrapper
const FlatCard = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>
}

export default FlatCard

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    // Sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // Sombra Android
    elevation: 3,
  },
})
