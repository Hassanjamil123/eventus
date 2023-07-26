import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import products from '../../store/reducers/products';
import * as eventActions from '../../store/actions/events'

const TicketsScreen = ({ navigation }) => {
    const tickets = navigation.state.params.tickets;

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Generated Tickets:</Text>
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <View key={ticket.id} style={styles.ticketContainer}>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                <View style={styles.qrCodeContainer}>
                  <Text>Ticket code : <Text style={{fontWeight: '600'}}>{ticket.qrCode}</Text></Text>
                </View>
                <View style={styles.ticketDetailsContainer}>
                  <View style={styles.ticketDetail}>
                    <Text style={styles.detailLabel}>Title:</Text>
                    <Text style={styles.detailValue}>{ticket.eventTitle}</Text>
                  </View>
                  <View style={styles.ticketDetail}>
                    <Text style={styles.detailLabel}>Price:</Text>
                    <Text style={styles.detailValue}>Rs. {ticket.eventPrice}</Text>
                  </View>
                  <View style={styles.ticketDetail}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>{ticket.eventLocation}</Text>
                  </View>
                  <View style={styles.ticketDetail}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>{ticket.eventDate}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noTicketsText}>No tickets generated</Text>
          )}
        </ScrollView>
      );
};




const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    ticketContainer: {
      marginBottom: 30,
      padding: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    ticketTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    qrCodeContainer: {
      fontSize: 14,
      marginBottom: 20,
    },
    ticketDetailsContainer: {
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
      padding: 10,
    },
    ticketDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    detailLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
    },
    detailValue: {
      flex: 2,
      fontSize: 14,
    },
    noTicketsText: {
      fontSize: 16,
      fontStyle: 'italic',
      textAlign: 'center',
    },
  });

export default TicketsScreen;
