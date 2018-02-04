import actionTypes from '../action/actionTypes';
import findIndex from '../util/findIndex';

const initialState = {
  favourites: [],
  isFetched: false,
  pagination: {},
  favouritedIds: [],
  isDeleted: false
};

let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_FAVOURITE_RECIPES_SUCCESS:
      state = {
        favourites: action.data.favourites,
        isFetched: true,
        pagination: action.data.pagination
      };
      return state;
    case actionTypes.ADD_OR_REMOVE_FAVOURITE_SUCCESS:
      index = findIndex(state.favourites, action.recipeId);
      return Object.assign(
        {},
        state,
        {
          favourites: [...state.favourites.slice(0, index),
            ...state.favourites.slice(index + 1)],
            isDeleted: true,
            isFetched: false,
        });
    case actionTypes.FETCH_USER_FAVOURITE_RECIPE_Ids_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          favouritedIds: action.data,
        });
    case actionTypes.FETCH_USER_FAVOURITE_RECIPES_ERROR:
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
