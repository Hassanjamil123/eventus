import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const EventsCalendarScreen = () => {
  // Mock data for upcoming events
  const upcomingEvents = [
    { id: '1', title: 'Event 1', date: '2023-08-10' },
    { id: '2', title: 'Event 2', date: '2023-08-15' },
    { id: '3', title: 'Event 3', date: '2023-08-20' },
  ];

  // Configure locale settings for the calendar
  LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };
  LocaleConfig.defaultLocale = 'en';

  // Create marked dates object for the calendar
  const markedDates = {};
  upcomingEvents.forEach((event) => {
    markedDates[event.date] = { marked: true };
  });

  // Function to calculate the number of days remaining for an event
  const getDaysRemaining = (eventDate) => {
    const now = new Date();
    const eventTime = new Date(eventDate);
    const timeDifference = eventTime.getTime() - now.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        markingType="dot"
        theme={{
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
          monthTextColor: '#333',
          textDayFontFamily: 'OpenSans-Regular',
          textMonthFontFamily: 'OpenSans-Bold',
          textDayHeaderFontFamily: 'OpenSans-Bold',
        }}
      />
      <View style={styles.eventList}>
        <Text style={styles.eventListTitle}>Upcoming Events</Text>
        {upcomingEvents.map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={styles.daysRemaining}>
              {getDaysRemaining(event.date)} days remaining
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  daysRemaining: {
    fontSize: 14,
    color: '#555',
  },
});

export default EventsCalendarScreen;
