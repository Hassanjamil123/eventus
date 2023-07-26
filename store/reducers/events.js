// import PRODUCTS from '../../data/dummy-data';
// import {
//   DELETE_PRODUCT,
//   CREATE_PRODUCT,
//   UPDATE_PRODUCT,
//   SET_PRODUCTS
// } from '../actions/products';
// import {
//     CREATE_EVENT,
//     DELETE_EVENT,
//     UPDATE_EVENT,
//     SET_EVENTS
// } from '../actions/events'

// import Product from '../../models/products';
// import Event from '../../models/events';

// const initialState = {
//   availableProducts: PRODUCTS,
//   userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_EVENTS:
//       return {
//         availableProducts: action.products,
//         userProducts: action.products.filter(prod => prod.ownerId === 'u1')
//       }
//     case CREATE_EVENT:
//       const newEvent = new Event(
//         action.productData.id,
//         action.productData.ownerId,
//         action.productData.title,
//         action.productData.imageUrl,
//         action.productData.description,
//         action.productData.price,
//         action.productData.location,
//         action.productData.date
//       );
//       return {
//         ...state,
//         availableProducts: state.availableProducts.concat(newEvent),
//         userProducts: state.userProducts.concat(newEvent)
//       };
//     case UPDATE_EVENT:
//       const productIndex = state.userProducts.findIndex(
//         prod => prod.id === action.pid
//       );
//       const updatedProduct = new Event(
//         action.pid,
//         state.userProducts[productIndex].ownerId,
//         action.productData.title,
//         action.productData.imageUrl,
//         action.productData.description,
//         state.userProducts[productIndex].price,
//         action.productData.location,
//         action.productData.date,
                
//       );
//       const updatedUserProducts = [...state.userProducts];
//       updatedUserProducts[productIndex] = updatedProduct;
//       const availableProductIndex = state.availableProducts.findIndex(
//         prod => prod.id === action.pid
//       );
//       const updatedAvailableProducts = [...state.availableProducts];
//       updatedAvailableProducts[availableProductIndex] = updatedProduct;
//       return {
//         ...state,
//         availableProducts: updatedAvailableProducts,
//         userProducts: updatedUserProducts
//       };
//     case DELETE_EVENT:
//       return {
//         ...state,
//         userProducts: state.userProducts.filter(
//           product => product.id !== action.pid
//         ),
//         availableProducts: state.availableProducts.filter(
//           product => product.id !== action.pid
//         )
//       };
//   }
//   return state;
// };