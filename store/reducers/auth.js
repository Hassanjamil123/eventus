import { LOGIN, SIGNUP, EDIT_PROFILE, LOGOUT, CLEAR_SAVED_EVENT_STATE, SET_IS_EVENT_SAVED } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  name: '',
  email: '',
  phone: '',
  isEventSaved: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        name: action.name, // Update the 'name' property in the state with the 'name' from the action
        email: action.email,
        phone: action.phone,
      };
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        name: action.name,
        email: action.email,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        token: action.token,
        name: action.name,
        email: action.email,
        phone: action.phone,
        // other profile details...
      };
    case SET_IS_EVENT_SAVED:
      return {
        ...state,
        isEventSaved: action.payload,
      };
    case CLEAR_SAVED_EVENT_STATE:
      return {
        ...state,
        isEventSaved: false,
      };
    case LOGOUT:
      return initialState;
      // case SIGNUP:
      //   return {
      //     token: action.token,
      //     userId: action.userId
      //   };  
    default:
      return state;
  }
};
