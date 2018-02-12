import expect from 'expect';
import actionTypes from '../../action/actionTypes';
import searchReducer from '../../reducers/searchReducer';
import mockData from '../__mock__/actionMockData';

const initialState = {
  isFetched: false,
  recipes: [],
  display: '',
  pagination: {}
};

describe('Search Reducer', () => {
  it('should handle initialState', () => {
    const action = {
      type: 'NONE',
    };
    expect(searchReducer(initialState, action)).toEqual(initialState);
  });
});

describe('Search Reducer', () => {
  it('should handle SEARCH_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.SEARCH_RECIPE_SUCCESS,
      data: mockData.data
    };
    const expected = {
      isFetched: true,
      recipes: mockData.data.recipes,
      display: 'Search result',
      pagination: mockData.data.pagination
    };
    expect(searchReducer(initialState, action)).toEqual(expected);
  });
});

describe('Search Reducer', () => {
  it('should handle SEARCH_RECIPE_ERROR action type', () => {
    const action = {
      type: actionTypes.SEARCH_RECIPE_ERROR,
    };
    const initialState = {
      recipes: [],
      isFetched: true,
      display: 'Search result',
    };
    expect(searchReducer(initialState, action).recipes).toEqual([]);
    expect(searchReducer(initialState, action).isFetched).toEqual(true);
    expect(searchReducer(initialState, action).display)
      .toEqual('Search result');
  });
});

describe('Search Reducer', () => {
  it('should handle FETCH_MOST_UPVOTED_RECIPES_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_MOST_UPVOTED_RECIPES_SUCCESS,
      data: mockData.data
    };
    expect(searchReducer(initialState, action).recipes)
      .toEqual(mockData.data.recipes);
    expect(searchReducer(initialState, action).isFetched).toEqual(true);
    expect(searchReducer(initialState, action).pagination)
      .toEqual(mockData.data.pagination);
    expect(searchReducer(initialState, action).display).toEqual('Top Recipes');
  });
});
