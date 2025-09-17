import { StyleSheet, View, Image, ScrollView, useWindowDimensions, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { addItemToCart } from '../../store/slice/cartSlice'
import LatoText from '../../components/LatoText'
import ButtonQuantity from '../../components/ButtonQuantity'
import { useState } from 'react'

const ProductScreen = () => {
    const product = useSelector(state => state.shopReducer.productSelected)
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        if (product.stock > 0) {
            dispatch(addItemToCart({ product, quantity }))
            setQuantity(1)
        }
    }

   return (
  <View style={styles.screen}>
    <ScrollView
      style={styles.productContainer}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Image
        source={{ uri: product.mainImage }}
        style={[styles.productImage, { height: width * 0.85 }]}
        resizeMode='contain'
      />
      <LatoText weight="bold" style={styles.title}>{product.title}</LatoText>

      <View style={styles.categoryTag}>
        <LatoText weight="medium" style={styles.categoryText}>{product.category}</LatoText>
      </View>

      <LatoText weight="bold" style={styles.price}>${product.price}</LatoText>

      <LatoText
        weight="medium"
        style={[styles.stock, product.stock > 0 ? styles.inStock : styles.outOfStock]}
      >
        {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
      </LatoText>

      <LatoText style={styles.longDescription}>{product.longDescription}</LatoText>
    </ScrollView>
    <View style={styles.bottomContainer}>
      <ButtonQuantity onChange={setQuantity} initial={1} />
      <Pressable
        onPress={handleAddToCart}
        disabled={product.stock <= 0}
        style={({ pressed }) => [
          styles.addToCartButton,
          {
            opacity: pressed ? 0.9 : 1,
            backgroundColor: product.stock > 0 ? colors.accentCrimson : colors.divider
          }
        ]}
      >
        <LatoText weight="bold" style={styles.addToCartText}>
          {product.stock > 0 ? `Agregar ${quantity} al carrito` : 'No disponible'}
        </LatoText>
      </Pressable>
    </View>
  </View>
)

}

export default ProductScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  productContainer: {
    flex: 1,
    padding: 16,
  },
  productImage: {
    width: '100%',
    marginBottom: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentGold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryText: {
    color: colors.textPrimary,
    fontSize: 12,
  },
  price: {
    fontSize: 24,
    color: colors.accentCrimson,
    marginBottom: 8,
  },
  stock: {
    fontSize: 14,
    marginBottom: 12,
  },
  inStock: {
    color: colors.textSecondary,
  },
  outOfStock: {
    color: colors.accentCrimson,
  },
  longDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'justify',
    marginBottom: 16,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: colors.backgroundDark,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  addToCartButton: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  addToCartText: {
    color: colors.white,
    fontSize: 16,
  },
})
