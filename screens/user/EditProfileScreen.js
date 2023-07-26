import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch} from 'react-redux';
import { signup, updateProfile } from '../../store/actions/auth';


const EditProfileScreen = () => {
  const dispatch = useDispatch(); 
  // Access the user data from the Redux store
  const { name: currentName, email: currentEmail } = useSelector((state) => state.auth);

  // Set initial values for the name and email
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);

  // Function to handle the profile update
  const handleProfileUpdate = async () => {
    try {
      // ... Your existing code ...

      // Call the updateProfile action with the updated name and email
      await dispatch(updateProfile(name, email));
      Alert.alert('Profile updated successfully. You will have to wait for some time to change it again.')
      console.log('handleProfileUpdate completed successfully.');
      

      // ... Rest of your code ...
    } catch (error) {
      console.error('Error:', error);
      // Display error message to the user if the update failed
      // For example, you can set a state variable and display the error message in the UI
      // setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
      />
      <Button title="Update Profile" onPress={handleProfileUpdate} color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default EditProfileScreen;
