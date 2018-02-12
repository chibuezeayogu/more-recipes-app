import expect from 'expect';
import actionTypes from '../../action/actionTypes';
import favouriteReducer from '../../reducers/favouriteReducer';
import mockData from '../__mock__/actionMockData';


const initialState = {
  favourites: [],
  isFetched: false,
  pagination: {},
  favouritedIds: [],
  isDeleted: false
};


describe('Favourite Reducer', () => {
  it('should handle initialState', () => {
    const action = {
      type: actionTypes.FETCH_USER_FAVOURITE_RECIPES,
      data: mockData.comment
    };
    const expected = initialState;
    expect(favouriteReducer(initialState, action)).toEqual(expected);
  });
});

describe('Favourite Reducer', () => {
  it('should handle FETCH_USER_FAVOURITE_RECIPES_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_SUCCESS,
      data: mockData.favourites
    };

    const expected = {
      favourites: mockData.favourites.favourites,
      isFetched: true,
      pagination: mockData.favourites.pagination
    };
    expect(favouriteReducer(initialState, action)).toEqual(expected);
  });
});

describe('Favourite Reducer', () => {
  it('should handle ADD_OR_REMOVE_FAVOURITE_SUCCESS action type', () => {

    const initialState = {
      favourites: mockData.favourites.favourites,
      isDeleted: true,
      isFetched: false,
      pagination: mockData.favourites.pagination,
    };

    const action = {
      type: actionTypes.ADD_OR_REMOVE_FAVOURITE_SUCCESS,
      recipeId: 1
    };

    const expected = {
      favourites: [mockData.favourites.favourites[0]],
      isDeleted: true,
      isFetched: false,
      pagination: mockData.favourites.pagination,
    };
    expect(favouriteReducer(initialState, action)).toEqual(expected);
  });
});
describe('Favourite Reducer', () => {
  it('should handle ETCH_USER_FAVOURITE_RECIPES_ERROR', () => {
    const initialState = {
      isFetched: true,
    };
    const action = {
      type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_ERROR
    };
    const expected = initialState;
    expect(favouriteReducer(initialState, action)).toEqual(expected);
  });
});
