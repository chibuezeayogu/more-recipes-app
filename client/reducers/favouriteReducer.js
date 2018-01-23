import actionTypes from '../action/actionTypes';

const initialState = {
  favourites: [],
  isFetched: false,
  pagination: {},
  favouritedIds: []
};

let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_FAVOURITE_RECIPES_SUCCESS:
      state = {
        favourites: action.data.favourites,
        isFetched: true,
        pagination: action.data.pagination
      };
      return state;
    case actionTypes.ADD_OR_REMOVE_FAVOURITE_SUCCESS:
      index = state.favourites
        .findIndex(favourite => favourite.id === action.recipeId);
      return Object.assign(
        {},
        state,
        {
          favourites: [...state.favourites.slice(0, index),
            ...state.favourites.slice(index + 1)],
        });
    case actionTypes.GET_USER_FAVOURITE_RECIPES_ERROR:
    return Object.assign(
      {},
      state,
      {
        isFetched: true
      });
    default:
      return state;
  }
};
