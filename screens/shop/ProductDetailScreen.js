import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  Share,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { setIsEventSaved } from '../../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductDetailScreen = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const userToken = useSelector((state) => state.auth.token);
  const isEventSaved = useSelector((state) => state.auth.isEventSaved);

  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  const [interestedCount, setInterestedCount] = useState(0);
  const [isInterested, setIsInterested] = useState(false);

  const fetchInterestedStateAndCount = async () => {
    try {
      // Get the user token from wherever you have it stored
       // Replace this with the actual user token

      // Make a GET request to fetch the data from the Firebase Realtime Database
      const response = await axios.get(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/interestedEvents/${productId}.json?auth=${userToken}`
      );

      // Extract the interested state and count from the response data
      const { isInterested: fetchedIsInterestedValue, interestedCount: fetchedInterestedCountValue } = response.data;

      // Update the local state with the fetched data
      setIsInterested(fetchedIsInterestedValue);
      setInterestedCount(fetchedInterestedCountValue);

      console.log('Interested state and count fetched successfully');
    } catch (error) {
      console.log('Error fetching interested state and count:', error);
    }
  };

  useEffect(() => {
    // Fetch interested state and count from the database when the component mounts
    fetchInterestedStateAndCount();
  }, [productId]);

  // Function to handle user interest in the event
 

  // Function to update the interested state and count in the Firebase Realtime Database
  const updateInterestedStateAndCount = async (productId, isInterested, interestedCount) => {
    try {
     // Get the user token from wherever you have it stored

      // Define the data to be stored in the database
      const eventData = {
        isInterested: isInterested,
        interestedCount: isInterested ? interestedCount + 1 : interestedCount - 1,
      };

      // Make a PUT request to update the data in the Firebase Realtime Database
      await axios.put(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/interestedEvents/${productId}.json?auth=${userToken}`,
        eventData
      );

      console.log('Interested state and count updated successfully');
    } catch (error) {
      console.log('Error updating interested state and count:', error);
    }
  };

  useEffect(() => {
    // Fetch interested state and count from the database when the component mounts
    fetchInterestedStateAndCount();
  }, [fetchInterestedStateAndCount]);

  // ... Other code ...

  const handleToggleInterest = async () => {
    try {
      // Get the current interested state and count
      const isCurrentlyInterested = isInterested;
      const currentInterestedCount = interestedCount;

      // Update the local interested state and count
      setIsInterested(!isCurrentlyInterested);
      setInterestedCount(isCurrentlyInterested ? currentInterestedCount - 1 : currentInterestedCount + 1);

      // Get the user token from wherever you have it stored
      const userToken = '...'; // Replace this with the actual user token

      // Define the data to be stored in the database
      const eventData = {
        isInterested: !isCurrentlyInterested,
        interestedCount: isCurrentlyInterested ? currentInterestedCount - 1 : currentInterestedCount + 1,
      };

      // Make a PUT request to update the data in the Firebase Realtime Database
      await axios.put(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/interestedEvents/${productId}.json?auth=${userToken}`,
        eventData
      );

      console.log('Interested state and count updated successfully');
    } catch (error) {
      console.log('Error handling interest state:', error);
    }
  };
  
  // Function to save the event to the database
  const saveEventToDatabase = async (userId, eventId) => {
    try {
      const userToken = '...'; // Get the user token from wherever you have it stored

      // Data to save in the database
      const eventData = {
        title: selectedProduct.title,
        location: selectedProduct.location,
        date: selectedProduct.date,
      };

      // Make a POST request to the Firebase Realtime Database to save the event under the user's userId
      const response = await fetch(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/savedEvents/${userId}/savedEvents.json?auth=${userToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save event to the database');
      }

      // Store the saved status in AsyncStorage to persist it locally
      await AsyncStorage.setItem(`eventSaved_${eventId}`, 'true');

      console.log('Event saved successfully');
      dispatch(setIsEventSaved(true));
      Alert.alert('Event is saved to Saved Events in profile');
    } catch (error) {
      console.log('Error saving event to the database:', error);
    }
  };

  const handleToggleSaveEvent = async () => {
    try {
      if (isEventSaved) {
        // If the event is already saved, remove it from the database
        await removeEventFromDatabase();
      } else {
        // If the event is not saved, save it to the database
        await saveEventToDatabase(userId, productId);
      }
    } catch (error) {
      console.log('Error handling saved event:', error);
    }
  };

  // Function to remove the event from the database
  const removeEventFromDatabase = async () => {
    try {
      const userToken = '...'; // Get the user token from wherever you have it stored

      // Make a DELETE request to remove the event from the user's saved events in the Firebase Realtime Database
      const response = await fetch(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/savedEvents/${userId}/savedEvents/${productId}.json?auth=${userToken}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove event from the database');
      }

      // Store the removed status in AsyncStorage to persist it locally
      await AsyncStorage.setItem(`eventSaved_${productId}`, 'false');

      console.log('Event removed successfully');
      dispatch(setIsEventSaved(false));
    } catch (error) {
      console.log('Error removing event from the database:', error);
    }
  };

  const handleShare = () => {
    Share.share({
      message: 'Check out this event!',
      url: 'https://example.com/event',
      title: selectedProduct.title,
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleBuyTicket = () => {
    dispatch(cartActions.addToCart(selectedProduct));
    Alert.alert(
      'Added to cart',
      'Item successfully added to cart. Go to cart to checkout'
    );
  };

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct?.imageUrl }} style={styles.image} />
      <View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            RS {selectedProduct.price}
            <Text style={styles.priceText}>/person</Text>
          </Text>
          <Text style={styles.interested}>
            Interested People: {interestedCount}
          </Text>
        </View>

        <View>
          <Text style={styles.date}>{selectedProduct.date}</Text>
        </View>
        <View>
          <Text style={styles.descriptionHeading}>Location: </Text>
          <Text style={styles.description}>{selectedProduct.location}</Text>
        </View>
        <View>
          <Text style={styles.descriptionHeading}>Description</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Button
          color={isInterested ? Colors.primary : Colors.accent}
          title={isInterested ? 'Remove Interest' : 'Interested'}
          onPress={handleToggleInterest}
        />
        <Button
          color={isEventSaved ? Colors.primary : Colors.accent}
          title={isEventSaved ? 'Event Saved' : 'Save Event'}
          onPress={handleToggleSaveEvent}
          disabled={isEventSaved} // Disable the button if the event is already saved
        />
        <Button
          color={Colors.primary}
          title="Buy Ticket"
          onPress={handleBuyTicket}
        />
      </View>
      <View>
        <Button 
        color={Colors.primary}
        title="Share event"
        onPress={handleShare}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  priceContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginVertical: 20,
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'open-sans',
  },
  interested: {
    fontSize: 18,
    color: '#888',
    marginVertical: 20,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  descriptionHeading: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    fontFamily: 'open-sans',
  },
  actions: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

ProductDetailScreen.navigationOptions = (navData) => {
  const productId = navData.navigation.getParam('productId');

  return {
    headerTitle: navData.navigation.getParam('productTitle'),
    isEventSaved: navData.isEventSaved,
    // headerRight: () => (

    // ),
    userId: navData.navigation.getParam('userId'),
    productId: productId,
    isEventSaved: navData.isEventSaved, // Assuming this is already available in your code
  };
};

export default ProductDetailScreen;
