import 'babel-polyfill';

import axios from 'axios';
import jwt from 'jsonwebtoken';
import { put, takeEvery, call } from 'redux-saga/effects';
import actionTypes from '../action/actionTypes';
import setAuthorizationToken from '../util/setAuthToken';

/**
 * walker sagas will be called by watcher saga
 * when an action is dispatched
 * walker sagas: loginUser, createUser
 */

/**
 * @description loginUser generator function
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* signIn(action) {
  const {
    email, password
  } = action;
  try {
    const response = yield call(axios.post, '/api/v1/users/signin',
      {
        email,
        password,
      });
    const { data } = response;
    const { token } = data;
    const decode = jwt.decode(token);
    localStorage.setItem('jwtToken', token);
    yield put({ type: actionTypes.SIGN_IN_SUCCESS, user: decode.user });
  } catch (error) {
    Materialize.toast(error.response.data.message, 4000, 'red');
  }
}

/**
 * @description createUser generator function
 *
 * @method
 *
 * @param {Object} action - action object
 *
 * @returns {void}
 *
 */
function* createUser(action) {
  const {
    firstName, lastName, email, password, imageUrl
  } = action;
  try {
    const response = yield call(axios.post, '/api/v1/users/signup',
      {
        firstName,
        lastName,
        email,
        password,
        imageUrl,
      });

    const { data } = response;
    const { token } = data;
    const decode = jwt.decode(token);
    localStorage.setItem('jwtToken', token);
    yield put({ type: actionTypes.SIGN_UP_SUCCESS, user: decode.user });
  } catch (error) {
    Materialize.toast(error.response.data.message, 4000, 'red');
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchSignIn: watches SIGN_IN action
 * watchSignUp: watches SIGN_UP action
 */

/**
 * @description watching SIGN_IN action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchSignIn() {
  yield takeEvery(actionTypes.SIGN_IN, signIn);
}

/**
 * @description watching SIGN_UP action
 *
 * @method
 *
 * @returns {void}
 *
 */
export function* watchSignUp() {
  yield takeEvery(actionTypes.SIGN_UP, createUser);
}
