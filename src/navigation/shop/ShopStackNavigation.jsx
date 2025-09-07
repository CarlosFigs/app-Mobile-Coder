import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Categories, Product, Products } from "../../screens"
import Header from '../../components/Header'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

const ShopStackNavigation = () => {
  const categorySelected= useSelector(state=>state.shopReducer.categorySelected)
  return (
    <Stack.Navigator
      initialRouteName='Categorias'
      screenOptions={{
        header: ({route})=>(<Header title="Tienda" subtitle={ route.name==="Categorias"?"Home":categorySelected } />),
      }}
    >
      <Stack.Screen name='Categorias' component={Categories} />
      <Stack.Screen name='Productos' component={Products} />
      <Stack.Screen name='Producto' component={Product} />
    </Stack.Navigator>
  )
}

export default ShopStackNavigation
