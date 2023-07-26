import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSelector , connect, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import axios from 'axios';
import * as productsActions from '../../store/actions/products';


const CurrentEventScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [interestedCounts, setInterestedCounts] = useState({});

  const userId = useSelector((state) => state.auth.userId);

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const fetchEvents = useCallback(async () => {
    setIsRefreshing(true);
    try {
      console.log(userId);
  
      // Fetch events created by the logged-in user from the Firebase Realtime Database
      const eventsResponse = await axios.get(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/events.json?orderBy="userId"&equalTo="${userId}"`
      );
  
      const eventData = eventsResponse.data;
      const loadedEvents = [];
      const loadedInterestedCounts = {}; // New object to store interestedCount
  
      for (const key in eventData) {
        loadedEvents.push({
          id: key,
          ...eventData[key],
        });
  
        // Fetch interestedCount for each event from the InterestedEvents node
        const interestedCountResponse = await axios.get(
          `https://shop-8fe7c-default-rtdb.firebaseio.com/interestedEvents/${key}/interestedCount.json?auth=${token}`
        );
  
        const interestedCountData = interestedCountResponse.data;
        console.log("interestedCountData for event", key, ":", interestedCountData);
        loadedInterestedCounts[key] = interestedCountData || 0;
      }
  
      console.log("loadedInterestedCounts:", loadedInterestedCounts);
      setEvents(loadedEvents);
      setInterestedCounts(loadedInterestedCounts); // Set the interestedCount state
      setIsRefreshing(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error.response?.data);
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }, [userId, token]);
  
  

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);


  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this event? All its data will be lost', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && events.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No events found. Maybe start adding some</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        onRefresh={fetchEvents}
        refreshing={isRefreshing}
        showsHorizontalScrollIndicator={false}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
           image={itemData.item.imageUrl} 
           title={itemData.item.title}
           onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
          >
            <Button
              color={Colors.primary}
              title="View details"
              onPress={() => {
                props.navigation.navigate('EventDetails', {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title,
                  
              })
              }}
            />
            <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="End event"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
          </ProductItem>
        )}
      />
    </View>
  );
};

CurrentEventScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Current Events',
    // headerRight: props => (
    // ...
    // ),
    // headerLeft: props => (
    // ...
    // ),
  };
};

const styles = StyleSheet.create({
  // ...
  ticketInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  ticketInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  endEventButton: {
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-end',
    margin: 10,
  },
});

const mapStateToProps = state => ({
  availableProducts: state.products.availableProducts,
  name: state.auth.name,
  email: state.auth.email,
});

export default connect(mapStateToProps)(CurrentEventScreen);