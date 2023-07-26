import { ScrollView, View, Text, StyleSheet, Image, Button, Alert, Share } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { toggleInterest } from '../../store/actions/products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsEventSaved, clearIsEventSaved } from '../../store/actions/auth';
import * as productsActions from '../../store/actions/products';

const EventDetailScreen = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const userToken = useSelector((state) => state.auth.token);
  const isEventSaved = useSelector((state) => state.auth.isEventSaved);
  const [isLoading, setIsLoading] = useState(true);
  
  console.log('Token: ', userToken)
  console.log('ProductDetailScreen - userId:', userId);
  //const { name, email, userId } = props;
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();



  const [interestedCount, setInterestedCount] = useState(0);
  const [isInterested, setIsInterested] = useState(false);

  

  useEffect(() => {
    const fetchUserTokenAndId = async () => {
      try {
        // Replace this with your actual logic to fetch the user token and ID
        const userToken = '...'; // Get the user token from wherever you store it
        const userId = '...'; // Get the user ID from wherever you store it
  
        if (userToken && userId) {
          // Check if the event is saved for the logged-in user
          const eventSaved = await isEventSavedForUser(userId, selectedProduct.id);
  
          // If the event is saved for the user, dispatch setIsEventSaved with true
          // If it's not saved, dispatch setIsEventSaved with false
          dispatch(setIsEventSaved(eventSaved));
        } else {
          // If the user is logged out, dispatch setIsEventSaved with false
          dispatch(setIsEventSaved(false));
        }
      } catch (error) {
        console.log('Error fetching user token and ID:', error);
      }
    };
  
    // Call the fetchUserTokenAndId function
    fetchUserTokenAndId();
  }, [dispatch]);

  // Function to check if the event is saved for the logged-in user



  

  



  

 

  

  

  

  

 

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
    Alert.alert('Added to cart', 'Item successfully added to cart. Go to cart to checkout');
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
    justifyContent: 'center',
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

EventDetailScreen.navigationOptions = (navData) => {
  const productId = navData.navigation.getParam('productId');
  const userId = navData.navigation.getParam('userId')
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
    isEventSaved: navData.isEventSaved,
    userId: userId,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Share"
          iconName="share-outline"
          onPress={navData.handleShare}
        />
      </HeaderButtons>
    ),
    userId: navData.navigation.getParam('userId'),
    productId: productId,
    isEventSaved: navData.isEventSaved, // Assuming this is already available in your code
    // handleSaveEvent: handleSaveEvent,
    // handleShare: handleShare,
  };
}; 


const mapStateToProps = (state) => {
  return {
   // userId: state.auth.userId, // Assuming that 'userId' is stored in the 'auth' slice of the Redux state
  };
};

export default connect(mapStateToProps)(EventDetailScreen);
