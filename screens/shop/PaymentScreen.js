import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CardField, useStripe, StripeProvider } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const { createPaymentMethod } = useStripe();
 
  
 

  const handlePayment = async () => {
    try {
      if (!ephemeralKey) {
        console.error('Ephemeral key is undefined');
        return;
      }

      const paymentMethod = await createPaymentMethod({
        type: 'Card',
        billingDetails: {
          // Provide billing details as needed
        },
      });

      if (paymentMethod.error) {
        console.error('Error creating payment method:', paymentMethod.error);
        // Handle error and show appropriate message to the user
        return;
      }

      // Use the payment method and ephemeral key to process the payment
      const response = await fetch('http://localhost:3000/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          customerId: 'CUSTOMER_ID', // Replace with the actual customer ID
          ephemeralKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Payment succeeded:', data.message);
        // Payment succeeded, proceed with necessary actions
      } else {
        console.log('Payment failed:', data.error);
        // Handle payment failure and show appropriate message to the user
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error and show appropriate message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Payment Details</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
          expiration: 'MM/YY',
          cvc: 'CVC',
        }}
        cardStyle={styles.cardField}
        style={styles.cardFieldContainer}
      />
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardFieldContainer: {
    width: '100%',
    height: 50,
    marginVertical: 20,
  },
  cardField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  lineBreak: {
    height: 20, // Adjust the height as desired
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
