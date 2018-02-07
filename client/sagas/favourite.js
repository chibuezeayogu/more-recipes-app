import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import setAuthorizationToken from '../util/setAuthToken';


 /**
 * walker sagas will be called by watcher saga
 * when an action is dispatched
 * walker sagas: addOrRemoveFavourite, fetchUserFavouriteRecipes,
 * fetchUserFavouritesRecipeIds, fetchUserFavouritesRecipeIds
 */

/**
 *
 * @description adds or removes a recipe from user favourites
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {undefined}
 *
 */
export function* addOrRemoveFavourite(action) {
  const { recipeId } = action;
  setAuthorizationToken();
  try {
    const response = yield call(axios.put,
      `/api/v1/recipes/${recipeId}/addOrRemoveFavourite`);
    const { data : { message }, status } = response;
    Materialize.toast(message, 4000, 'green');
    if (status === 200) {
      yield put({ type: actionTypes.ADD_OR_REMOVE_FAVOURITE_SUCCESS, recipeId});
    }
  } catch (error) {
    yield put({ type: actionTypes.ADD_OR_REMOVE_FAVOURITE_ERROR });
  }
}

/**
 *
 * @description fetches user favourite recipes
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {undefined}
 *
 */
export function* fetchUserFavouriteRecipes(action) {
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/users/${action.userId}/favouriteRecipes?limit=6&offset=${action.offset}`);
    const { data } = response;
    yield put({ type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchAddOrRemoveFavourite: watches dispatch ADD_OR_REMOVE_FAVOURITE action
 * watchfetchUserFavouritesRecipes: watches dispatch
 * FETCH_USER_FAVOURITE_RECIPES action
 * watchFetchUserFavouritesRecipeIds: watches dispatch 
 * FETCH_USER_FAVOURITE_RECIPE_Ids
 *
 */

/**
 * @description watching ADD_OR_REMOVE_FAVOURITE action
 *
 * @method
 *
 * @returns {undefined}
 *
 */
export function* watchAddOrRemoveFavourite() {
  yield takeEvery(actionTypes.ADD_OR_REMOVE_FAVOURITE, addOrRemoveFavourite);
}

/**
 * @description watching FETCH_USER_FAVOURITE_RECIPES action
 *
 * @method
 *
 * @returns {undefined}
 *
 */
export function* watchFetchUserFavouritesRecipes() {
  yield takeEvery(actionTypes.FETCH_USER_FAVOURITE_RECIPES,
    fetchUserFavouriteRecipes);
}

