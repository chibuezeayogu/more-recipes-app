import expect from 'expect';
import actionTypes from '../../action/actionTypes';
import user from '../../reducers/user';
import mockData from '../__mock__/actionMockData';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

describe('User Reducer', () => {
  it('should handle initialState', () => {
    const action = {
      type: 'NONE',
    };
    expect(user(initialState, action)).toEqual(initialState);
  });
});

describe('User Reducer', () => {
  it('should handle SIGN_IN_SUCCESS, SIGN_UP_SUCCESS OR SET_CURRENT_USER',
    () => {
      const action = {
        type: actionTypes.SIGN_IN_SUCCESS
          || actionTypes.SIGN_UP_SUCCESS
          || actionTypes.SET_CURRENT_USER,
        user: { id: 1, email: 'chibuezeayogu@hotmial.com' }
      };

      expect(user(initialState, action).isAuthenticated).toEqual(true);
      expect(user(initialState, action).currentUser)
        .toEqual({ id: 1, email: 'chibuezeayogu@hotmial.com' });
    });
});

describe('User Reducer', () => {
  it('should handle FETCH_USER_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_USER_SUCCESS,
      user: mockData.user
    };

    expect(user(initialState, action).currentUser).toEqual(mockData.user);
  });
});

describe('User Reducer', () => {
  it('should handle EDIT_PROFILE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.EDIT_PROFILE_SUCCESS,
      user: mockData.user
    };

    expect(user(initialState, action).currentUser).toEqual(mockData.user);
  });
});

describe('User Reducer', () => {
  it('should handle LOGOUT', () => {
    const action = {
      type: actionTypes.LOGOUT,
    };

    expect(user(initialState, action)).toEqual(initialState);
  });
});
