import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import headers from '../util/setAuthToken';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

/**
 * walker sagas will be called by watcher saga
 * when an action is dispatched
 * walker sagas: fetchRecipes, fetchRecipe
 */

/**
 *
 * @description fetches all recipes
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* fetchRecipes(action) {
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes?limit=8&offset=${action.offset}`, headers());
    const { data } = response;
    yield put({ type: actionTypes.GET_ALL_RECIPES_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.GET_ALL_RECIPES_ERROR });
  }
}

/**
 *
 * @description fetches a single recipe
 *
 * @method
 *
 * @param {Object} action - recipe id
 *
 * @returns {void}
 *
 */
function* fetchRecipe(action) {
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes/${action.recipeId}`, headers());
    const { data } = response;
    yield put({ type: actionTypes.GET_RECIPE_SUCCESS, data });
  } catch (error) {
    if (error.response.status === 400) {
      Materialize.toast(error.response.data.message, 4000, 'red');
      yield put({ type: actionTypes.GET_RECIPE_ERROR });
    }
  }
}

/**
 *
 * @description add a new recipe
 *
 * @method
 *
 * @param {Object} action - recipe data
 *
 * @returns {void}
 *
 */
function* addRecipe(action) {
  console.log(action, 'kkkkkkkkkkkkkkkkkk');
  const { title, description, ingredients, procedures, imageUrl } = action
  try {
    const response = yield call(axios.post, '/api/v1/recipes', {
      title,
      description,
      ingredients,
      procedures,
      imageUrl,
    },
    headers()
  );
    const { data } = response;
    yield put({ type: actionTypes.ADD_RECIPE_SUCCESS, data });
  } catch (error) {
    if (error.response.status === 400) {
      Materialize.toast(error.response.data.message, 4000, 'red');
    }
  }
}

/**
 *
 * @description upvotes recipe
 *
 * @method
 *
 * @param {Object} action - recipe id
 *
 * @returns {void}
 *
 */
function* upVoteRecipe(action) {
  try {
    const response = yield call(axios.put, 
      `/api/v1/recipes/${action.recipeId}/upvote`, headers());
    const { data } = response;

    Materialize.toast(data.message, 4000, 'green');
    yield put({ type: actionTypes.UP_VOTE_RECIPE_SUCCESS, data });
  } catch (error) {
    if (error.response.status === 403) {
      Materialize.toast(error.response.data.message, 4000, 'red');
    }
  }
}

/**
 *
 * @description downvotes recipe
 *
 * @method
 *
 * @param {Object} action - recipe id
 *
 * @returns {void}
 *
 */
function* downVoteRecipe(action) {
  try {
    const response = yield call(axios.put, 
      `/api/v1/recipes/${action.recipeId}/downvote`, headers());
    const { data } = response;

    Materialize.toast(data.message, 4000, 'green');
    yield put({ type: actionTypes.DOWN_VOTE_RECIPE_SUCCESS, data });
  } catch (error) {
    if (error.response.status === 403) {
      Materialize.toast(error.response.data.message, 4000, 'red');
    }
  }
}

/**
 *
 * @description fetch user recipes
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* fetchUserRecipes(action) {
  try {
    const response = yield call(axios.get, 
      `/api/v1/users/${action.userId}/recipes`, headers());
    const { data } = response;
    yield put({ type: actionTypes.GET_USER_RECIPES_SUCCESS, data });
  } catch (error) {
   yield put({ type: actionTypes.GET_USER_RECIPES_ERROR });
  }
}

/**
 *
 * @description search recipe
 *
 * @method
 *
 * @param {Object} action - recipe id
 *
 * @returns {void}
 *
 */
function* searchRecipe(action) {
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes/search?title=${action.searchTerm}`, headers());
    const { data } = response;
    yield put({ type: actionTypes.SEARCH_RECIPE_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.SEARCH_RECIPE_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchFetchRecipes: watching GET_ALL_RECIPES action
 * watchFetchRecipe: watching GET_RECIPE action
 * watchFetchRecipes: watching GET_ALL_RECIPES action
 * watchUpVoteRecipe: watching UP_VOTE_RECIPE action
 * watchDownVoteRecipe: watching DOWN_VOTE_RECIPE action
 * watchFetchUserRecipes: watching GET_USER_RECIPES action
 * watchSearchRecipe: watching SEARCH_RECIPE action
 */

/**
 * @description watching GET_ALL_RECIPES action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchRecipes() {
  yield takeEvery(actionTypes.GET_ALL_RECIPES, fetchRecipes);
}

/**
 * @description watching GET_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchRecipe() {
  yield takeEvery(actionTypes.GET_RECIPE, fetchRecipe);
}

/**
 * @description watching ADD_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchAddRecipe() {
  yield takeEvery(actionTypes.ADD_RECIPE, addRecipe);
}

/**
 * @description watching UP_VOTE_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchUpVoteRecipe() {
  yield takeEvery(actionTypes.UP_VOTE_RECIPE, upVoteRecipe);
}

/**
 * @description watching DOWN_VOTE_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchDownVoteRecipe() {
  yield takeEvery(actionTypes.DOWN_VOTE_RECIPE, downVoteRecipe);
}

/**
 * @description watching GET_USER_RECIPES action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchUserRecipes() {
  yield takeEvery(actionTypes.GET_USER_RECIPES, fetchUserRecipes);
}

/**
 * @description watching SEARCH_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchSearchRecipe() {
  yield takeEvery(actionTypes.SEARCH_RECIPE, searchRecipe);
}
