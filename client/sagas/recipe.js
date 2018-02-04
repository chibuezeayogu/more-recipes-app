import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import setAuthorizationToken from '../util/setAuthToken';
import imageToFormData from '../util/ImageUpload';

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
export function* fetchRecipes(action) {
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes?limit=6&offset=${action.offset}`);
    const { data } = response;
    yield put({ type: actionTypes.FETCH_ALL_RECIPES_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_ALL_RECIPES_ERROR });
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
      `/api/v1/recipes/${action.id}`);
    const { data } = response;
    yield put({ type: actionTypes.FETCH_RECIPE_SUCCESS, data });
  } catch (error) {
      yield put({ type: actionTypes.FETCH_RECIPE_ERROR });
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
      '/api/v1/recipes/', { 
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
    const response = yield call(axios.put,
      `/api/v1/recipes/${action.recipeId}/upvote`);
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
    const response = yield call(axios.put,
      `/api/v1/recipes/${action.recipeId}/downvote`);
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
      `/api/v1/users/${action.userId}/recipes?limit=6&offset=${action.offset}`);
    const { data } = response;
    yield put({ type: actionTypes.FETCH_USER_RECIPES_SUCCESS, data });
  } catch (error) {
   yield put({ type: actionTypes.FETCH_USER_RECIPES_ERROR });
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
      `/api/v1/recipes/search?q=${action.searchTerm}`);
    const { data } = response;
    yield put({ type: actionTypes.SEARCH_RECIPE_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.SEARCH_RECIPE_ERROR });
  }
}

/**
 *
 * @description makes api call to update user recipe
 *
 * @method
 *
 * @param {Object} action - recipe id
 *
 * @returns {void}
 *
 */
function* editRecipe(action) {
  const { id, title, description, ingredients, procedures, imageUrl } = action;
  setAuthorizationToken();
  try {
    const response = yield call(axios.put,
      `/api/v1/recipes/${id}`, { 
        title,
        description,
        ingredients,
        procedures,
        imageUrl
    });
    const { data } = response;
    console.log(data, 'updated');
    yield put({ type: actionTypes.EDIT_RECIPE_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.EDIT_RECIPE_ERROR });
  }
}

/**
 *
 * @description makes api call to fetch most upvoted recipes
 *
 * @method
 *
 * @param {Object} action - recipe id
 *
 * @returns {void}
 *
 */
function* fetchMostUpvotedRecipes() {
  setAuthorizationToken();
  try {
    const response = yield call(axios.get, 
      '/api/v1/recipes/mostupvote');
    const { data } = response;
    yield put({ type: actionTypes.FETCH_MOST_UPVOTED_RECIPES_SUCCESS, data });
  } catch (error) {
   yield put({ type: actionTypes.FETCH_MOST_UPVOTED_RECIPES_ERROR });
  }
}


/**
 * watcher sagas: watches for dispatched action
 * watchFetchRecipes: watching FETCH_ALL_RECIPES action
 * watchFetchRecipe: watching FETCH_RECIPE action
 * watchFetchRecipes: watching FETCH_ALL_RECIPES action
 * watchUpvoteRecipe: watching UP_VOTE_RECIPE action
 * watchDownvoteRecipe: watching DOWN_VOTE_RECIPE action
 * watchFetchUserRecipes: watching FETCH_USER_RECIPES action
 * watchSearchRecipe: watching SEARCH_RECIPE action
 */

/**
 * @description watching FETCH_ALL_RECIPES action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchRecipes() {
  yield takeEvery(actionTypes.FETCH_ALL_RECIPES, fetchRecipes);
}

/**
 * @description watching FETCH_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchRecipe() {
  yield takeEvery(actionTypes.FETCH_RECIPE, fetchRecipe);
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
 * @description watching FETCH_USER_RECIPES action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchUserRecipes() {
  yield takeEvery(actionTypes.FETCH_USER_RECIPES, fetchUserRecipes);
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
 * @description watching FETCH_MOST_FAVOURITED_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchMostRecipe() {
  yield takeEvery(actionTypes.FETCH_MOST_FAVOURITED_RECIPE, fetchMostRecipe);
}

/**
 * @description watching FETCH_MOST_FAVOURITED_RECIPE action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchEditRecipe() {
  yield takeEvery(actionTypes.EDIT_RECIPE, editRecipe);
}

/**
 * @description watching FETCH_MOST_UPVOTED_RECIPES action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchFetchMostUpvotedRecipes() {
  yield takeEvery(actionTypes.FETCH_MOST_UPVOTED_RECIPES, fetchMostUpvotedRecipes);
}
