import actionTypes from '../action/actionTypes';

const initialState = {
  favourites: []
};

let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_FAVOURITE_RECIPES_SUCCESS:
      state = {
        favourites: action.data
      };
      return state;
    case actionTypes.ADD_TO_FAVOURITE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          favourites:
          [...state.favourites,
            action.data]
        });
    case actionTypes.REMOVE_FROM_FAVOURITE_SUCCESS:
      index = state.favourites
        .findIndex(favourite => favourite.id == action.id);
      return Object.assign(
        {},
        state,
        {
          favourites: [...state.favourites.slice(0, index),
            ...state.favourites.slice(index + 1)]
        });
    default:
      return state;
  }
};
