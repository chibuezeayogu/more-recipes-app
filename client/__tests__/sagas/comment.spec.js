import assert from 'assert';
import axios from 'axios';
import actionTypes from '../../action/actionTypes';
import jwt from 'jsonwebtoken';
import { put, call, takeEvery } from 'redux-saga/effects'
import {
  postComment,
  fetchRecipeComment,
  watchPostComment,
  watchfetchRecipeComment
  } from '../../sagas/comment';

describe('Watch Post Comment Saga Function', () => {
  it(`should call fetchUserFavouriteRecipes if
    FETCH_USER_FAVOURITE_RECIPES action is dispatched`, () => {
    const gen = watchPostComment();
    
    assert.deepEqual(gen.next().value,
      takeEvery(actionTypes.POST_COMMENT, postComment));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Watch Fetch Recipe Comment Saga Function', () => {
  it('should call fetchRecipeComment if FETCH_COMMENTS action is dispatched',
    () => {
    const gen = watchfetchRecipeComment();
    
    assert.deepEqual(gen.next().value,
      takeEvery(actionTypes.FETCH_COMMENTS, fetchRecipeComment));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Fetch User Favourite Recipes Saga Function', () => {
  it(`should make API call to up vote a recipe and dispatch response data
    to reducer`, () => {
    const action = {
      recipeId: 1,
    }
    const gen = fetchRecipeComment(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.get, `/api/v1/recipes/${action.recipeId}/reviews`));
    const response = {
      data: undefined 
    };
    
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.FETCH_COMMENTS_SUCCESS, data: undefined }));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Fetch Recipe Comment Saga Function', () => {
  it(`should dispatch an error response to reducer if call is
    unsuccessful`, () => {
    const action = {
      recipeId: 1,
    }
    const gen = fetchRecipeComment(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.get, `/api/v1/recipes/${action.recipeId}/reviews`));

    assert.deepEqual(gen.next().value,
      put({ type: actionTypes.FETCH_COMMENTS_ERROR }));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Post Comment Saga Function', () => {
  it(`should make API call to post comment and dispatch response
    data to reducer`, () => {
    const action = {
      id: 1,
      postedBy: 1,
      comment: 'nice recipe'
    };

    const id =  1;
    const actionCall = {
      postedBy: 1,
      comment: 'nice recipe'
    };

    const gen = postComment(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.post, `/api/v1/recipes/${id}/reviews`, actionCall));
    const response = {
      data: undefined 
    };
    
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.POST_COMMENT_SUCCESS, data: undefined }));
  
    assert.deepEqual(gen.next().done, true);
  });
});

describe('Post Comment Saga Function', () => {
  it(`should dispatch an error response if API call was unsuccessful`, () => {
    const action = {
      id: 1,
      postedBy: 1,
      comment: 'nice recipe'
    };

    const id =  1;
    const actionCall = {
      postedBy: 1,
      comment: 'nice recipe'
    };

    const gen = postComment(action);
    
    assert.deepEqual(gen.next().value,
      call(axios.post, `/api/v1/recipes/${id}/reviews`, actionCall));
    
    assert.deepEqual(gen.next().value,
      put({ type: actionTypes.POST_COMMENT_ERROR }));
  
    assert.deepEqual(gen.next().done, true);
  });
});