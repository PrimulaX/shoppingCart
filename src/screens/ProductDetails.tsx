import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ProductItem } from '../components';

import type { IProductData } from '../types';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationParams } from '../navigation/ProductStack';

export default function ProductDetails() {
    const { params } = useRoute<RouteProp<StackNavigationParams, 'PRODUCT_DETAILS'>>();
    const [product, setProduct] = useState<IProductData | null>(null);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ProductItem
                title={product?.title!}
                price={product?.price!}
                image={product?.image!}
                isDetailed
            />
            <Text style={styles.description}>{product?.description}</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionBox}>
                    <Text style={{ fontSize: 30 }}>-</Text>
                </TouchableOpacity>
                <View style={styles.actionBox}>
                    <Text style={styles.counter}>1</Text>
                </View>
                <TouchableOpacity style={styles.actionBox}>
                    <Text style={{ fontSize: 30 }}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text>ADD TO CART</Text>
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
        flex: 1,
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
        paddingVertical: 10
    }
});