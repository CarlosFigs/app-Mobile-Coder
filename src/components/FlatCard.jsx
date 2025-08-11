import { Children } from 'react'
import { StyleSheet, Text, View } from 'react-native'
//componente wrapper
const FlatCard = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex:"row",
        backgroundColor: colors.lightGray,
        elevation:10,
        padding:32,
        margin:8
    }
})