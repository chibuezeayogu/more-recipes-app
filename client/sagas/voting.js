import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import headers from '../util/setAuthToken';

/**
 *
 * @description adds or removes a recipe from user favourites
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* addOrRemoveFavourite(action) {
  console.log('called', action);
  try {
    const response = yield call(axios.put,
      `/api/v1/recipes/${action.recipeId}/addOrRemoveFavourite`, headers());
    const { data } = response;

    Materialize.toast(data.message, 4000, 'green');
    if (response.status === 200) {
      yield put({ type: actionTypes.ADD_OR_REMOVE_FAVOURITE, action });
    }
  } catch (error) {
    yield put({ type: actionTypes.ADD_OR_REMOVE_FAVOURITE_ERROR });
  }
}

/**
 *
 * @description fetches  user favourite recipes
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* fetchUserFavouriteRecipes(action) {
  try {
    const response = yield call(axios.get,
      `/api/v1/users/${action.userId}/favouriteRecipes`);
    const { data } = response;
    yield put({ type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchAddORRemoveFavourite: watches dispatch ADD_OR_REMOVE_FAVOURITE action
 * watchFETCHUserFavouritesRecipes: watches dispatch
 * FETCH_USER_FAVOURITE_RECIPES action
 *
 */

/**
 * @description watching ADD_OR_REMOVE_FAVOURITE action
 *
 * @method
 *
 * @returns {void}
 *
 */
function* fetchUserFavouriteRecipes(action) {
  try {
    const response = yield call(axios.get,
      `/api/v1/users/${action.userId}/favouriteRecipes`, headers());
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
 *
 */

/**
 * @description watching ADD_OR_REMOVE_FAVOURITE action
 *
 * @method
 *
 * @returns {void}
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
 * @returns {void}
 *
 */
export function* watchfetchUserFavouritesRecipes() {
  yield takeEvery(actionTypes.FETCH_USER_FAVOURITE_RECIPES,
    fetchUserFavouriteRecipes);
}
