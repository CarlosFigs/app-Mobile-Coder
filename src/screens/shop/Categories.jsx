import { StyleSheet, FlatList, Pressable, Image, View } from 'react-native'
import { useDispatch } from 'react-redux'
import FlatCard from '../../components/FlatCard'
import { colors } from '../../global/colors'
import { setCategorySelected } from '../../store/slice/shopSlice'
import { useGetCategoriesQuery } from '../../services/shopApi'
import Loader from '../../components/Loader'
import LatoText from '../../components/LatoText'

const Categories = ({ navigation }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()
  const dispatch = useDispatch()

  const handleSelectedCategory = (category) => {
    dispatch(setCategorySelected(category))
    navigation.navigate("Productos")
  }

  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={() => handleSelectedCategory(item.title)}>
      <FlatCard>
        <View style={styles.categoryContent}>
          <LatoText weight="bold" style={styles.title}>{item.title.toUpperCase()}</LatoText>
          <Image style={styles.image} source={{ uri: item.image }} resizeMode="contain" />
        </View>
      </FlatCard>
    </Pressable>
  )

  if (isLoading) return <Loader visible={true} />

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <LatoText weight="bold" style={styles.errorText}>
          Hubo un error al cargar las categorías
        </LatoText>
      </View>
    )
  }

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  )
}

export default Categories

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  categoryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: colors.textPrimary,
    flexShrink: 1,
    marginRight: 10
  },
  image: {
    width: 80,
    height: 50
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    fontSize: 16,
    color: colors.danger
  }
})
