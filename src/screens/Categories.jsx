import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import categories from '../data/categories.json'
import FlatCard from '../components/FlatCard'

const Categories = ({setCategorySelected    }) => {
    const renderCategoryItem = ({ item }) => {
        <Pressable onPress={()=>setCategorySelected(item.title)}>
        <FlatCard>
            <Text>{item.title}</Text>
            <Image width={120} heigh={60} source={{ uri: item.image }} resizeMode='contain' />
        </FlatCard>
        </Pressable>

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
        title:{
          fontSize:16,
          color: colors.white,
          fontFamily: "Lato-Bold"
        }
})