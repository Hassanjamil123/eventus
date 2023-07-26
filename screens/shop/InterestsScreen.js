import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const InterestsScreen = ({ navigation }) => {

  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        // Deselect the interest
        return prevInterests.filter((item) => item !== interest);
      } else {
        // Select the interest
        return [...prevInterests, interest];
      }
    });
  };

  const saveFilters = () => {
    // You can pass the selected interests back to the previous screen or perform any desired action
    console.log('Selected Interests:', selectedInterests);
  };

  const renderInterestButton = (interest) => {
    const isSelected = selectedInterests.includes(interest);
    const buttonStyle = isSelected ? styles.selectedButton : styles.unselectedButton;
    const textStyle = isSelected ? styles.selectedText : styles.unselectedText;

    return (
      <TouchableOpacity
        key={interest}
        style={buttonStyle}
        onPress={() => toggleInterest(interest)}
      >
        <Text style={textStyle}>{interest}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Interests</Text>
      <View style={styles.buttonsContainer}>
        {renderInterestButton('Sports')}
        {renderInterestButton('Music')}
        {renderInterestButton('Arts')}
        {renderInterestButton('Technology')}
        {renderInterestButton('Food')}
      </View>
      <Button title="Apply Filters" onPress={saveFilters} />
    </View>
  );
};

InterestsScreen.navigationOptions = () => {
  return {
    headerTitle: 'Interests Filter',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  unselectedButton: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
  },
  selectedButton: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  unselectedText: {
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    fontSize: 16,
    color: 'white',
  },
});

export default InterestsScreen;
