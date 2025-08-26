import { StyleSheet, Text, View } from 'react-native'
import colors from '../global/colors'
const Header = ({title,subtitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <text style={styles.subtitle}>{subtitle}</text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.purple,
        height:150,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
      fontSize:16,
      color: colors.white,
      fontFamily: "Lato-Black"
    },
    subtitle:{
      fontSize:12,
      color: colors.white
    }
})