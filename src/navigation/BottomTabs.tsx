import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartScreen } from '../screens';
import ProductStack from './ProductStack';

type TabsNavigationParams = {
    PRODUCTS: undefined,
    CART: undefined,
};

export default function Navigation() {
    const Tab = createBottomTabNavigator<TabsNavigationParams>();

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
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}