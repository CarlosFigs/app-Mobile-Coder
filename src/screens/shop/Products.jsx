import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import products from '../../data/products.json'
import { useEffect, useState } from 'react'
import LatoRegularText from '../../components/LatoRegularText'
import Search from '../../components/Search'


const Products = ({ navigation, route }) => {
  const { category } = route.params
  const [productsFiltered, setProductsFiltered] = useState([])
  const [keyword, setKeyword] = useState("");
    const renderProductItems = ({item}) => {
      return(
    <View>
      <Pressable onPress={()=>navigation.navigate("Producto")}>
        <LatoRegularText>{item.title}</LatoRegularText>
        <Image width={120} height={50} source={{uri: item.mainImage}} resizeMode='contain' />
      </Pressable>
    </View>
  )}
  useEffect(() => {
    //esto seria para el filtrado condicional de productos
    const productsFilteredByCategory = products.filter(producto => producto.category.toLowerCase() === category.toLowerCase())
    if (keyword) {//si existe una categoria filtrada podemos filtrar por el dato que coloque el usuario en la barra de busqueda.
      const productsFilteredByKeyword = productsFilteredByCategory.filter((producto) => producto.title.toLowerCase().includes(keyword.toLowerCase()))
      setProductsFiltered(productsFilteredByKeyword)
    } else {
      setProductsFiltered(productsFilteredByCategory)
    }
  }, [keyword, category])
  return (
    <View>
      <Search setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        keyExtractor={item => item.id}
        renderItem={renderProductItems}
      />
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})