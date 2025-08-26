import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-web'
import { Icon } from 'react-native-vector-icons/Feather'
import { colors } from '../global/colors'

const Search = ({setKeyword}) => {
  return (
    <View style={styles.searchContainer}> 
      <TextInput 
      style={style.searchInput}
        placeholder='Buscar'
        onChangeText={(text)=>{setKeyword(text)}}
      />
      <Icon style={styles.searchIcon} name='search' size={32} color={colors.black}/>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  searchInput:{
    borderWidth:1,
    borderColor:colors.darkGray,
    borderRadius:16,
    minWidth:"90%",
    padding:32
  },
  searchContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginHorizontal:16,
    marginVertical:16
  },
  searchIcon:{
    position:"absolute",
    left: 8
  }
})