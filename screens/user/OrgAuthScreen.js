import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import axios from 'axios';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';






const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const OrgAuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [isEventOrg, setIsEventOrg] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      phone: '',
      email: '',
      password: ''
    },
    inputValidities: {
      name: false,
      phone: false,
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);
 

  const signUpHandler = async () => {
    setError(null);
    setIsLoading(true);
  
    try {
      await dispatch(
        authActions.orgSignup(
          formState.inputValues.name,
          formState.inputValues.phone,
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
  
      // Perform authentication using the Firebase REST API
      const authData = {
        email: formState.inputValues.email,
        password: formState.inputValues.password,
        returnSecureToken: true
      };
  
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTmDtW_6sW0Lmr9pmRRtQhKKYP7qeJCxw',
        authData
      );
  
      const { idToken, localId } = response.data;
  
      // Store the user data in the Realtime Database using the Firebase REST API
      const userData = {
        name: formState.inputValues.name,
        phone: formState.inputValues.phone,
        email: formState.inputValues.email
      };
  
      await axios.put(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/eventOrganizers/${localId}.json`,
        userData,
        {
          params: { auth: idToken }
        }
      );
  
      setIsLoading(false);
      props.navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  
  const loginHandler = async () => {
    setError(null);
    setIsLoading(true);
  
    try {
      await dispatch(
        authActions.orgLogin(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
  
      setIsLoading(false);
      props.navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  
  const authHandler = () => {
    if (isSignup) {
      signUpHandler();
    } else {
      loginHandler();
    }
  };
  

//   const authHandler = async () => {
//     let action;
//     if (isSignup) {
//       action = authActions.signup(
//         formState.inputValues.name,
//         formState.inputValues.phone,
//         formState.inputValues.email,
//         formState.inputValues.password
//       );
//     } else {
//       action = authActions.login(
//         formState.inputValues.name,
//         formState.inputValues.email,
//         formState.inputValues.password
//       );
//     }
//     setError(null);
//     setIsLoading(true);
//     try {
//       await dispatch(action);
//       props.navigation.navigate('Shop')
//     } catch (err) {
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

  
  // authenticateUser(email, password)
  //   .then((idToken) => {
  //     // Use the retrieved ID token here
  //     console.log('User ID token:', idToken);
  
  //     // Pass the ID token to the appropriate location in your code
  //     // For example, you can include it in the request headers when making API calls
  //   })
  //   .catch((error) => {
  //     // Handle authentication errors
  //     console.error('Authentication error:', error);
  //   });
  

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      
    <LinearGradient colors={[Colors.primary, Colors.primary]} style={styles.gradient}> 
      <View>
        <Image 
        source={require('../../assets/eventus.png')}
        style={styles.logo}
        resizeMode="contain"
        />
      </View>

        <Card style={styles.authContainer}>
          <ScrollView>

            {!isSignup ? 
            <Text>Event Org Login</Text>
            : <Text>Event Org Sign up</Text> }
            <Input
              id="name"
              label="Name"
              keyboardType="email-address"
              required
              name
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="phone"
              label="Phone number"
              keyboardType="numeric"
              required
              phone
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
        <Card style={styles.changeButton}>
          <Button 
          title='Change to user'
          onPress={() => {
            // setIsEventOrg(prevState => !prevState);
            props.navigation.goBack()
          }}
          />
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

OrgAuthScreen.navigationOptions = {
  headerTitle: 'Org Authentication'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  logo: {
     width: 200,
     height: 200,
     marginVertical: -20,
     marginTop: -80
  },
  changeButton: {
    width: '80%',
    maxWidth: 400,
    height: 50,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrgAuthScreen;
