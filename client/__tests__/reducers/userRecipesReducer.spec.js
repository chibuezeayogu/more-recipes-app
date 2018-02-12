import expect from 'expect';
import actionTypes from '../../action/actionTypes';
import userRecipeReducer from '../../reducers/userRecipeReducer';
import mockData from '../__mock__/actionMockData';

const initialState = {
  recipes: [],
  pagination: {},
  isFetched: false,
  isUpdated: false,
  isDeleted: false
};

describe('User Reducer', () => {
  it('should handle initialState', () => {
    const action = {
      type: 'NONE',
    };
    expect(userRecipeReducer(initialState, action)).toEqual(initialState);
  });
});

describe('User Reducer', () => {
  it('should handle FETCH_USER_RECIPES_ERROR action type', () => {
    const action = {
      type: actionTypes.FETCH_USER_RECIPES_ERROR,
    };
    const initialState = {
      recipes: [],
      isFetched: false,
    };

    expect(userRecipeReducer(initialState, action).isFetched)
      .toEqual(false);
    expect(userRecipeReducer(initialState, action).recipes)
      .toEqual([]);
  });
});

describe('User Reducer', () => {
  it('should handle FETCH_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_RECIPE_SUCCESS,
      data: mockData.data.recipes[0]
    };

    expect(userRecipeReducer(initialState, action).recipes)
      .toEqual([mockData.data.recipes[0]]);
    expect(userRecipeReducer(initialState, action).isFetched)
      .toEqual(true);
  });
});

describe('User Reducer', () => {
  it('should handle DELETE_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.DELETE_RECIPE_SUCCESS,
      id: 1
    };
    const initialState = {
      recipes: mockData.data.recipes,
      pagination: mockData.data.pagination,
      isDeleted: false,
      isFetched: false,
    };

    expect(userRecipeReducer(initialState, action).recipes)
      .toEqual([mockData.data.recipes[0]]);
    expect(userRecipeReducer(initialState, action).pagination)
      .toEqual(mockData.data.pagination);
    expect(userRecipeReducer(initialState, action).isDeleted)
      .toEqual(true);
    expect(userRecipeReducer(initialState, action).isFetched)
      .toEqual(false);
  });
});

describe('User Reducer', () => {
  it('should handle EDIT_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.EDIT_RECIPE_SUCCESS,
      data: { recipe: mockData.recipe }
    };

    expect(userRecipeReducer(initialState, action).recipes)
      .toEqual([mockData.recipe]);
    expect(userRecipeReducer(initialState, action).isUpdated)
      .toEqual(true);
    expect(userRecipeReducer(initialState, action).isFetched)
      .toEqual(false);
  });
});

describe('User Reducer', () => {
  it('should handle FETCH_USER_RECIPES_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_USER_RECIPES_SUCCESS,
      data: mockData.data
    };

    expect(userRecipeReducer(initialState, action).recipes)
      .toEqual(mockData.data.recipes);
    expect(userRecipeReducer(initialState, action).pagination)
      .toEqual(mockData.data.pagination);
    expect(userRecipeReducer(initialState, action).isFetched)
      .toEqual(true);
  });
});
