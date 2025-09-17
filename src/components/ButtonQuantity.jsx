import { useState } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import LatoText from './LatoText'
import { colors } from '../global/colors'

const ButtonQuantity = ({ onChange, initial = 1, min = 1 }) => {
  const [quantity, setQuantity] = useState(initial)

  const handleIncrease = () => {
    setQuantity(prev => {
      const newValue = prev + 1
      onChange?.(newValue)
      return newValue
    })
  }

  const handleDecrease = () => {
    setQuantity(prev => {
      if (prev > min) {
        const newValue = prev - 1
        onChange?.(newValue)
        return newValue
      }
      return prev
    })
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.circleButton} onPress={handleDecrease}>
        <LatoText weight="bold" style={styles.buttonText}>-</LatoText>
      </Pressable>

      <LatoText weight="bold" style={styles.quantityText}>{quantity}</LatoText>

      <Pressable style={styles.circleButton} onPress={handleIncrease}>
        <LatoText weight="bold" style={styles.buttonText}>+</LatoText>
      </Pressable>
    </View>
  )
}

export default ButtonQuantity

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 12
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard, // botón neutro sobre fondo claro/oscuro
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  buttonText: {
    fontSize: 18,
    color: colors.textPrimary
  },
  quantityText: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: 18,
    color: colors.textPrimary
  }
})
