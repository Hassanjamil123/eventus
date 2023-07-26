import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import productReducers from './store/reducers/products'
import cartReducers from './store/reducers/cart'
import ordersReducers from './store/reducers/orders'
import authReducers from './store/reducers/auth'
import eventsReducers from './store/reducers/events'
import ticketsReducer from './store/reducers/tickets';
 
import RootTabs from './navigation/ShopNavigator'
import ReduxThunk from 'redux-thunk'
import * as firebase from './components/firebase'


const rootReducer = combineReducers({
  products: productReducers,
  cart: cartReducers,
  orders: ordersReducers,
  auth: authReducers,
  events: eventsReducers,
  tickets: ticketsReducer
}); 
 
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

// SplashScreen.preventAutoHideAsync(); 


 
export default function App() {

  const [fontsLoaded] = useFonts({ 
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>  
      <RootTabs onLayoutRootView={onLayoutRootView} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
