import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import categories from './src/data/categories.json'
import Header from './src/components/Header';
import { colors } from './src/global/colors';
import FlatCard from './src/components/FlatCard';

export default function App() {
  const renderCategoryItem = ({ item }) => {
    <FlatCard>
      <Text>{item.title}</Text>
      <Image width={120} heigh={60} source={{ uri: item.image }} resizeMode='contain'/>
    </FlatCard>
  }
  return (
    <View style={styles.container}>
      <Header title="info" />
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: colors.white
  }
});
