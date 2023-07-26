// In reducers/tickets.js
import { SAVE_TICKETS } from '../actions/tickets';

const initialState = {
  tickets: [], // Update the property name to "tickets"
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TICKETS:
      return {
        ...state,
        tickets: state.tickets.concat({ // Update the property name to "tickets"
          event: action.event,
          tickets: action.tickets,
        }),
      };
    default:
      return state;
  }
};

export default ticketsReducer;
