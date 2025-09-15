import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Feather"
const Header = ({ title, subtitle }) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {
        canGoBack && <Pressable onPress={() => { navigation.goBack() }}>
          <Icon name="arrow-left-circle" size={26} color={colors.white}/>
        </Pressable>
      }

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple,
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    marginTop:10,
    color: colors.white,
    fontFamily: "Lato-Black"
  },
  subtitle: {
    fontSize: 12,
    padding: 10,
    color: colors.white
  }
})