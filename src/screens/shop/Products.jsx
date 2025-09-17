import { StyleSheet, View, FlatList, Pressable, Image } from 'react-native'
import { useEffect, useState } from 'react'
import Search from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setProductSelected } from '../../store/slice/shopSlice'
import { useGetProductsByCategoryQuery } from '../../services/shopApi'
import { colors } from '../../global/colors'
import Loader from '../../components/Loader'
import FlatCard from '../../components/FlatCard'
import LatoText from '../../components/LatoText'

const Products = ({ navigation }) => {
  const category = useSelector(state => state.shopReducer.categorySelected)
  const { data: productsFilteredByCategory, isLoading, error } = useGetProductsByCategoryQuery(category.toLowerCase())

  const [productsFiltered, setProductsFiltered] = useState([])
  const [keyword, setKeyword] = useState("")
  const dispatch = useDispatch()

  const handleSelectedProduct = (item) => {
    dispatch(setProductSelected(item))
    navigation.navigate("Producto")
  }

  const renderProductItems = ({ item }) => (
    <Pressable onPress={() => handleSelectedProduct(item)}>
      <FlatCard>
        <Image style={styles.image} source={{ uri: item.mainImage }} resizeMode="contain" />
        <View style={styles.infoContainer}>
          <LatoText weight="bold" style={styles.title}>{item.title}</LatoText>
          <LatoText style={styles.description}>{item.shortDescription}</LatoText>
          <LatoText style={styles.stock}>Stock: {item.stock}</LatoText>
        </View>
      </FlatCard>
    </Pressable>
  )

  useEffect(() => {
    if (keyword) {
      const productsFilteredByKeyword = productsFilteredByCategory?.filter((producto) =>
        producto.title.toLowerCase().includes(keyword.toLowerCase())
      )
      setProductsFiltered(productsFilteredByKeyword)
    } else {
      setProductsFiltered(productsFilteredByCategory)
    }
  }, [keyword, category, productsFilteredByCategory])

  if (isLoading) return <Loader visible={true} />

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <LatoText weight="bold" style={styles.errorText}>
          Hubo un error al cargar los productos
        </LatoText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Search setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        keyExtractor={item => item.id}
        renderItem={renderProductItems}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10
  },
  listContainer: {
    paddingBottom: 16
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12
  },
  infoContainer: {
    flex: 1
  },
  title: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6
  },
  stock: {
    fontSize: 14,
    color: colors.accentGold
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
