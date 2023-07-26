import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';



const REDUCER_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if(action.type === REDUCER_UPDATE) {

  }
}

const CreateEventScreen = props => {

  const userId = useSelector((state) => state.auth.userId);
  console.log(userId)
  const [isLoading, setIsLoading] = useState(false)
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();


  
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [validTitle, setValidTitle] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  );
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticketsNo, setTicketsNo] = useState('')
  const [category, setCategory] = useState('');

  const generateQRCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  

  
  const submitHandler = useCallback(async () => {
    if (!validTitle) {
      Alert.alert('Invalid Title', 'Please enter a valid title');
      return;
    }
    setIsLoading(true);
  
    try {
      let generatedTickets = [];
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            title,
            description,
            imageUrl,
            location,
            date,
            category,
            userId,

          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            title,
            description,
            imageUrl,
            +price,
            location,
            date,
            category,
            userId,

          )
        );
      }
      setIsLoading(false);
  
      // Save the generated tickets along with the event information
      // dispatch(saveTickets({ title, location, date, price }, generatedTickets));
  
      Alert.alert("Event was created successfully. You can monitor it in Current Events Screen")
      props.navigation.replace('Home');
    } catch (error) {
      setIsLoading(false);
      console.log('Error:', error);
      // Handle the error here (e.g., show an error message)
    }
  }, [
    dispatch,
    prodId,
    title,
    description,
    imageUrl,
    price,
    location,
    date,
    validTitle,
    category,

  ]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const TitleHandler = text => {
    if (text.trim().length > 0) {
      setValidTitle(true)
    } else {
      setValidTitle(false)
    }
    setTitle(text)
  }

  CreateEventScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
      headerTitle: navData.navigation.getParam('productId')
        ? 'Edit Event'
        : 'Create Event',
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitFn}
          />
        </HeaderButtons>
      )
    };
  };

  if(isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="small" color={Colors.primary} />
    </View>
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            placeholder="Title"
            onChangeText={TitleHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="next"
          />
          {!validTitle && <Text style={{color: 'red', marginTop: 5}}>Please enter valid product title.</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Event Type</Text>
          <View style={styles.selectContainer}>
          <View style={styles.selectInput}>
          <RNPickerSelect
            value={category}
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: 'Music', value: 'music' },
              { label: 'Sports', value: 'sports' },
              { label: 'Education', value: 'education' },
              { label: 'Technology', value: 'technology' },
              { label: 'Food', value: 'food' },
              { label: 'Travel', value: 'travel' },

            ]}
          />
          </View>
          </View>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
            keyboardType="default"
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
            keyboardType="default"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={text => setLocation(text)}
            keyboardType="default"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Event Date</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={text => setDate(text)}
            keyboardType="default"
          />
        </View>



        
      </View>
    </ScrollView>
    
  );
};



const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 5,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  selectContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  selectInput: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 12,
  },
  generatedTicketsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  generatedTicketsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  ticketItem: {
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ticketQRCode: {
    fontSize: 14,
    color: '#555',
  },
  noTicketsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CreateEventScreen;
