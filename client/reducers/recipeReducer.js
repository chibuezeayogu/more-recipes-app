
import actionTypes from '../action/actionTypes';
import lodash from 'lodash';

const initialState = {
  isCreated: false,
  isFetched: false,
  recipes: [],
  pagination: {}
};
let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_RECIPES_SUCCESS:
      state = {
        recipes: action.data.recipes,
        isFetched: true,
        pagination: action.data.pagination
      };
      return state;
    case actionTypes.ADD_RECIPE_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id == action.data.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [action.data, ...state.recipes],
          isCreated: !lodash.isEmpty(action.data)
        });
    case actionTypes.UP_VOTE_RECIPE_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id == action.data.recipe.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data.recipe,
            ...state.recipes.slice(index + 1)],
        });

    case actionTypes.DOWN_VOTE_RECIPE_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id == action.data.recipe.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data.recipe,
            ...state.recipes.slice(index + 1)],
        });
    case actionTypes.GET_RECIPE_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id == action.data.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data,
            ...state.recipes.slice(index + 1)],
          isFetched: true,
        });
    case actionTypes.GET_RECIPE_ERROR:
      return Object.assign(
        {},
        state,
        {
          isFetched: false
        });
    case actionTypes.DELETE_COMMENT_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id == action.recipeId);
    return Object.assign(
      {},
      state,
      {
        recipes: [...state.recipes.slice(0, index),
          ...state.recipes.slice(index + 1)],
      });
    case actionTypes.GET_ALL_RECIPES_ERROR:
      state = {
        isFetched: true,
        recipes: []
      };
      return state;
    default:
      return state;
  }
};
