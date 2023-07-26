import Product from "../../models/products";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const TOGGLE_INTEREST = 'TOGGLE_INTEREST';

// Define the action creator
export const toggleInterest = (productId) => {
  return { type: TOGGLE_INTEREST, productId };

};

export const fetchProducts = (selectedInterests) => {
  return async (dispatch) => {
    try {
      // Fetch all events from the server
      const response = await fetch(
        'https://shop-8fe7c-default-rtdb.firebaseio.com/events.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      // Filter events based on the selected interests (categories)
      const filteredEvents = filterEventsByCategory(resData, selectedInterests);

      // Process the filtered events and dispatch the action
      const loadedProducts = Object.keys(filteredEvents).map((key) => {
        const eventData = filteredEvents[key];
        return {
          id: key,
          ...eventData,
        };
      });

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      // Handle errors and throw them or dispatch an error action
    }
  };
};

// Function to filter events based on the selected interests (categories)
function filterEventsByCategory(eventsData, selectedInterests) {
  if (selectedInterests.length === 0) {
    // If no interests selected, return all events
    return eventsData;
  } else {
    // Filter events based on the "category" field in each product
    const filteredEvents = {};
    for (const key in eventsData) {
      if (selectedInterests.includes(eventsData[key].productId.category)) {
        filteredEvents[key] = eventsData[key];
      }
    }
    return filteredEvents;
  }
}




export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-8fe7c-default-rtdb.firebaseio.com/events/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price, location, date, category, viewCount) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const createdAt = Date.now();
    const response = await fetch(
      `https://shop-8fe7c-default-rtdb.firebaseio.com/events.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          location,
          date,
          category,
          userId,
          createdAt,
          viewCount,
    
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        location,
        date,
        category,
        userId,
        createdAt,
        viewCount,
    
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, location, date) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-8fe7c-default-rtdb.firebaseio.com/events/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          location,
          date
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        location,
        date
      }
    });
  };
};


export const fetchOrganizerProducts = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://shop-8fe7c-default-rtdb.firebaseio.com/events/${userId}/events.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId, // Assuming ownerId is stored under each event
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].location,
            resData[key].date,
            resData[key].category
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      // Handle the error appropriately, e.g., show an error message to the user
      throw err;
    }
  };
};
