import { StyleSheet, Text, View, TextInput } from 'react-native'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/Feather'

const Search = ({ setKeyword }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto"
        onChangeText={(text) => { setKeyword(text) }}
      />
      <Icon name="search" size={20} color={colors.mediumGray} style={styles.iconSearch} />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    minWidth: "90%",
    paddingLeft:32,

  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 16
  },
  iconSearch: {
    position: "absolute",
    left: 8
  }
})