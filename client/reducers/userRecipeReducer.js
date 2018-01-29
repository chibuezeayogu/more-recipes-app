import actionTypes from '../action/actionTypes';

const initialState = {
  recipes: [],
  pagination: {},
  isFetched: false,
  isUpdated: false,
  isDeleted: false
};

let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_RECIPES_SUCCESS:
      state = {
        recipes: action.data.recipes,
        pagination: action.data.pagination,
        isFetched: true,
      };
      return state;
    case actionTypes.GET_USER_RECIPES_ERROR:
      state = {
        recipes: [],
        isFetched: false
      };
      return state;
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
    case actionTypes.DELETE_RECIPE_SUCCESS:
      index = state.recipes
        .findIndex(recipe => recipe.id === action.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            ...state.recipes.slice(index + 1)],
          isDeleted: true,
          isFetched: false,
        });
    case actionTypes.EDIT_RECIPE_SUCCESS:
    console.log('got here', action);
      index = state.recipes
        .findIndex(recipes => recipes.id === action.data.recipe.id);
      return Object.assign(
        {},
        state,
        {
          recipes: [...state.recipes.slice(0, index),
            action.data.recipe,
            ...state.recipes.slice(index + 1)],
            isUpdated: true,
            isFetched: false,
        });
    default:
      return state;
  }
};
