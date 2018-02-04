import actionTypes from '../action/actionTypes';

const initialState = {
  isFetched: false,
  recipes: [],
  display: '',
  pagination: {}
};

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_RECIPE_SUCCESS:
    state = {
      recipes: action.data.recipes,
      isFetched: true,
      display: 'Search result',
      pagination: action.data.pagination
    };
    return state;
    case actionTypes.SEARCH_RECIPE_ERROR:
      state = {
        recipes: [],
        isFetched: true,
        display: 'Search result',
      };
      return state;
    case actionTypes.FETCH_MOST_UPVOTED_RECIPES_SUCCESS:
      state = {
        recipes: action.data.recipes,
        isFetched: true,
        pagination: action.data.pagination,
        display: 'Top Recipes',
      };
      return state;
    default:
      return state;
  }
};
