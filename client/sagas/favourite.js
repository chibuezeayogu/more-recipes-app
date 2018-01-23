import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import setAuthorizationToken from '../util/setAuthToken';

/**
 * watcher sagas: watches for dispatched action
 * watchAddORRemoveFavourite: watches dispatch ADD_OR_REMOVE_FAVOURITE action
 * watchGetUserFavouritesRecipes: watches dispatch
 * GET_USER_FAVOURITE_RECIPES action
 *
 */

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
  setAuthorizationToken();
  try {
    const response = yield call(axios.put,
      `/api/v1/recipes/${action.recipeId}/addOrRemoveFavourite`);
    const { data } = response;
      console.log(response.status, 'sfgsfgfgfgsfgsfgsfgsfdgsfdgsdf');
    Materialize.toast(data.message, 4000, 'green');
    if (response.status === 200) {
      yield put({ type: actionTypes.ADD_OR_REMOVE_FAVOURITE_SUCCESS, action });
    }
  } catch (error) {
    Materialize.toast(error.response.data.message, 4000, 'red');
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
 * @returns {void}
 *
 */
function* fetchUserFavouriteRecipes(action) {
  console.log('got here fevourites api');
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/users/${action.userId}/favouriteRecipes?limit=8&offset=${action.offset}`);
    const { data } = response;
    console.log(data, 'favourites data');
    Materialize.toast(response.data.message, 4000, 'red');
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPES_SUCCESS, data });
  } catch (error) {
    Materialize.toast(error.response.data.message, 4000, 'red');
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPES_ERROR });
  }
}

/**
 * @description watching ADD_OR_REMOVE_FAVOURITE action
 *
 * @method
 *
 * @returns {void}
 *
 */
function* fetchUserFavouritesRecipeIds(action) {
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/users/${action.userId}/favouriteRecipeIds`);
    const { data } = response;
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPE_Ids_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.GET_USER_FAVOURITE_RECIPE_Ids_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchAddOrRemoveFavourite: watches dispatch ADD_OR_REMOVE_FAVOURITE action
 * watchfetchUserFavouritesRecipes: watches dispatch
 * GET_USER_FAVOURITE_RECIPES action
 * watchFetchUserFavouritesRecipeIds: watches dispatch 
 * GET_USER_FAVOURITE_RECIPE_Ids
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
  console.log('watching fevourites api');
  yield takeEvery(actionTypes.GET_USER_FAVOURITE_RECIPES,
    fetchUserFavouriteRecipes);
}

/**
 * @description watching GET_USER_FAVOURITE_RECIPES action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchUserFavouritesRecipeIds() {
  yield takeEvery(actionTypes.GET_USER_FAVOURITE_RECIPE_Ids,
    fetchUserFavouritesRecipeIds);
}
