import { FlatList, StyleSheet, View, Image, Pressable } from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemsFromCart } from '../../store/slice/cartSlice'
import LatoText from '../../components/LatoText'

const CartScreen = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const totalItems = useSelector(state => state.cartReducer.total)
  const dispatch = useDispatch()

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <LatoText weight="bold" style={styles.footerTotal}>Total: ${totalItems}</LatoText>
      <Pressable style={styles.confirmButton}>
        <LatoText weight="bold" style={styles.confirmButtonText}>Confirmar</LatoText>
      </Pressable>
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      {/* Imagen */}
      <Image
        source={{ uri: item.mainImage }}
        style={styles.cartImage}
        resizeMode="contain"
      />

      {/* Información */}
      <View style={styles.cartDescription}>
        <LatoText weight="bold" style={styles.title}>{item.title}</LatoText>
        <LatoText style={styles.description}>{item.shortDescription}</LatoText>
        <LatoText style={styles.price}>Precio unitario: ${item.price}</LatoText>
        <LatoText style={styles.quantity}>Cantidad: {item.quantity}</LatoText>
        <LatoText weight="bold" style={styles.total}>Total: ${item.quantity * item.price}</LatoText>

        {/* Botón eliminar */}
        <Pressable onPress={() => dispatch(removeItemsFromCart(item.id))} style={styles.trashButton}>
          <Icon name="delete" size={24} color={colors.accentCrimson} />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderCartItem}
          ListHeaderComponent={<LatoText weight="bold" style={styles.cartScreenTitle}>Tu carrito</LatoText>}
          ListFooterComponent={<FooterComponent />}
          contentContainerStyle={{ backgroundColor: colors.backgroundDark }}
        />
      ) : (
        <LatoText weight="medium" style={styles.emptyCart}>Aún no hay productos en el carrito</LatoText>
      )}
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    alignItems: 'flex-start',
    gap: 12,
  },
  cartImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  cartDescription: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 4,
  },
  title: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  quantity: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  total: {
    fontSize: 16,
    color: colors.accentCrimson,
    marginTop: 6,
  },
  trashButton: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  footerContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
  },
  footerTotal: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: colors.accentCrimson,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  cartScreenTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
    marginVertical: 12,
  },
  emptyCart: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.textSecondary,
    fontSize: 16,
  },
})
