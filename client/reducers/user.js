import isEmpty from 'lodash/isEmpty';
import actionTypes from '../action/actionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.SET_CURRENT_USER:
    case actionTypes.SIGN_UP_SUCCESS:
      state =
        {
          currentUser: action.user,
          isAuthenticated: !isEmpty(action.user),
        };
      return state;
    case actionTypes.SIGN_IN_ERROR:
      state = {
        message: action.message
      };
      return state;
    case actionTypes.SIGN_UP_ERROR:
      state = {
        message: action.message
      };
      return state;
    case actionTypes.FETCH_USER_SUCCESS:
    return Object.assign(
      {},
      state,
      {
        currentUser:  action.user ,
      });
    case actionTypes.EDIT_PROFILE_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          currentUser: action.user
        });
    case actionTypes.LOGOUT:
      return Object.assign(
        {},
        state,
        {
          isAuthenticated: false,
          currentUser: {}
        });
    default:
      return state;
  }
};

export default userData;
