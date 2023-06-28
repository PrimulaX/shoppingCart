import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartScreen, ProductListScreen } from './screens';

export default function Navigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="PRODUCTS" component={ProductListScreen} />
            <Tab.Screen name="CART" component={CartScreen} />
        </Tab.Navigator>
    )
}