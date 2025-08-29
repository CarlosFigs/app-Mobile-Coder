import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Categories, Product, Products } from "../../screens"
import Header from '../../components/Header'

const Stack = createNativeStackNavigator()

const ShopStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='categorias'
      screenOptions={{
        header: ({route})=>(<Header title="Tienda" subtitle={ route.name } />),
      }}
    >
      <Stack.Screen name='categorias' component={Categories} />
      <Stack.Screen name='Productos' component={Products} />
      <Stack.Screen name='Producto' component={Product} />
    </Stack.Navigator>
  )
}

export default ShopStackNavigation
