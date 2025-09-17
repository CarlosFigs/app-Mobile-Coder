import { StyleSheet } from 'react-native'
import CartStackNavigation from '../cart/CartStackNavigation'
import ShopStackNavigation from '../shop/ShopStackNavigation'
import ProfileStackNavigation from '../profile/ProfileStackNavigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../global/colors';

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name='Shop'
                component={ShopStackNavigation}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon size={20} name="shopping-bag" color={focused ? colors.backgroundDark : colors.textSecondary} />)
                }}
            />
            <Tab.Screen
                name='Cart'
                component={CartStackNavigation}
                options={{
                    tabBarIcon: ({ focused }) => (<Icon size={20} name="shopping-cart" color={focused ? colors.backgroundDark : colors.textSecondary} />)
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigation}
                options={{
                    tabBarIcon:({focused}) =>(<Icon size={20} name="user" color={focused ? colors.backgroundDark : colors.textSecondary} />)
                }}
            />
        </Tab.Navigator>
    )
}

export default TabsNavigation

const styles = StyleSheet.create({
    tabBar: {

    }
})