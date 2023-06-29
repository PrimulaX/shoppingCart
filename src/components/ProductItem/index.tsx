import { View, Text, Image, StyleSheet } from 'react-native';

type TProductItem = {
    title: string,
    image: string,
    price: string
};

export default function ProductItem({ title, image, price }: TProductItem) {
    return (
        <View style={styles.container}>
            <Image resizeMode='cover' style={styles.imageContainer} source={{ uri: image }} />
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
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
        height: 120,
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
        marginTop: 10
    }
});