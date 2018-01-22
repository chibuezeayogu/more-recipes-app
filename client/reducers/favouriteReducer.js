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
          favourites: action.data
        });
    case actionTypes.GET_USER_FAVOURITE_RECIPES_ERROR:
      state = {
        favourites: [],
        isFetched: true,
      };
      return state;
    case actionTypes.GET_USER_FAVOURITE_RECIPE_Ids_SUCCESS:
      state = {
        favouritedIds: action.data,
        isFetched: true,
      };
      return state;
      case actionTypes.GET_USER_FAVOURITE_RECIPE_Ids_ERROR:
    state = {
      favouritedIds: [],
      isFetched: false,
    };
    return state;
    default:
      return state;
  }
};
