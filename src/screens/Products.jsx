import { StyleSheet, Text, View, FlatList } from 'react-native'
import products from '../data/products.json'
import { useEffect, useState } from 'react'
import LatoRegularText from '../components/LatoRegularText'
import Search from '../components/Search'


const Products = ({ category }) => {
  console.log(category)
  const [productsFiltered, setProductsFiltered] = useState([])
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    //esto seria para el filtrado condicional de productos
    const productsFilteredByCategory = products.filter(producto => producto.category.toLowerCase() === category.toLowerCase() )
    if (keyword) {//si existe una categoria filtrada podemos filtrar por el dato que coloque el usuario en la barra de busqueda.
      const productsFilteredByKeyword = productsFilteredByCategory.filter((producto) => producto.title.toLowerCase().includes(keyword.toLowerCase()) )
      setProductsFiltered(productsFilteredByKeyword)
    } else {
      setProductsFiltered(productsFilteredByCategory)
    }
  }, [keyword,category])
  return (
    <View>
      <Search setKeyword={setKeyword} />
      <FlatList
        data={productsFiltered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <LatoRegularText>{item.title}</LatoRegularText>}
      />
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})