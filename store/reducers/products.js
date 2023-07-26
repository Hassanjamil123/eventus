import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
  TOGGLE_INTEREST
} from '../actions/products';
import Product from '../../models/products';

const initialState = {
  availableProducts: [],
  userProducts: [],
};



export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_INTEREST:
      const productId = action.productId;
      const updatedProducts = state.availableProducts.map((product) => {
        if (product.id === productId) {
          // Toggle the interested state for the specific product
          return { ...product, isInterested: !product.isInterested };
        }
        return product;
      });
      return { ...state, availableProducts: updatedProducts };
      case SET_PRODUCTS:
        return {
          ...state,
          availableProducts: action.products,
          userProducts: action.products.filter(
            (prod) => prod.ownerId === action.userId
          ),
        };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
        action.productData.location,
        action.productData.date,
        action.productData.category,
        action.productData.viewCount,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price,
        action.productData.location,
        action.productData.date,
        action.productData.category,
        action.productData.phoneNo
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
