import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userData from './user';
import recipeReducer from './recipeReducer';
import commentReducer from './commentReducer';
import favouriteReducer from './favouriteReducer';
import voting from './Voting';
import userRecipeReducer from './userRecipeReducer';
import searchResultReducer from './searchResultReducer';

const rootReducer = combineReducers({
  recipeReducer,
  commentReducer,
  favouriteReducer,
  voting,
  userData,
  userRecipeReducer,
  searchResultReducer,
  routing: routerReducer
});

export default rootReducer;
