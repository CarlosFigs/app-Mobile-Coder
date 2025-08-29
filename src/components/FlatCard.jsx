import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
//componente wrapper
const FlatCard = ({children}) => {
  return (
    <View style={styles.container}>{children}</View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor: colors.lightGray,
        elevation:10,
        padding:20,
        margin:8
    }
})