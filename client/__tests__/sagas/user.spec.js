import assert from 'assert';
import axios from 'axios';
import actionTypes from '../../action/actionTypes';
import jwt from 'jsonwebtoken';
import { put, call, takeEvery } from 'redux-saga/effects';
import mockData from '../__mock__/actionMockData';
import {
  signIn,
  createUser,
  editProfile,
  fetchUser,
  watchFetchUser,
  watchEditProfile,
  watchSignUp,
  watchSignIn,
} from '../../sagas/user';

const token = jwt.sign({
  id: 1,
  email: 'chibuezeayogu@hotmail.com'
}, '1234567');
const response = {
  data: {
    token
  }
};

describe('WatchFetchUser Saga Function', () => {
  it('should make API call to fetch user and dispatch action to store',
    () => {
      const gen = watchFetchUser();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.FETCH_USER, fetchUser));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchSignIn Saga Function', () => {
  it('should make API call to fetch user and dispatch action to store',
    () => {
      const gen = watchSignIn();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.SIGN_IN, signIn));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchSignUp Saga Function', () => {
  it('should make API call to fetch user and dispatch action to store',
    () => {
      const gen = watchSignUp();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.SIGN_UP, createUser));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchEditProfile Saga Function', () => {
  it('should make API call to fetch user and dispatch action to store',
    () => {
      const gen = watchEditProfile();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.EDIT_PROFILE, editProfile));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('Sign In Saga Function', () => {
  it('should make API call to sign in user and dispatch action to store',
    () => {
      const user = {
        email: 'chibuezeayogu@hotmail.com',
        password: 'ABDC123.@'
      };
      const gen = signIn(user);

      assert.deepEqual(gen.next().value,
        call(axios.post, '/api/v1/users/signin', user));

      assert.deepEqual(gen.next(response).value,
        put({ type: actionTypes.SIGN_IN_SUCCESS, user: undefined }));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('Sign Up Saga Function', () => {
  it('should make API call to sign up user and dispatch action to store',
    () => {
      const gen = createUser(mockData.userSingUp);

      assert.deepEqual(gen.next().value,
        call(axios.post, '/api/v1/users/signup', mockData.userSingUp));
      assert.deepEqual(gen.next(response).value,
        put({ type: actionTypes.SIGN_UP_SUCCESS, user: undefined }));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('Edit Profile Saga Function', () => {
  it('should make API call to edit user and dispatch action to store',
    () => {
      const id = 1;
      const gen = editProfile(mockData.userEdit);

      assert.deepEqual(gen.next().value,
        call(axios.put, `/api/v1/users/${id}`, mockData.userCall));

      const response = {
        data: {
          user: undefined
        }
      };
      assert.deepEqual(gen.next(response).value,
        put({ type: actionTypes.EDIT_PROFILE_SUCCESS, user: undefined }));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('Fetch User Saga Function', () => {
  it('should make API call to fetch user and dispatch action to store',
    () => {
      const userId = {
        id: 1
      };
      const gen = fetchUser(userId);

      assert.deepEqual(gen.next().value,
        call(axios.get, `/api/v1/users/${userId.id}`));

      const response = {
        data: {
          user: undefined
        }
      };
      assert.deepEqual(gen.next(response).value,
        put({ type: actionTypes.FETCH_USER_SUCCESS, user: undefined }));

      assert.deepEqual(gen.next().done, true);
    });
});
