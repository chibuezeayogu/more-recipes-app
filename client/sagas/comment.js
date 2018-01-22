import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import headers from '../util/setAuthToken';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


/**
 * walker sagas will be called by watcher saga
 * when an action is dispatched
 * walker sagas: postComment, deleteComment, fetchRecipeComment
 */

/**
 *
 * @description deletes comment posted by a user.
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* deleteComment(action) {
  try {
    const response = yield call(axios.post,
      `/api/v1/recipes/${action.index}/reviews`, headers());
    
    const { data } = response;

    yield put({ type: actionTypes.DELETE_COMMENT_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.DELETE_COMMENT_ERROR });
  }
}

/**
 *
 * @description post user comment.
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* postComment(action) {
  const { id, postedBy, comment } = action;
  try {
    const response = yield call(axios.post, `/api/v1/recipes/${id}/reviews`,
      {
        recipeId: id,
        postedBy,
        comment,
      },
      header
    );
    const { data } = response;
    yield put({ type: actionTypes.POST_COMMENT_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.POST_COMMENT_ERROR });
  }
}

/**
 *
 * @description get recipe comments.
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* fetchRecipeComment(action) {
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes/${action.recipeId}/reviews`, header());
    const { data } = response;
    yield put({ type: actionTypes.GET_COMMENTS_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.GET_COMMENTS_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * atchPostComment: watches dispatch POST_COMMENT action
 * watchDeleteComment: watches dispatch DELETE_COMMENT action
 *watchfetchRecipeComment: watches dispatch GET_COMMENTS action
 */

/**
 * @description watching POST_COMMENT action
 *
 * @method
 *
 * @returns {void}
 *
 */

export function* watchPostComment() {
  yield takeEvery(actionTypes.POST_COMMENT, postComment);
}

/**
 * @description watching DELETE_COMMENT action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchDeleteComment() {
  yield takeEvery(actionTypes.DELETE_COMMENT, deleteComment);
}

/**
 * @description watching GET_COMMENTS action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchfetchRecipeComment() {
  yield takeEvery(actionTypes.GET_COMMENTS, fetchRecipeComment);
}
