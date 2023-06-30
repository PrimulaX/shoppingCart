import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartScreen } from '../screens';
import ProductStack from './ProductStack';
import { useAppSelector } from '../state/hooks';

type TabsNavigationParams = {
    PRODUCTS: undefined,
    CART: undefined,
};

export default function Navigation() {
    const Tab = createBottomTabNavigator<TabsNavigationParams>();
    const cartItems = useAppSelector((state) => state.cart).length;

    return (
        <Tab.Navigator initialRouteName='PRODUCTS'>
            <Tab.Screen
                name="PRODUCTS"
                component={ProductStack}
                options={{
                    title: 'Products',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="CART"
                component={CartScreen}
                options={{
                    title: 'Cart',
                    headerShown: false,
                    tabBarBadge: cartItems > 0 ? cartItems : undefined
                }}
            />
        </Tab.Navigator>
    )
}