import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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
  try {
    const response = yield call(axios.put,
      `/api/v1/recipes/${action.recipeId}/addRemoveFavourite`);
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
function* fetchUserFavourites(action) {
  try {
    const response = yield call(axios.get,
      `/api/v1/users/${action.userId}/favouriteRecipes`);
    const { data } = response;
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPES_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPES_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchAddORRemoveFavourite: watches dispatch ADD_OR_REMOVE_FAVOURITE action
 * watchGetUserFavouritesRecipes: watches dispatch
 * GET_USER_FAVOURITE_RECIPES action
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
      `/api/v1/users/${action.userId}/favouriteRecipes`);
    const { data } = response;
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPES_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPES_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchAddOrRemoveFavourite: watches dispatch ADD_OR_REMOVE_FAVOURITE action
 * watchfetchUserFavouritesRecipes: watches dispatch
 * GET_USER_FAVOURITE_RECIPES action
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
 * @description watching GET_USER_FAVOURITE_RECIPES action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchfetchUserFavouritesRecipes() {
  yield takeEvery(actionTypes.GET_USER_FAVOURITE_RECIPES, fetchUserFavouriteRecipes);
}
