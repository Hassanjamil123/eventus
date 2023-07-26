// auth.js
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const LOGOUT = 'LOGOUT';
 // actions/types.js

export const SET_IS_EVENT_SAVED = 'SET_IS_EVENT_SAVED';
export const CLEAR_SAVED_EVENT_STATE = 'CLEAR_SAVED_EVENT_STATE';

export const setIsEventSaved = (isSaved) => {
  return {
    type: SET_IS_EVENT_SAVED,
    payload: isSaved,
  };
};

export const clearSavedEventState = () => {
  return {
    type: CLEAR_SAVED_EVENT_STATE,
  };
};

export const fetchSavedEvents = (userId, userToken) => {
  return async (dispatch) => {
    try {
      // Make the GET request to fetch the saved events for the user
      const response = await fetch(
        `https://your-api-url/savedEvents/${userId}`,
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch saved events.');
      }

      const responseData = await response.json();

      // Dispatch an action to update the state with the fetched saved events
      dispatch({ type: 'SET_SAVED_EVENTS', savedEvents: responseData });
    } catch (error) {
      console.log('Error fetching saved events:', error);
      // You can dispatch an error action if needed
    }
  };
};

export const logout = navigation => {
  return async dispatch => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userData');

      // Dispatch logout action to clear user data in Redux state
      dispatch({ type: LOGOUT });

      // Navigate to AuthScreen after successful logout
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (show an alert, etc.)
      // You can dispatch an action to set an error state in Redux and display an error message to the user
    }
  };
};

export const updateProfile = (name, email) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      console.log('User token:', token);

      // Update the user's name and email using Firebase Authentication API
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTmDtW_6sW0Lmr9pmRRtQhKKYP7qeJCxw`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            email: email,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';

        // Add specific error messages for different errorIds, if needed
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already!';
        }

        throw new Error(message);
      }

      const resData = await response.json();
      console.log('Response data:', resData);

      // Update the user data in Redux state (if needed)
      dispatch({
        type: EDIT_PROFILE,
        name: name,
        email: email,
        // Add other user details if needed
      });

      console.log('Update profile action dispatched successfully.');
    } catch (error) {
      console.error('Error:', error);
      throw error; // Throw the error to handle it in the handleProfileUpdate function
    }
  };
};

// Function to store user data in Firebase Realtime Database
const storeUserData = async (uid, userData) => {
  try {
    const response = await fetch(
      `https://shop-8fe7c-default-rtdb.firebaseio.com/users/${uid}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      console.error('Failed to store user data.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to fetch user data from Firebase Realtime Database
const fetchUserData = async (uid) => {
  try {
    const response = await fetch(
      `https://shop-8fe7c-default-rtdb.firebaseio.com/users/${uid}.json`
    );

    if (!response.ok) {
      console.error('Failed to fetch user data.');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const signup = (name, phone, email, password) => {
  return async (dispatch) => {
    try {
      // Perform signup using Firebase REST API
      const signupData = {
        displayName: name,
        email: email,
        password: password,
        returnSecureToken: true,
      };

      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTmDtW_6sW0Lmr9pmRRtQhKKYP7qeJCxw',
        signupData
      );

      const { idToken, localId } = response.data;

      // Store user data in Firebase Realtime Database
      const userData = {
        name: name,
        phone: phone,
        email: email,
      };

      await axios.put(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/users/${localId}.json`,
        userData,
        {
          params: { auth: idToken },
        }
      );

      // Dispatch SIGNUP action with token and user ID
      dispatch({
        type: SIGNUP,
        token: idToken,
        userId: localId,
        name: name,
        email: email,
        phone: phone,
      });

      // Return the token and userId for access in the authHandler
      return {
        token: idToken,
        userId: localId,
      };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
};

export const orgSignup = (name, phone, email, password) => {
  return async (dispatch) => {
    try {
      // Perform signup using Firebase REST API
      const signupData = {
        displayName: name,
        email: email,
        password: password,
        returnSecureToken: true,
      };

      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTmDtW_6sW0Lmr9pmRRtQhKKYP7qeJCxw',
        signupData
      );

      const { idToken, localId } = response.data;

      // Store user data in Firebase Realtime Database
      const userData = {
        name: name,
        phone: phone,
        email: email,
      };

      await axios.put(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/eventOrganizers/${localId}.json`,
        userData,
        {
          params: { auth: idToken },
        }
      );

      // Dispatch SIGNUP action with token and user ID
      dispatch({
        type: SIGNUP,
        token: idToken,
        userId: localId,
        name: name,
        email: email,
        phone: phone,
      });

      // Return the token and userId for access in the authHandler
      return {
        token: idToken,
        userId: localId,
      };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
};

 
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // Perform the login using Firebase REST API
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTmDtW_6sW0Lmr9pmRRtQhKKYP7qeJCxw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      const { idToken, localId } = response.data;

      // Make a separate API request to fetch additional user details (including name)
      const userDataResponse = await axios.get(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/users/${localId}.json`,
        {
          params: { auth: idToken },
        }
      );

      // Extract the user's name from the userDataResponse
      const { name } = userDataResponse.data;

      // Dispatch the 'LOGIN' action with user data (including name)
      dispatch({
        type: 'LOGIN',
        token: idToken,
        userId: localId,
        name: name,
        email: email,
        phone: '', // If you have phone data in the response, include it here as well
      });

      // Optionally, you can save the token, userId, name, and phone to AsyncStorage or other storage methods.
      // saveDataToStorage(idToken, localId, name, phone);
    } catch (err) {
      throw new Error('Login failed. Please check your credentials.');
    }
  };
};

export const orgLogin = (email, password) => {
  return async (dispatch) => {
    try {
      // Perform the login using Firebase REST API
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTmDtW_6sW0Lmr9pmRRtQhKKYP7qeJCxw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      const { idToken, localId } = response.data;

      // Make a separate API request to fetch additional user details (including name)
      const userDataResponse = await axios.get(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/eventOrganizers/${localId}.json`,
        {
          params: { auth: idToken },
        }
      );

      // Extract the user's name from the userDataResponse
      const { name } = userDataResponse.data;

      // Dispatch the 'LOGIN' action with user data (including name)
      dispatch({
        type: 'LOGIN',
        token: idToken,
        userId: localId,
        name: name,
        email: email,
        phone: '', // If you have phone data in the response, include it here as well
      });

      // Optionally, you can save the token, userId, name, and phone to AsyncStorage or other storage methods.
      // saveDataToStorage(idToken, localId, name, phone);
    } catch (err) {
      throw new Error('Login failed. Please check your credentials.');
    }
  };
};


// export const logout = () => {
//   AsyncStorage.removeItem('userData');
//   return { type: LOGOUT };
// };

// export const logout = () => {
//   clearLogoutTimer();
//   AsyncStorage.removeItem('userData');
//   return { type: LOGOUT };
// };

// const clearLogoutTimer = () => {
//   if (timer) {
//     clearTimeout(timer);
//   }
// };

// const setLogoutTimer = expirationTime => {
//   return dispatch => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };

// const saveDataToStorage = (token, userId, expirationDate) => {
//   AsyncStorage.setItem(
//     'userData',
//     JSON.stringify({
//       token: token,
//       userId: userId,
//       expiryDate: expirationDate.toISOString()
//     })
//   );
// };

// Export any other actions or utility functions you might have
// ...
