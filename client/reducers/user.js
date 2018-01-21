import isEmpty from 'lodash/isEmpty';
import actionTypes from '../action/actionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  message: {}
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESS:
      state = {
        isAuthenticated: !isEmpty(action.user),
        currentUser: action.user
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
    case actionTypes.SIGN_UP_SUCCESS:
      state = {
        isAuthenticated: !isEmpty(action.user),
        currentUser: action.user
      };
      return state;
    case actionTypes.LOGOUT:
      state = {
        isAuthenticated: false,
        currentUser: {}
      };
      return state;
    default:
      return state;
  }
};

export default userData;
