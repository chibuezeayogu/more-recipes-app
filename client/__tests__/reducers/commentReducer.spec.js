import expect from 'expect';
import actionTypes from '../../action/actionTypes';
import commentReducer from '../../reducers/commentReducer';
import mockData from '../__mock__/actionMockData';


const initialState = {
  reviews: []
};

describe('Comment Reducer', () => {
  it('should return initialState if action types does not match', () => {
    const action = {
      type: 'None',
    };
    expect(commentReducer(initialState, action).reviews).toEqual([]);
  });
});

describe('Comment Reducer', () => {
  it('should return FETCH_COMMENTS_SUCCESS', () => {
    const action = {
      type: actionTypes.FETCH_COMMENTS_SUCCESS,
      data: mockData.comment
    };
    expect(commentReducer(initialState, action).reviews)
      .toEqual(mockData.comment);
  });
});

describe('Comment Reducer', () => {
  it('should return POST_COMMENT_SUCCESS', () => {
    const initialState = {
      reviews: [mockData.comment]
    };

    const action = {
      type: actionTypes.POST_COMMENT_SUCCESS,
      data: {
        review: mockData.postedComment
      }
    };
    const expected = {
      reviews: [mockData.postedComment, mockData.comment]
    };
    expect(commentReducer(initialState, action)).toEqual(expected);
  });
});
describe('Comment Reducer', () => {
  it('should return POST_COMMENT_ERROR', () => {
    const action = {
      type: actionTypes.POST_COMMENT_ERROR
    };

    expect(commentReducer(initialState, action)).toEqual(initialState);
  });
});
