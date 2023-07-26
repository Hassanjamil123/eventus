import { FlatList, View, Text, Platform, StyleSheet, Button, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native'
import React, {useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
 import HeaderButton from '../../components/UI/HeaderButton'
 import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { MaterialIcons } from '@expo/vector-icons'; 
import InterestsFilter from '../../components/shop/InterestsFilter'
import { Modal } from 'react-native'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

import axios from 'axios';



const ProductOverviewScreen = props => {
    const userId = useSelector((state) => state.auth.userId);
    const userToken = useSelector((state) => state.auth.userToken);
    const { name, email } = props;
    console.log(userId)
  // Set a default value for 'name' in case it's initially undefined
    const displayName = name || ''

    const [isModalVisible, setModalVisible] = useState(false);
    const [events, setEvents] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();
  
    
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
    
      
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const d = new Date();
      const  month = months[d.getMonth()];

      

    const incrementViewCount = async (productId) => {
        try {
          // Replace this with your actual Firebase project URL
          const url = `https://shop-8fe7c-default-rtdb.firebaseio.com/events/${productId}/viewCount/viewCount.json`;
      
          // Send a GET request to fetch the current viewCount
          const response = await axios.get(url);
          console.log(response.data)
          const currentViewCount = parseInt(response.data);
      
          // Send a PATCH request to update the viewCount
          await axios.patch(url, { viewCount: currentViewCount + 1 });
      
          console.log('View count updated successfully');
        } catch (error) {
          console.log('Error updating view count:', error);
        }
      };
      
      
      


    // Available interests list
  const interests = ['sports', 'Music', 'Arts', 'Technology', 'Food', 'travel'];

  // Selected interests state
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(products);


//   events.sort(function (a, b) {
//     return b.createdAt - a.createdAt;
//   });
  // Toggle interest handler
  
 
  const toggleModal = () => {
    setModalVisible((prev) => !prev);
    applyFilters();
  };

  const applyFilters = useCallback(() => {
    if (selectedInterests.length === 0) {
      // If no interests selected, show all products without filtering
      setFilteredEvents(products);
    } else {
      // Filter events based on selected category
      const filteredByCategory = products.filter((product) =>
        selectedInterests.includes(product.category)
      );
      console.log('Filtered events:', filteredByCategory);
  
      // Convert createdAt strings to Date objects for sorting
      const sortedProducts = filteredByCategory.sort((a, b) => {
        // Convert createdAt strings to Date objects
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA; // Sort in descending order (newest events at the top)
      });
      console.log('Sorted events:', sortedProducts);
  
      setFilteredEvents(sortedProducts);
    }
  }, [selectedInterests, products]);
  
  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(productActions.fetchProducts(selectedInterests));
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, selectedInterests]);
  
  useEffect(() => {
    setIsLoading(true);
    loadProducts(selectedInterests).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts, selectedInterests]);

  const sortByCreatedAtDescending = (events) => {
    return events.sort((a, b) => b.createdAt - a.createdAt);
  };
  
  // ...
  
  useEffect(() => {
    setIsLoading(true);
  
    // Sort the 'products' array by 'createdAt' in descending order
    const sortedProducts = sortByCreatedAtDescending(products);
  
    // Set the sorted 'products' to 'filteredEvents' initially
    setFilteredEvents(sortedProducts);
  
    setIsLoading(false);
  }, [products]);


  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
    return () => {
        willFocusSub.remove();
    }
}, [loadProducts])

