import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'

import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
import PaymentScreen from './PaymentScreen'
import { CardField, useStripe, StripeProvider } from '@stripe/stripe-react-native';


const CartScreen = props => {
  
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for(const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return transformedCartItems;
    return
  })

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
    setIsLoading(false);
  }

  

  return (

    <View style={styles.container}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total Bill :  <Text style={styles.amount}> Rs {Math.round(cartTotalAmount * 100) / 100}</Text>
            </Text>
          { isLoading ? (<ActivityIndicator size="small" color={Colors.primary} /> ) :
          ( <Button 
          title="Place Order" 
          onPress={sendOrderHandler} 
          color={Colors.accent} 
          disabled={cartItems.length === 0} /> 
          )}

        </View>
        <FlatList 
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => 
        <CartItem
        quantity={itemData.item.quantity}
        title={itemData.item.productTitle}
        amount={itemData.item.sum}
        onRemove={() => {
          dispatch(cartActions.removeFromCart(itemData.item.productId))
        }}
        />}
        
        />
    </View>
  )
}


CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.18,
    shadowOffset: {width: 0, height:1},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    margin: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
})

export default CartScreen