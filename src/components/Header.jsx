import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import Icon from "react-native-vector-icons/Feather"

const Header = ({ title, subtitle }) => {
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {canGoBack && (
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left-circle" size={26} color={colors.textPrimary} />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    paddingTop: 40, 
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top:10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lato-Black',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    color: colors.textSecondary,
    fontFamily: 'Lato-Regular'
  }
})
