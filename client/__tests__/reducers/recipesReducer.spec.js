import expect from 'expect';
import actionTypes from '../../action/actionTypes';
import recipeReducer from '../../reducers/recipeReducer';
import mockData from '../__mock__/actionMockData';

const initialState = {
  isCreated: false,
  isFetched: false,
  recipes: [],
  pagination: {}
};

describe('Recipe Reducer', () => {
  it('should return initial state if no action type match', () => {
    const action = {
      type: 'NONE',
    };
    expect(recipeReducer(initialState, action)).toEqual(initialState);
  });
});

describe('Recipe Reducer', () => {
  it('should handle FETCH_ALL_RECIPES_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_ALL_RECIPES_SUCCESS,
      data: mockData.data
    };
    expect(recipeReducer(initialState, action).recipes)
      .toEqual(mockData.data.recipes);
    expect(recipeReducer(initialState, action).pagination)
      .toEqual(mockData.data.pagination);
    expect(recipeReducer(initialState, action).isFetched)
      .toEqual(true);
  });
});

describe('Recipe Reducer', () => {
  it('should handle ADD_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.ADD_RECIPE_SUCCESS,
      data: mockData.data.recipes[0]
    };

    expect(recipeReducer(initialState, action).recipes)
      .toEqual([mockData.data.recipes[0]]);
    expect(recipeReducer(initialState, action).isCreated)
      .toEqual(true);
  });
});

describe('Recipe Reducer', () => {
  it('should handle UP_VOTE_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.UP_VOTE_RECIPE_SUCCESS,
      data: mockData.data.recipes[0]
    };

    expect(recipeReducer(initialState, action).recipes)
      .toEqual([mockData.data.recipes[0]]);
  });
});

describe('Recipe Reducer', () => {
  it('should handle DOWN_VOTE_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.DOWN_VOTE_RECIPE_SUCCESS,
      data: mockData.data.recipes[0]
    };

    expect(recipeReducer(initialState, action).recipes)
      .toEqual([mockData.data.recipes[0]]);
  });
});

describe('Recipe Reducer', () => {
  it('should handle FETCH_RECIPE_SUCCESS action type', () => {
    const action = {
      type: actionTypes.FETCH_RECIPE_SUCCESS,
      data: mockData.data.recipes[0]
    };

    expect(recipeReducer(initialState, action).recipes)
      .toEqual([mockData.data.recipes[0]]);
  });
});

describe('Recipe Reducer', () => {
  it('should handle FETCH_RECIPE_ERROR action type', () => {
    const action = {
      type: actionTypes.FETCH_RECIPE_ERROR,
      data: mockData.recipe
    };

    expect(recipeReducer(initialState, action).isFetched)
      .toEqual(false);
  });
});

describe('Recipe Reducer', () => {
  it('should handle FETCH_ALL_RECIPES_ERROR action type', () => {
    const action = {
      type: actionTypes.FETCH_ALL_RECIPES_ERROR,
      data: mockData.recipe
    };

    expect(recipeReducer(initialState, action).isFetched)
      .toEqual(true);
    expect(recipeReducer(initialState, action).recipes)
      .toEqual([]);
  });
});
