import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, CheckBox } from 'react-native';

const InterestFilterScreen = ({ navigation }) => {
  const [interests, setInterests] = useState({
    sports: false,
    music: false,
    arts: false,
    technology: false,
    food: false,
  });

  useEffect(() => {
    navigation.setParams({ saveFilters: saveFilters });
  }, [saveFilters]);

  const saveFilters = () => {
    const selectedInterests = Object.keys(interests).filter(
      (interest) => interests[interest]
    );
    // You can pass the selected interests back to the previous screen or perform any desired action
    console.log('Selected Interests:', selectedInterests);
  };

  const handleInterestToggle = (interest) => {
    setInterests((prevInterests) => ({
      ...prevInterests,
      [interest]: !prevInterests[interest],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Interests</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={interests.sports}
          onValueChange={() => handleInterestToggle('sports')}
        />
        <Text style={styles.label}>Sports</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={interests.music}
          onValueChange={() => handleInterestToggle('music')}
        />
        <Text style={styles.label}>Music</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={interests.arts}
          onValueChange={() => handleInterestToggle('arts')}
        />
        <Text style={styles.label}>Arts</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={interests.technology}
          onValueChange={() => handleInterestToggle('technology')}
        />
        <Text style={styles.label}>Technology</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={interests.food}
          onValueChange={() => handleInterestToggle('food')}
        />
        <Text style={styles.label}>Food</Text>
      </View>
      <Button title="Apply Filters" onPress={saveFilters} />
    </View>
  );
};

InterestsFilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Interests Filter',
    headerRight: () => (
      <Button
        title="Save"
        onPress={navData.route.params.saveFilters}
      />
    ),
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
  },
});

export default InterestFilterScreen;
