import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
          <Text style={styles.quantity}>{props.quantity}</Text> 
          <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>Rs{props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
            <Ionicons 
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
            />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    quantity: {
        color: '#888',
        fontSize: 16,
        fontFamily: 'open-sans-bold',
    },
    title: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        marginLeft: 10,
        width: '50%'
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
})

export default CartItem