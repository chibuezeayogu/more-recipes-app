import actionTypes from '../action/actionTypes';

const initialState = {
  reviews: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMMENTS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          reviews: action.data
        });
    case actionTypes.POST_COMMENT_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          reviews: [...state.reviews,
            action.data.review]
        });
    case actionTypes.POST_COMMENT_ERROR:
      return state;
    default:
      return state;
  }
};
