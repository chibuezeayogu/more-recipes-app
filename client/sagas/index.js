import { all } from 'redux-saga/effects';
import {
  watchSignIn,
  watchSignUp,
  watchEditProfile,
  watchFetchUser } from './user';
import {
  watchPostComment,
  watchfetchRecipeComment
} from './comment';
import {
  watchAddOrRemoveFavourite,
  watchFetchUserFavouritesRecipes,
} from './favourite';

import {
  watchFetchRecipes,
  watchFetchRecipe,
  watchAddRecipe,
  watchDeleteRecipe,
  watchUpvoteRecipe,
  watchDownvoteRecipe,
  watchFetchUserRecipes,
  watchSearchRecipe,
  watchEditRecipe,
  watchFetchMostUpvotedRecipes
} from './recipe';

function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchEditRecipe(),
    watchPostComment(),
    watchFetchRecipes(),
    watchFetchUser(),
    watchAddRecipe(),
    watchEditProfile(),
    watchDeleteRecipe(),
    watchUpvoteRecipe(),
    watchDownvoteRecipe(),
    watchFetchRecipe(),
    watchfetchRecipeComment(),
    watchAddOrRemoveFavourite(),
    watchFetchUserFavouritesRecipes(),
    watchFetchMostUpvotedRecipes(),
    watchFetchUserRecipes(),
    watchSearchRecipe()
  ]);
}

export default rootSaga;
