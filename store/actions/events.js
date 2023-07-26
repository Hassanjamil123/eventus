// import Product from "../../models/products";
// import Event from "../../models/events";

// export const DELETE_EVENT = 'DELETE_EVENT';
// export const CREATE_EVENT = 'CREATE_EVENT';
// export const UPDATE_EVENT = 'UPDATE_EVENT';
// export const SET_EVENTS = 'SET_EVENTS';

// export const fetchEvents = () => {
//   return async dispatch => {
//     // any async code you want!
//     try {
//       const response = await fetch(
//         'https://shop-8fe7c-default-rtdb.firebaseio.com/events.json'
//       );

//       if (!response.ok) {
//         throw new Error('Something went wrong!');
//       }

//       const resData = await response.json();
//       const loadedEvents = [];

//       for (const key in resData) {
//         loadedProducts.push(
//           new Event(
//             key,
//             'u1',
//             resData[key].title,
//             resData[key].imageUrl,
//             resData[key].description,
//             resData[key].price,
//             resData[key].location,
//             resData[key].date
//           )
//         );
//       }

//       dispatch({ type: SET_EVENTS, products: loadedEvents });
//     } catch (err) {
//       // send to custom analytics server
//       throw err;
//     }
//   };
// };

// export const deleteEvent = productId => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://shop-8fe7c-default-rtdb.firebaseio.com/events/${productId}.json?auth=${token}`,
//       {
//         method: 'DELETE'
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }
//     dispatch({ type: DELETE_EVENT, pid: productId });
//   };
// };

// export const createEvent = (title, description, imageUrl, price, location, date) => {
//   return async (dispatch, getState) => {
//     // any async code you want!
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://shop-8fe7c-default-rtdb.firebaseio.com/events.json?auth=${token}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           imageUrl,
//           price,
//           location,
//           date
//         })
//       }
//     );

//     const resData = await response.json();

//     dispatch({
//       type: CREATE_PRODUCT,
//       productData: {
//         id: resData.name,
//         title,
//         description,
//         imageUrl,
//         price,
//         location,
//         date
//       }
//     });
//   };
// };

// export const updateEvent = (id, title, description, imageUrl, location, date) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     const response = await fetch(
//       `https://shop-8fe7c-default-rtdb.firebaseio.com/events/${id}.json?auth=${token}`,
//       {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           imageUrl,
//           location,
//           date
//         })
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Something went wrong!');
//     }

//     dispatch({
//       type: UPDATE_PRODUCT,
//       pid: id,
//       productData: {
//         title,
//         description,
//         imageUrl,
//         location,
//         date
//       }
//     });
//   };
// };


