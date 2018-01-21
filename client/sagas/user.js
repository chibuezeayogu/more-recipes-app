import 'babel-polyfill';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { put, takeEvery, call } from 'redux-saga/effects';
import { setAuthorizationToken } from '../util/setAuthToken';
import actionTypes from '../action/actionTypes';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


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
function* loginUser(action) {
  try {
    const response = yield call(axios.post, '/api/v1/users/signin',
      {
        email: action.email,
        password: action.password,
      });

    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    const userData = jwtDecode(token);
    yield put({ type: actionTypes.SIGN_IN_SUCCESS, userData });
  } catch (error) {
    if (error.response.status === 409) {
      Materialize.toast(error.response.data.message, 4000, 'red');
    } else if (error.response.status === 404) {
      Materialize.toast(error.response.data.message, 4000, 'red');
    }
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
  try {
    const response = yield call(axios.post, '/api/v1/users/signup',
      {
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        password: action.password,
        imageUrl: action.imageUrl,
      });

    const { data } = response;
    const { token } = data;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    const userData = jwtDecode(token);
    yield put({ type: actionTypes.SIGN_UP_SUCCESS, userData });
  } catch (error) {
    if (error.response.status === 409) {
      Materialize.toast(error.response.data.message, 4000, 'red');
    } else if (error.response.status === 400) {
      Materialize.toast(error.response.data.message, 4000, 'red');
    }
  }
}

/**
 * watcher sagas: watches for dispatched action
 * watchSignIn: watches dispatch SIGN_IN action
 * watchSignUp: watches dispatch SIGN_UP action
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
  yield takeEvery(actionTypes.SIGN_IN, loginUser);
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
