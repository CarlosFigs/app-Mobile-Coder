import { StyleSheet, Text, View } from 'react-native'
import Cart from '../../screens/cart/Cart'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../components/Header'

const Stack = createNativeStackNavigator()

const CartStackNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName='Carrito'
    screenOptions={{
      header:({route})=>(<Header title="Tienda" subtitle={route.name}/>)
    }}
    >
      <Stack.Screen name='Carrito' component={Cart}/>
    </Stack.Navigator>
  )
}

export default CartStackNavigation

const styles = StyleSheet.create({})