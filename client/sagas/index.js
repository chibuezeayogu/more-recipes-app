import { all } from 'redux-saga/effects';
import { watchSignIn, watchSignUp } from './user';
import {
  watchPostComment,
  watchDeleteComment,
  watchfetchRecipeComment
} from './comment';
import {
  watchAddOrRemoveFavourite,
  watchfetchUserFavouritesRecipes,
  watchFetchUserFavouritesRecipeIds
} from './favourite';
import { watchFetchRecipes,
  watchFetchRecipe,
  watchAddRecipe,
  watchDeleteRecipe,
  watchUpvoteRecipe,
  watchDownvoteRecipe,
  watchFetchUserRecipes,
  watchSearchRecipe,
  watchEditRecipe
} from './recipe';

function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchEditRecipe(),
    watchPostComment(),
    watchDeleteComment(),
    watchFetchRecipes(),
    watchAddRecipe(),
    watchDeleteRecipe(),
    watchUpvoteRecipe(),
    watchDownvoteRecipe(),
    watchFetchRecipe(),
    watchfetchRecipeComment(),
    watchAddOrRemoveFavourite(),
    watchfetchUserFavouritesRecipes(),
    watchFetchUserFavouritesRecipeIds(),
    watchFetchUserRecipes(),
    watchSearchRecipe()
  ]);
}

export default rootSaga;
