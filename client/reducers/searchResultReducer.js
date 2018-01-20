import actionTypes from '../action/actionTypes';

const initialState = {
  isFetched: false,
  recipes: [],
  pagination: {}
};

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_RECIPE_SUCCESS:
    state = {
      recipes: action.data.recipes,
      isFetched: true,
      pagination: action.data.pagination
    };
    return state;
    case actionTypes.SEARCH_RECIPE_ERROR:
      state = {
        recipes: [],
        isFetched: true,
      };
      return state;
    default:
      return state;
  }
};
