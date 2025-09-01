import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import { useEffect, useState } from 'react'
import LatoRegularText from '../../components/LatoRegularText'
import Search from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setProductSelected } from '../../store/slice/shopSlice'


const Products = ({ navigation }) => {
  // const { category } = route.params esto al utilizar redux y los reducer se utilizan los hook para poder recuperar la categoria desde el reducer
  const category = useSelector(state=>state.shopReducer.categorySelected)
  const products = useSelector(state=>state.shopReducer.products)
  const [productsFiltered, setProductsFiltered] = useState([])
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch()

  const handleSelectedProduct = (item)=>{
    dispatch(setProductSelected(item))
    navigation.navigate("Producto")
  }
    const renderProductItems = ({item}) => {
      return(
    <View>
      <Pressable onPress={()=>handleSelectedProduct(item)}>
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