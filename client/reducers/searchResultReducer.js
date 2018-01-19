import actionTypes from '../action/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_RECIPE_SUCCESS:
      return action.data;
    case actionTypes.SEARCH_RECIPE_ERROR:
      return 'No result found';
    default:
      return state;
  }
};
