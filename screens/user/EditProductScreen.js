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

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import products from '../../store/reducers/products';

const REDUCER_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if(action.type === REDUCER_UPDATE) {

  }
}

const EditProductScreen = props => {
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

  const submitHandler = useCallback(async () => {
    if(!validTitle) {
      Alert.alert('Invalid Title', 'Please enter a valid title')
      return;
    }
    setIsLoading(true);
    if (editedProduct) {
     await dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      await dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }

    setIsLoading(false);

    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price, validTitle]);

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
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
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

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default EditProductScreen;