useEffect(() => {
    setIsLoading(true);
    loadProducts(selectedInterests).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts, selectedInterests]);

  const toggleInterest = useCallback((interest) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((item) => item !== interest)
        : [...prevInterests, interest]
    );
    loadProducts(); // Add this line to call loadProducts after updating selected interests
  }, [setSelectedInterests, loadProducts]);
  
  

  const filterEventsByCategory = (eventsData, selectedInterests)  =>{
    if (selectedInterests.length === 0) {
      // If no interests selected, return all events
      return eventsData;
    } else {
      // Filter events based on the "category" field in each product
      const filteredEvents = {};
      for (const key in eventsData) {
        const eventData = eventsData[key];
        if (selectedInterests.includes(eventData.category)) {
          filteredEvents[key] = eventData;
        }
      }
      return filteredEvents;
    }
  }


    if(isLoading) {
        return <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="small" color={Colors.primary} />
        </View>
    }

    if(!isLoading && products.length === 0) {
        return <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>No events found at the moment, please come back a bit later.</Text>
        </View>
    }

  return (
    <View style={{height: 1200}}>
         {/* Header Starts */}
         <View style={styles.firstView}>
            <View>
                <View style={styles.dateView}>
                    <Text style={styles.dateViewText}>
                         {month.toUpperCase()} {d.getDate()}, {formatAMPM(new Date)} 
                        
                    </Text>
                </View>
            </View>    
        </View>
        {/* Header Ends */}
        <View style={styles.textView}>
            <Text style={styles.text}>
                <Text style={{color: Colors.primary}}>Events</Text> you might be interested in
            </Text>
        </View>

        <TouchableOpacity onPress={toggleModal}>
            <View style={styles.filterView}>
                <Text style={styles.filterText}>Filters</Text>
                <Ionicons name="filter" size={24} color="black" style={{marginLeft: 10}} />
            </View>
        </TouchableOpacity>

        <Modal visible={isModalVisible} animationType="slide">
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Select Your Interests:</Text>
    <View style={styles.modalContent}>
      <InterestsFilter
        interests={interests}
        selectedInterests={selectedInterests}
        toggleInterest={toggleInterest}
      />
    </View>
    <View style={styles.modalActions}>
      <Button title="Close" onPress={() => toggleModal(selectedInterests)} color={Colors.primary} />
      <Button title="Apply Filters" onPress={() => 
        console.log(selectedInterests)
        }
         color={Colors.primary} />
    </View>
  </View>
</Modal>

    <FlatList
    onRefresh={loadProducts}
    refreshing={isLoading} 
  //  horizontal

    showsVerticalScrollIndicator={false}
            data={filteredEvents}
            keyExtractor={item => item.id}
            renderItem={itemData => 
            <ProductItem 
                image={itemData.item.imageUrl} 
                title={itemData.item.title} 
                price={itemData.item.price}
            >
            <Button color={Colors.primary} title="View details" onPress={() => {
                    incrementViewCount(itemData.item.id);
                    props.navigation.navigate('ProductDetail', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title,
                        
                    })
                }} />
            {/* <Button color={Colors.primary} title="Buy Ticket" onPress={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }} /> */}
            </ProductItem>
            }
    />
    
  
         {/* Footer starts  */}
         <View style={styles.footerView}>
              <View style={styles.reservedView}>
                  <Text style={styles.reserved1Text}><Text style={{color: '#C31F48'}}>Event</Text>Us</Text>
                  <Text style={styles.reserved2Text}>All Rights Reserved.</Text>
                  <Text style={styles.reserved3Text}>v1.0</Text>
              </View>
                
            </View>
        {/* Footer ends */}
    </View>
  )
}


ProductOverviewScreen.navigationOptions = navData => {
    return{
     headerTitle: ' ',
     headerRight: props => (
         <View style={{flexDirection: 'row'}}>
             <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Calendar" iconName='calendar-outline' onPress={() => {
            navData.navigation.navigate('Calendar')
        }} />
            </HeaderButtons>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Profile" iconName='person-circle-outline' onPress={() => {
            navData.navigation.navigate('Settings')
        }} />
            </HeaderButtons>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Search Events" iconName='search' onPress={() => navData.navigation.navigate('Search')} />
            </HeaderButtons>
         </View>

        
      ),
     headerLeft: props => (
         <View style={{flexDirection: 'row'}}>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Orders" iconName='ios-reorder-three-sharp' onPress={() => navData.navigation.navigate('Orders')} />
            </HeaderButtons>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Cart" iconName='ios-cart' onPress={() => navData.navigation.navigate('Cart')} />
            </HeaderButtons>
        </View>
     ), 
     userId: navData.navigation.getParam('userId'),
     }
};

 
const styles = StyleSheet.create({
    userView: {
        margin: 20,
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        height: 70,
        borderRadius: 10,
        position: 'relative',
        justifyContent: 'space-between',
        padding: 25,
    },
   firstView: {
        width: screenWidth,
        height: 50,
   }, 
   dateView: {
       margin: 15
   },
   dateViewText: {
       fontFamily: 'open-sans-bold',
       fontSize: 17,
       opacity: 0.5
   }, 
   secondText: {
       fontFamily: 'open-sans-bold',
       fontSize: 30,
   },
    welcomeView: {
        margin: 5,
        flexDirection: 'row',
        borderRadius: 5,
        position: 'relative',
        justifyContent: 'space-between',
        //padding: 15,
    },
    welcomeText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: 'black'
    },
    userText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'black'
    },
    textView: {
        margin: 5,
        flexDirection: 'row',
        borderRadius: 5,
        position: 'relative',
        justifyContent: 'space-between',
        padding: 15,
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: 'black',
    },
    footerView: {
     width: screenWidth,
     height: screenHeight - 400
    },
    reservedView: {
      margin: 10,
      width: '94%',
      height: 160,
      justifyContent: 'center',
      alignItems: 'center'
    },
    reserved1Text: {
      fontSize: 18
    },
    reserved2Text: {
     fontSize: 14,
     fontWeight: '500'
   },
   reserved3Text: {
     fontSize: 15,
     fontWeight: '500'
   },
   filterView: {
       flexDirection: 'row',
       margin: 15,
       justifyContent: 'center',
   },
   filterText: {
       fontFamily: 'open-sans-bold',
       fontSize: 17
   }
})

const mapStateToProps = (state) => {
    console.log(state.auth); // Check if the 'name' prop is present in the 'auth' state
    return {
      name: state.auth.name,
      email: state.auth.email,
      userId: state.auth.userId
    };
  };
  
  export default connect(mapStateToProps)(ProductOverviewScreen);


