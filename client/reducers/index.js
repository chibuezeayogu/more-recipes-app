import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userData from './user';
import recipeReducer from './recipeReducer';
import comments from './comments';
import favourites from './favourites';
import voting from './Voting';
import userRecipes from './userRecipes';
import searchResult from './searchResult';

const rootReducer = combineReducers({
  recipeReducer,
  comments,
  favourites,
  voting,
  userData,
  userRecipes,
  searchResult,
  routing: routerReducer
});

export default rootReducer;
