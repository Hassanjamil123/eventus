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
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
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




const AuthScreen = props => {
  const name = useSelector((state) => state.auth.name);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [isEventOrg, setIsEventOrg] = useState(false);

  const dispatch = useDispatch();

  const handleForgotPassword = () => {
    // Navigate to the "Forgot Password" screen where the user can enter their email
    props.navigation.navigate('ForgotPassword');
  };

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

    const authHandler = async (userName) => {
    setError(null);
    setIsLoading(true);

    try {
      if (isSignup) {
        await dispatch(
          authActions.signup(
            formState.inputValues.name,
            formState.inputValues.phone,
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      } else {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      }

      // Access the 'userName' value from the argument
      console.log('Name:', userName);

      // Navigate to the 'Shop' screen after successful authentication
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
   
  
  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <LinearGradient colors={[Colors.primary, Colors.primary]} style={styles.gradient}> 
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/eventus.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Card style={styles.authContainer}>
          <ScrollView>
            {isSignup && (
              <>
                <Input
                  id="name"
                  label="Name"
                  keyboardType="default"
                  required
                  autoCapitalize="words"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="phone"
                  label="Phone Number"
                  keyboardType="phone-pad"
                  required
                  phone
                  autoCapitalize="none"
                  errorText="Please enter a valid phone number."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </>
            )}
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
              errorText="Please enter a valid password (min. 5 characters)."
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
            <View style={styles.switchButtonContainer}>
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
            title={!isEventOrg ? 'Change to Event Organizer' : ''}
            onPress={() => {
              props.navigation.navigate("OrgAuth")
            }}
          />
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authentication'
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: -80
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
  switchButtonContainer: {
    marginTop: 15,
    alignItems: 'center'
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

export default AuthScreen;
