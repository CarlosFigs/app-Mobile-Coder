import { StyleSheet, Text, View } from 'react-native'
import { Login, Signup } from '../../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Header } from 'react-native/Libraries/NewAppScreen'

const Stack = createNativeStackNavigator()

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName='Login'
    screenOptions={{
      headerShown:false
    }
    }
    >
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Signup' component={Signup}/>
    </Stack.Navigator>
  )
}

export default AuthStackNavigation

const styles = StyleSheet.create({})