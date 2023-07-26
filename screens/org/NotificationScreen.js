import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationScreen = () => {
  // Example notification data
  const notifications = [
    { id: 1, message: 'Ticket #123456 purchased for Event A', purchaseType: 'Online', purchaseAmount: 'Rs/ 2500' },
    { id: 2, message: 'Ticket #789012 purchased for Event B', purchaseType: 'In-person', purchaseAmount: 'Rs/ 3000' },
    { id: 3, message: 'New message from EventUs', body: 'Thank you for using EventUs! We hope you enjoy organizing the event.' },
  ];

  const handleNotificationPress = (notification) => {
    // Perform any action on notification press
    console.log('Notification pressed:', notification);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      {notifications.map(notification => (
        <TouchableOpacity
          key={notification.id}
          onPress={() => handleNotificationPress(notification)}
          style={styles.notificationContainer}
        >
          <View style={styles.notification}>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            {notification.body && (
              <Text style={styles.notificationBody}>{notification.body}</Text>
            )}
            {notification.purchaseType && (
              <View style={styles.purchaseInfo}>
                <Text style={styles.purchaseText}>Purchase Type: {notification.purchaseType}</Text>
                <Text style={styles.purchaseText}>Amount: {notification.purchaseAmount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
      {notifications.length === 0 && (
        <Text style={styles.noNotifications}>No new notifications</Text>
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
  notificationContainer: {
    marginBottom: 12,
  },
  notification: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600'
  },
  notificationBody: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  purchaseInfo: {
    marginTop: 8,
  },
  purchaseText: {
    fontSize: 14,
    color: '#777',
  },
  noNotifications: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
  },
});

export default NotificationScreen;
