import actionTypes from '../action/actionTypes';

const initialState = {
  favourites: [],
  isFetched: false,
  pagination: {}
};

let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_FAVOURITE_RECIPES_SUCCESS:
      state = {
        recipes: action.data.favourites,
        isFetched: true,
        pagination: action.data.pagination
      };
      return state;
    case actionTypes.ADD_OR_REMOVE_FAVOURITE_ERROR:
      return Object.assign(
        {},
        state,
        {
          favourites:
          [...state.favourites,
            action.data]
        });
    case actionTypes.ADD_OR_REMOVE_FAVOURITE_SUCCESS:
      index = state.favourites
        .findIndex(favourite => favourite.id == action.id);
      return Object.assign(
        {},
        state,
        {
          favourites: [...state.favourites.slice(0, index),
            ...state.favourites.slice(index + 1)]
        });
    case actionTypes.GET_USER_FAVOURITE_RECIPES_ERROR:
      state = {
        favourites: [],
        isFetched: true,
      };
      return state;
    default:
      return state;
  }
};
