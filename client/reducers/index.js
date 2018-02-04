import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userData from './user';
import recipeReducer from './recipeReducer';
import commentReducer from './commentReducer';
import favouriteReducer from './favouriteReducer';
import userRecipeReducer from './userRecipeReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  recipeReducer,
  commentReducer,
  favouriteReducer,
  userData,
  userRecipeReducer,
  searchReducer,
  routing: routerReducer
});

export default rootReducer;
