import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const WalletScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch wallet balance and transactions from the Stripe API
    fetchWalletData();
  }, []);

  const fetchWalletData = () => {
    setIsLoading(true);

    fetch('http://localhost:3000/wallet-data')
      .then(response => response.json())
      .then(data => {
        // Process the response data
        console.log('Server response:', data);
  
        // Update the state with the retrieved wallet data
        setWalletBalance(data.walletBalance);
        setTransactions(data.transactions);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error fetching wallet data:', error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>

      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <>
          <View style={styles.walletBalance}>
            <Text style={styles.walletBalanceLabel}>Current Balance</Text>
            <Text style={styles.walletBalanceAmount}>Rs {walletBalance}</Text>
          </View>

          <View style={styles.transactions}>
            <Text style={styles.transactionsHeading}>Transactions</Text>
            {transactions.map(transaction => (
              <View key={transaction.id} style={styles.transactionItem}>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text style={[styles.transactionAmount, transaction.amount < 0 ? styles.negativeAmount : styles.positiveAmount]}>
                  {transaction.amount >= 0 ? '+ ' : '- '}
                  {Math.abs(transaction.amount)}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  walletBalance: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  walletBalanceLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  walletBalanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  transactions: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  transactionsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  transactionItem: {
    marginBottom: 12,
  },
  transactionDate: {
    fontSize: 14,
    color: '#777',
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
  },
  positiveAmount: {
    color: 'green',
  },
  negativeAmount: {
    color: 'red',
  },
});

export default WalletScreen;
