import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const ProductItem = props => {
  return (
    <View style={styles.product}>
        <View style={styles.imageContainer}>
            <Image source={{uri: props.image}} style={styles.image} />
        </View>
        <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>Rs {props.price}</Text>
            <Text style={styles.price}>{props.category}</Text>
        </View>
        <View  style={styles.actions}>
            {props.children}
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '25%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'open-sans'
    },
    price: {
        fontSize: 18,
        color: '#888',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15%',
        paddingHorizontal: 20
    }
})

export default ProductItem;