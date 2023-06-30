import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../state/hooks';
import { ProductItem, ListEmptyComponent } from '../components';

import type { IProductData } from '../types';

export default function CartScreen() {
    const cartItems = useAppSelector((state) => state.cart);
    const totalPrice = cartItems.reduce((acc, curr) => acc + (+curr.price * +curr.quantity), 0);

    const renderProducts = ({ item }: { item: IProductData }) => (
        <ProductItem
            key={item.id}
            product={item}
            isCartItem
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.9, }}>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    data={cartItems}
                    renderItem={renderProducts}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<ListEmptyComponent title='Cart' />}
                />
            </View>
            {cartItems.length > 0 && <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ${totalPrice}</Text>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    footer: {
        flex: 0.1,
        backgroundColor: 'gainsboro',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalText: {
        fontSize: 20,
        fontWeight: '600'
    }
});