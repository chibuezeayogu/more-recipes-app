import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import setAuthorizationToken from '../util/setAuthToken';

/**
 * walker sagas will be called by watcher saga
 * when an action is dispatched
 * walker sagas: fetchRecipes, fetchRecipe,
 * addRecipe, upVoteRecipe, downVoteRecipe
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
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes?limit=8&offset=${action.offset}`);
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
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes/${action.recipeId}`);
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
  const { title, description, ingredients, procedures, imageUrl } = action;
  setAuthorizationToken();
  try {
    const response = yield call(axios.post, 
      '/api/v1/recipes', { 
        title,
        description,
        ingredients,
        procedures,
        imageUrl
    });
    const { data } = response;
    yield put({ type: actionTypes.ADD_RECIPE_SUCCESS, data });
  } catch (error) {
      Materialize.toast(error.response.data.message, 4000, 'red');
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
function* upvoteRecipe(action) {
  setAuthorizationToken();
  try {
    const response = yield call(axios.put, `/api/v1/recipes/${action.recipeId}/upvote`);
    const { data } = response;

    Materialize.toast(data.message, 4000, 'green');
    yield put({ type: actionTypes.UP_VOTE_RECIPE_SUCCESS, data });
  } catch (error) {
      Materialize.toast(error.response.data.message, 4000, 'red');
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
function* downvoteRecipe(action) {
  setAuthorizationToken();
  try {
    const response = yield call(axios.put, `/api/v1/recipes/${action.recipeId}/downvote`);
    const { data } = response;

    Materialize.toast(data.message, 4000, 'green');
    yield put({ type: actionTypes.DOWN_VOTE_RECIPE_SUCCESS, data });
  } catch (error) {
    Materialize.toast(error.response.data.message, 4000, 'red');
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
  setAuthorizationToken();
  try {
    const response = yield call(axios.get, 
      `/api/v1/users/${action.userId}/recipes?limit=8&offset=${action.offset}`);
    const { data } = response;
    yield put({ type: actionTypes.GET_USER_RECIPES_SUCCESS, data });
  } catch (error) {
   yield put({ type: actionTypes.GET_USER_RECIPES_ERROR });
  }
}

/**
 *
 * @description delete recipe
 *
 * @method
 *
 * @param {Object} action - recipe id
 *
 * @returns {void}
 *
 */
function* deleteRecipe(action) {
  console.log(' got here called api');
  console.log(action, 'got here called api');

  const { id } = action;
  setAuthorizationToken();
  try{
    const response = yield call(axios.delete, `/api/v1/recipes/${id}`);

    yield put({ type: actionTypes.DELETE_RECIPE_SUCCESS, id });

  } catch(error) {
    yield put({ type: actionTypes.DELETE_RECIPE_ERROR });
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
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes/search?title=${action.searchTerm}`);
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
 * watchUpvoteRecipe: watching UP_VOTE_RECIPE action
 * watchDownvoteRecipe: watching DOWN_VOTE_RECIPE action
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
export function* watchUpvoteRecipe() {
  yield takeEvery(actionTypes.UP_VOTE_RECIPE, upvoteRecipe);
}

/**
 * @description watching DOWN_VOTE_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchDownvoteRecipe() {
  yield takeEvery(actionTypes.DOWN_VOTE_RECIPE, downvoteRecipe);
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


/**
 * @description watching DELETE_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchDeleteRecipe() {
  yield takeEvery(actionTypes.DELETE_RECIPE, deleteRecipe);
}

/**
 * @description watching GET_MOST_FAVOURITED_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchMostRecipe() {
  yield takeEvery(actionTypes.GET_MOST_FAVOURITED_RECIPE, fetchMostRecipe);
}
