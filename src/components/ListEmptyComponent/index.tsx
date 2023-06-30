import { StyleSheet, Text, View } from 'react-native';

export default function ListEmptyComponent({ title }: { title: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title + ' is Empty'}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#BBB'
    }
});