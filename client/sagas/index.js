import { all } from 'redux-saga/effects';
import { watchSignIn, watchSignUp } from './user';
import {
  watchPostComment,
  watchDeleteComment,
  watchfetchRecipeComment
} from './comment';
import {
  watchAddOrRemoveFavourite,
  watchGetUserFavouritesRecipes
} from './favourite';
import { watchFetchRecipes,
  watchFetchRecipe,
  watchAddRecipe,
  watchUpVoteRecipe,
  watchDownVoteRecipe,
  watchFetchUserRecipes,
  watchSearchRecipe
} from './recipe';

function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchPostComment(),
    watchDeleteComment(),
    watchFetchRecipes(),
    watchAddRecipe(),
    watchUpVoteRecipe(),
    watchDownVoteRecipe(),
    watchFetchRecipe(),
    watchfetchRecipeComment(),
    watchAddOrRemoveFavourite(),
    watchGetUserFavouritesRecipes(),
    watchFetchUserRecipes(),
    watchSearchRecipe()
  ]);
}

export default rootSaga;
