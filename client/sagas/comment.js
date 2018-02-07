import 'babel-polyfill';

import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import setAuthorizationToken from '../util/setAuthToken';

/**
 * walker sagas will be called by watcher saga
 * when an action is dispatched
 * walker sagas: postComment, deleteComment, fetchRecipeComment
 */

/**
 *
 * @description post user comment.
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {undefined}
 *
 */
export function* postComment(action) {
  const { id, postedBy, comment } = action;
  setAuthorizationToken();
  try {
    const response = yield call(axios.post, `/api/v1/recipes/${id}/reviews`,
      {
        postedBy,
        comment,
      }
    );
    const { data } = response;
    yield put({ type: actionTypes.POST_COMMENT_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.POST_COMMENT_ERROR });
  }
}

/**
 *
 * @description fetch recipe comments.
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {undefined}
 *
 */
export function* fetchRecipeComment(action) {
  setAuthorizationToken();
  try {
    const response = yield call(axios.get,
      `/api/v1/recipes/${action.recipeId}/reviews`);
    const { data } = response;
    yield put({ type: actionTypes.FETCH_COMMENTS_SUCCESS, data });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_COMMENTS_ERROR });
  }
}

/**
 * watcher sagas: watches for dispatched action
 * atchPostComment: watches dispatch POST_COMMENT action
 * watchDeleteComment: watches dispatch DELETE_COMMENT action
 *watchfetchRecipeComment: watches dispatch FETCH_COMMENTS action
 */

/**
 * @description watching POST_COMMENT action
 *
 * @method
 *
 * @returns {undefined}
 *
 */

export function* watchPostComment() {
  yield takeEvery(actionTypes.POST_COMMENT, postComment);
}

/**
 * @description watching FETCH_COMMENTS action
 *
 * @method
 *
 * @returns {undefined}
 *
 */
export function* watchfetchRecipeComment() {
  yield takeEvery(actionTypes.FETCH_COMMENTS, fetchRecipeComment);
}
