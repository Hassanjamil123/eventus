// In actions/tickets.js
export const SAVE_TICKETS = 'SAVE_TICKETS';

export const saveTickets = (event, tickets) => {
  return { type: SAVE_TICKETS, event, tickets };
};
