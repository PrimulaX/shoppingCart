
import { ProductListScreen, ProductDetails } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackNavigationParams = {
    PRODUCTS_LIST: undefined,
    PRODUCT_DETAILS: { id: number },
};

export default function ProductStack() {
    const Stack = createNativeStackNavigator<StackNavigationParams>();

    return (
        <Stack.Navigator initialRouteName='PRODUCTS_LIST'>
            <Stack.Screen
                name="PRODUCTS_LIST"
                component={ProductListScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PRODUCT_DETAILS"
                component={ProductDetails}
                options={{
                    title: 'Details'
                }}
            />
        </Stack.Navigator>
    )
}