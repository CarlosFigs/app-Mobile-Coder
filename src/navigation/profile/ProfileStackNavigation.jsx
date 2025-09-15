import { StyleSheet, Text, View } from 'react-native'
import { Profile } from '../../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../components/Header'

const Stack = createNativeStackNavigator()

const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName='Perfil'
    screenOptions={{
      header:({route})=>(<Header title="Tienda" subtitle={"Perfil"}/>)
    }}
    >
      <Stack.Screen name='Perfil' component={Profile}/>
    </Stack.Navigator>
  )
}

export default ProfileStackNavigation

const styles = StyleSheet.create({})