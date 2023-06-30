import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { add, remove } from '../../state/slices/cartSlice';

import type { IProductData } from '../../types';

type TProductItem = {
    product: IProductData
    isDetailed?: boolean,
    isCartItem?: boolean
};

export default function ProductItem({ product, isDetailed, isCartItem }: TProductItem) {
    const dispatch = useAppDispatch();
    const addedItem = isCartItem ? useAppSelector((state) => state.cart).find(item => item.id === product.id) : null;

    return (
        <View style={[styles.container, { borderWidth: isDetailed ? 0 : 1 }]}>
            {product?.image && <Image
                resizeMode='cover'
                style={[styles.imageContainer, { width: isDetailed ? 150 : 70, height: isDetailed ? 150 : 70 }]}
                source={{ uri: product.image }}
            />}
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.title}>{product?.title ?? ''}</Text>
                <Text style={styles.price}>{product?.price ? '$' + product.price : ''}</Text>
            </View>
            {isCartItem && <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionBox} onPress={() => dispatch(add(product))}>
                    <Text style={{ fontSize: 15, color: '#000' }}>+</Text>
                </TouchableOpacity>
                <View style={styles.actionBox}>
                    <Text style={styles.counter}>{addedItem?.quantity ?? 0}</Text>
                </View>
                <TouchableOpacity style={styles.actionBox} onPress={() => dispatch(remove(product))}>
                    <Text style={{ fontSize: 15, color: '#000' }}>-</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#aaaaaa',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        height: 70, width: 70,
        margin: 10, borderRadius: 4
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    price: {
        fontSize: 17,
        marginTop: 10,
        color: '#000'
    },
    actionsContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 10,
    },
    actionBox: {
        borderWidth: 1,
        borderColor: '#bbb',
        width: 25, height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    counter: {
        fontSize: 15,
        color: '#000'
    },
});