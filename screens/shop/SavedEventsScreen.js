import { ScrollView, View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you have installed axios
import { useSelector } from 'react-redux';

const SavedEventsScreen = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const userToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        // Replace 'https://your-api-url/savedEvents/' with your actual API endpoint
        const response = await axios.get(`https://shop-8fe7c-default-rtdb.firebaseio.com/savedEvents/${userId}/savedEvents.json?auth=${userToken}`);

        console.log('Response data:', response.data);
        const events = response.data; // Assuming the API returns the saved events data in an object format
        if (events) {
          const eventList = Object.values(events); // Convert the object values into an array
          setSavedEvents(eventList);
        }
      } catch (error) {
        console.log('Error fetching saved events:', error);
      }
    };

    fetchSavedEvents();
  }, []);

  if (savedEvents.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No saved events found. Save some events to view here.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {savedEvents.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventName}>Event Name: {event.title}</Text>
          <Text style={styles.eventLocation}>Location: {event.location}</Text>
          <Text style={styles.eventDate}>Date: {event.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  eventLocation: {
    fontSize: 16,
    fontFamily: 'open-sans',
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'open-sans',
  },
});

export default SavedEventsScreen;