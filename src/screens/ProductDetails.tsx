import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { ProductItem } from '../components';
import { add, remove, removeItem } from '../state/slices/cartSlice';

import type { IProductData } from '../types';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationParams } from '../navigation/ProductStack';

export default function ProductDetails() {
    const dispatch = useAppDispatch();
    const { params } = useRoute<RouteProp<StackNavigationParams, 'PRODUCT_DETAILS'>>();
    const [product, setProduct] = useState<IProductData | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const addedItem = useAppSelector((state) => state.cart).find(item => item.id === product?.id);

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then(res => res.json())
            .then(data => { setProduct(data); setLoading(false) });
    }, []);

    const handleAddToCart = (product: IProductData) => {
        dispatch(add(product));
    };

    const handleRemoveFromCart = (product: IProductData) => {
        dispatch(remove(product));
    };

    const handleRemoveItemFromCart = (product: IProductData) => {
        dispatch(removeItem(product));
    };

    if (isLoading) return <ActivityIndicator style={{ marginTop: 30 }} />;

    return (
        <View style={{ flex: 1 }}>
            <ProductItem
                product={product!}
                isDetailed
            />
            <ScrollView style={{ flex: 1 }}>
                <Text style={styles.description}>{product?.description}</Text>
            </ScrollView>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionBox} onPress={() => handleRemoveFromCart(product!)}>
                    <Text style={{ fontSize: 30 }}>-</Text>
                </TouchableOpacity>
                <View style={styles.actionBox}>
                    <Text style={styles.counter}>{addedItem?.quantity ?? 0}</Text>
                </View>
                <TouchableOpacity style={styles.actionBox} onPress={() => handleAddToCart(product!)}>
                    <Text style={{ fontSize: 30 }}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.addButton, { backgroundColor: !!addedItem ? 'salmon' : 'mediumaquamarine', }]}
                onPress={!!addedItem ? () => handleRemoveItemFromCart(product!) : () => handleAddToCart(product!)}
            >
                <Text>{!!addedItem ? 'REMOVE FROM CART' : 'ADD TO CART'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    description: {
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '400'
    },
    actionsContainer: {
        flexDirection: 'row',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 20,
    },
    actionBox: {
        borderWidth: 1,
        borderColor: '#bbb',
        width: 50, height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    counter: {
        fontSize: 20
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#bbb',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 10,
    }
});