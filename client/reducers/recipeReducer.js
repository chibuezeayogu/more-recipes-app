
import actionTypes from '../action/actionTypes';
import lodash from 'lodash';
import findIndex from '../util/findIndex';

const initialState = {
  isCreated: false,
  isFetched: false,
  recipes: [],
  pagination: {}
};
let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_RECIPES_SUCCESS:
      state = {
        recipes: action.data.recipes,
        isFetched: true,
        pagination: action.data.pagination
      };
      return state;
    case actionTypes.ADD_RECIPE_SUCCESS:
      index = findIndex(state.recipes, action.data.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [action.data, ...state.recipes],
          isCreated: !lodash.isEmpty(action.data)
        });
    case actionTypes.UP_VOTE_RECIPE_SUCCESS:
      index = findIndex(state.recipes, action.data.recipe.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data.recipe,
            ...state.recipes.slice(index + 1)],
        });

    case actionTypes.DOWN_VOTE_RECIPE_SUCCESS:
      index = findIndex(state.recipes, action.data.recipe.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data.recipe,
            ...state.recipes.slice(index + 1)],
        });
    case actionTypes.FETCH_RECIPE_SUCCESS:
      index = findIndex(state.recipes, action.data.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data,
            ...state.recipes.slice(index + 1)],
          isFetched: true,
        });
    case actionTypes.FETCH_RECIPE_ERROR:
      return Object.assign(
        {},
        state,
        {
          isFetched: false
        });
    case actionTypes.DELETE_COMMENT_SUCCESS:
      index = findIndex(state.recipes, action.recipeId);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            ...state.recipes.slice(index + 1)],
        });
    case actionTypes.FETCH_ALL_RECIPES_ERROR:
      state = {
        isFetched: true,
        recipes: []
      };
      return state;
    default:
      return state;
  }
};
