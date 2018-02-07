import assert from 'assert';
import axios from 'axios';
import actionTypes from '../../action/actionTypes';
import jwt from 'jsonwebtoken';
import { put, call, takeEvery } from 'redux-saga/effects'
import {
  watchAddOrRemoveFavourite,
  fetchUserFavouriteRecipes,
  addOrRemoveFavourite,
  watchFetchUserFavouritesRecipes
  } from '../../sagas/favourite';

describe('Watch Fetch User Favourites Recipes Saga Function', () => {
  it(`should call fetchUserFavouriteRecipes if
    FETCH_USER_FAVOURITE_RECIPES action is dispatched`, () => {
    const gen = watchFetchUserFavouritesRecipes();
    
    assert.deepEqual(gen.next().value,
      takeEvery(actionTypes.FETCH_USER_FAVOURITE_RECIPES,
        fetchUserFavouriteRecipes));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Watch Add Or Remove Favourite Saga Function', () => {
  it('should call addOrRemoveFavourite if FETCH_USER action is dispatched',
    () => {
    const gen = watchAddOrRemoveFavourite();
    
    assert.deepEqual(gen.next().value,
      takeEvery(actionTypes.ADD_OR_REMOVE_FAVOURITE, addOrRemoveFavourite));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Fetch User Favourite Recipes Saga Function', () => {
  it(`should make API call to fetch user favourite recipe and dispatch 
    response data to reducer`, () => {
    const action = {
      userId: 1,
      offset: 0
    }
    const gen = fetchUserFavouriteRecipes(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.get, `/api/v1/users/${action.userId}/favouriteRecipes?limit=6&offset=${action.offset}`));
    const response = {
      data: undefined 
    };
    
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_SUCCESS, data: undefined }));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Fetch User Favourite Recipes Saga Function', () => {
  it(`should dispatch an arror response if the API was unsuccessful`, () => {
    const action = {
      userId: 1,
      offset: 0
    }
    const gen = fetchUserFavouriteRecipes(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.get, `/api/v1/users/${action.userId}/favouriteRecipes?limit=6&offset=${action.offset}`));

    assert.deepEqual(gen.next().value,
      put({ type: actionTypes.FETCH_USER_FAVOURITE_RECIPES_ERROR }));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Add Or Remove Favourite Saga Function', () => {
  it(`should make API call to add or remove favourite and dispatch response
    data to reducer`, () => {
    const action = {
      recipeId: 1
    }
    const gen = addOrRemoveFavourite(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.put, `/api/v1/recipes/${action.recipeId}/addOrRemoveFavourite`));
    const response = {
      data: { message: undefined },
      status: 200
    };
    
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.ADD_OR_REMOVE_FAVOURITE_SUCCESS, recipeId: action.recipeId }));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Add Or Remove Favourite Saga Function', () => {
  it(`should dispatch an error response to reducer if call is
    unsuccessful`, () => {
    const action = {
      recipeId: 1
    }
    const gen = addOrRemoveFavourite(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.put, `/api/v1/recipes/${action.recipeId}/addOrRemoveFavourite`));
    
    assert.deepEqual(gen.next().value,
      put({ type: actionTypes.ADD_OR_REMOVE_FAVOURITE_ERROR}));
  
    assert.deepEqual(gen.next().done, true);
  });
});