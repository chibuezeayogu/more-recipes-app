import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    currentUser : {},
    message:{}
};

const userData = (state = initialState, action) => {
    switch(action.type){
        case 'SIGN_IN_SUCCESS' :
            state = {
                isAuthenticated: !isEmpty(action.userData),
                currentUser: action.userData
            };
            return state;
        case 'SIGN_IN_ERROR' :
            state = {
                message: action.message
            };
            return state;
        case 'SIGN_UP_ERROR' :
            state = {
                message: action.message
            };
            return state;
        case 'SIGN_UP_SUCCESS' :
            state = {
                message: action.message
            };
            return state;
        case 'Logout' :
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
