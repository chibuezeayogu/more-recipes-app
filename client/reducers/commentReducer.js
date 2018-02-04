import actionTypes from '../action/actionTypes';

const initialState = {
  reviews: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      state =
        {
          reviews: action.data
        };
        return state;
    case actionTypes.POST_COMMENT_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          reviews: [action.data.review,
            ...state.reviews]
        });
    case actionTypes.POST_COMMENT_ERROR:
      return state;
    default:
      return state;
  }
};

