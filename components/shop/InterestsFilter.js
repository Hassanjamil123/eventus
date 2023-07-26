// InterestsFilter.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const InterestsFilter = ({ interests, selectedInterests, toggleInterest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Interests:</Text>
      <View style={styles.buttonsContainer}>
        {interests.map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.button,
              selectedInterests.includes(interest) && styles.selectedButton,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedInterests.includes(interest) && styles.selectedText,
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginTop: 50
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
  },
  selectedButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
});

export default InterestsFilter;
