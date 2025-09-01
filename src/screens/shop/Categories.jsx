import { StyleSheet, FlatList, Pressable, Image, Text } from 'react-native'
// import categories from '../../data/categories.json' se comento para ser replazado por el hook de los reducer de redux
import { useSelector, useDispatch } from 'react-redux'
import FlatCard from '../../components/FlatCard'
import { colors } from '../../global/colors'
import { setCategorySelected } from '../../store/slice/shopSlice'
import { useGetCategoriesQuery } from '../../services/shopApi'
import { isLoading } from 'expo-font'
const Categories = ({ navigation }) => {
    // se crea una constante para invocar el hook, luego esto invoca todo el state(sitio donde se encuentran todos los reducers) y se empieza a desglozar a que reducer se va acceder(shop/cart/user/payment/etc)
    
    // const categories = useSelector(state => 
    //     state.shopReducer.categories //aunque sean slices en el index de los slices se les llama reducer por conveccion
    // )
    const {data:categories, isLoading, error} = useGetCategoriesQuery()



    const dispatch = useDispatch()

    const handleSelectedCategory = (category) => {
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }
    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleSelectedCategory(item.title)}>
                <FlatCard>
                    <Text>{item.title}</Text>
                    <Image width={120} height={50} source={{ uri: item.image }} resizeMode='contain' />
                </FlatCard>
        // </Pressable>

        )

    }
    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
        />
    )
}

export default Categories

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: colors.white,
        fontFamily: "Lato-Bold"
    }
})