import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductItem } from '../components';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackNavigationParams } from '../navigation/ProductStack';
import type { IProductData } from '../types';

export default function ProductListScreen() {
    const { navigate } = useNavigation<NativeStackNavigationProp<StackNavigationParams, 'PRODUCT_DETAILS'>>();
    const [products, setProducts] = useState<IProductData[] | []>([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const renderProducts = ({ item }: { item: IProductData }) => (
        <TouchableOpacity onPress={() => navigate('PRODUCT_DETAILS', { id: item.id })}>
            <ProductItem
                key={item.id}
                product={item}
            />
        </TouchableOpacity >
    );

    return (
        <FlatList
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={products}
            renderItem={renderProducts}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5
    }
});