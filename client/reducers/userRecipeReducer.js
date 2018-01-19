import actionTypes from '../action/actionTypes';

const initialState = {
  recipes: [],
  pagination: {}
};

let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_RECIPES_SUCCESS:
      state = {
        recipes: action.data.recipes,
        pagination: action.data.pagination
      };
      return state;
    case actionTypes.GET_RECIPE_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id === action.data.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data,
            ...state.recipes.slice(index + 1)]
        });
    case actionTypes.DELETE_RECIPE_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id === action.data.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data,
            ...state.recipes.slice(index + 1)]
        });
    case actionTypes.MODIFY_RECIPES_SUCCESS:
      index = state.recipes
        .findIndex(recipes => recipes.id === action.data.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data,
            ...state.recipes.slice(index + 1)]
        });
    default:
      return state;
  }
};
