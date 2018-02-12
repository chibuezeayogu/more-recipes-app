import assert from 'assert';
import axios from 'axios';
import actionTypes from '../../action/actionTypes';
import jwt from 'jsonwebtoken';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  watchFetchRecipes,
  watchFetchRecipe,
  watchAddRecipe,
  watchUpvoteRecipe,
  watchDownvoteRecipe,
  watchSearchRecipe,
  watchDeleteRecipe,
  watchEditRecipe,
  watchFetchUserRecipes,
  watchFetchMostUpvotedRecipes,
  fetchRecipes,
  fetchRecipe,
  addRecipe,
  upvoteRecipe,
  downvoteRecipe,
  fetchUserRecipes,
  deleteRecipe,
  searchRecipe,
  editRecipe,
  fetchMostUpvotedRecipes
} from '../../sagas/recipe';

describe('WatchFetchRecipes Saga Function', () => {
  it('should call fetchRecipes if FETCH_USER_RECIPES action is dispatched',
    () => {
      const gen = watchFetchRecipes();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.FETCH_ALL_RECIPES, fetchRecipes));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchFetchRecipe Saga Function', () => {
  it('should call fetchRecipe if FETCH_USER action is dispatched',
    () => {
      const gen = watchFetchRecipe();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.FETCH_RECIPE, fetchRecipe));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchAddRecipe Saga Function', () => {
  it('should call fetchRecipe if ADD_RECIPE action is dispatched',
    () => {
      const gen = watchAddRecipe();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.ADD_RECIPE, addRecipe));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchUpvoteRecipe Saga Function', () => {
  it('should call upvoteRecipe if UP_VOTE_RECIPE action is dispatched',
    () => {
      const gen = watchUpvoteRecipe();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.UP_VOTE_RECIPE, upvoteRecipe));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchDownvoteRecipe Saga Function', () => {
  it('should call downVoteRecipe if DOWN_VOTE_RECIPE action is dispatched',
    () => {
      const gen = watchDownvoteRecipe();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.DOWN_VOTE_RECIPE, downvoteRecipe));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchSearchRecipe Saga Function', () => {
  it('should call downVoteRecipe if DOWN_VOTE_RECIPE action is dispatched',
    () => {
      const gen = watchSearchRecipe();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.SEARCH_RECIPE, searchRecipe));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchDeleteRecipe Saga Function', () => {
  it('should call downVoteRecipe if DOWN_VOTE_RECIPE action is dispatched',
    () => {
      const gen = watchDeleteRecipe();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.DELETE_RECIPE, deleteRecipe));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchEditRecipe Saga Function', () => {
  it('should call editRecipe if EDIT_RECIPE action is dispatched',
    () => {
      const gen = watchEditRecipe();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.EDIT_RECIPE, editRecipe));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('WatchFetchUserRecipes Saga Function', () => {
  it('should call fetchUserRecipes if FETCH_USER_RECIPES action is dispatched',
    () => {
      const gen = watchFetchUserRecipes();

      assert.deepEqual(gen.next().value,
        takeEvery(actionTypes.FETCH_USER_RECIPES, fetchUserRecipes));

      assert.deepEqual(gen.next().done, true);
    });
});


describe('WatchFetchMostUpvotedRecipes Saga Function', () => {
  it(`should call etchMostUpvotedRecipes if FETCH_MOST_UPVOTED_RECIPES
    action is dispatched`,
  () => {
    const gen = watchFetchMostUpvotedRecipes();

    assert.deepEqual(gen.next().value,
      takeEvery(actionTypes.FETCH_MOST_UPVOTED_RECIPES, fetchMostUpvotedRecipes));

    assert.deepEqual(gen.next().done, true);
  });
});


describe('FetchRecipes Recipe Saga Function', () => {
  it('should make API call to and dispatch response data to store',
    () => {
      const action = {
        offset: 0
      };
      const gen = fetchRecipes(action);

      assert.deepEqual(gen.next().value,
        call(axios.get, `/api/v1/recipes?limit=6&offset=${action.offset}`));
      const response = {
        data: undefined
      };
      assert.deepEqual(gen.next(response).value,
        put({ type: actionTypes.FETCH_ALL_RECIPES_SUCCESS, data: undefined }));

      assert.deepEqual(gen.next().done, true);
    });
});

describe('FetchRecipe Recipe Saga Function', () => {
  it(`should make API call to fetchRecipe and dispatch response data
    to store`, () => {
    const action = {
      id: 1
    };
    const gen = fetchRecipe(action);

    assert.deepEqual(gen.next().value,
      call(axios.get, `/api/v1/recipes/${action.id}`));
    const response = {
      data: undefined
    };
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.FETCH_RECIPE_SUCCESS, data: undefined }));

    assert.deepEqual(gen.next().done, true);
  });
});

describe('AddRecipe Recipe Saga Function', () => {
  it(`should make API call to add Recipe and dispatch response data
    to store`, () => {
    const action = {
      title: 'Egusi Recipe',
      description: 'Delicious recipe',
      ingredients: 'Melon and vegitable',
      procedures: 'Grind melon',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/' +
          'v1517769827/tvad0agtwxzucqyokktf.jpg'
    };
    const gen = addRecipe(action);

    assert.deepEqual(gen.next().value,
      call(axios.post, '/api/v1/recipes', action));
    const response = {
      data: undefined
    };
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.ADD_RECIPE_SUCCESS, data: undefined }));

    assert.deepEqual(gen.next().done, true);
  });
});


describe('Fetch User Recipes Saga Function', () => {
  it(`should make API call to fetch user recipes and dispatch response data
    to store`, () => {
    const action = {
      userId: 1,
      offset: 0
    };
    const gen = fetchUserRecipes(action);

    assert.deepEqual(gen.next().value,
      call(axios.get, `/api/v1/users/${action.userId}/recipes?limit=6&offset=${action.offset}`));
    const response = {
      data: undefined
    };
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.FETCH_USER_RECIPES_SUCCESS, data: undefined }));

    assert.deepEqual(gen.next().done, true);
  });
});

describe('Delete Recipe Saga Function', () => {
  it(`should make API call to delete recipe and dispatch response data
    to store`, () => {
    const action = {
      id: 1
    };
    const gen = deleteRecipe(action);

    assert.deepEqual(gen.next().value,
      call(axios.delete, `/api/v1/recipes/${action.id}`));

    assert.deepEqual(gen.next().value,
      put({ type: actionTypes.DELETE_RECIPE_SUCCESS, id: action.id }));

    assert.deepEqual(gen.next().done, true);
  });
});


describe('Search Recipe Saga Function', () => {
  it(`should make API call to delete recipe and dispatch response data
    to store`, () => {
    const action = {
      searchTerm: 'pepper soup'
    };
    const gen = searchRecipe(action);

    assert.deepEqual(gen.next().value,
      call(axios.get, `/api/v1/recipes/search?q=${action.searchTerm}`));
    const response = {
      data: undefined
    };
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.SEARCH_RECIPE_SUCCESS, data: undefined }));

    assert.deepEqual(gen.next().done, true);
  });
});

describe('Edit Recipe Saga Function', () => {
  it(`should make API call to edit Recipe and dispatch response data
    to store`, () => {
    const actionCall = {
      title: 'Egusi Recipe',
      description: 'Delicious recipe',
      ingredients: 'Melon and vegitable',
      procedures: 'Grind melon',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/' +
        'v1517769827/tvad0agtwxzucqyokktf.jpg'
    };

    const action = {
      id: 1,
      title: 'Egusi Recipe',
      description: 'Delicious recipe',
      ingredients: 'Melon and vegitable',
      procedures: 'Grind melon',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/' +
      'v1517769827/tvad0agtwxzucqyokktf.jpg'
    };
    const id = 1;
    const gen = editRecipe(action);

    assert.deepEqual(gen.next().value,
      call(axios.put, `/api/v1/recipes/${id}`, actionCall));
    const response = {
      data: undefined
    };
    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.EDIT_RECIPE_SUCCESS, data: undefined }));

    assert.deepEqual(gen.next().done, true);
  });
});

describe('Fetch Most Upvoted Recipes Saga Function', () => {
  it(`should make API call to fetch most upvoted recipes and dispatch response
    data to store`, () => {
    const action = {
      searchTerm: 'pepper soup'
    };
    const gen = fetchMostUpvotedRecipes(action);

    assert.deepEqual(gen.next().value,
      call(axios.get, '/api/v1/recipes/mostupvote'));
    const response = {
      data: undefined
    };
    assert.deepEqual(gen.next(response).value,
      put({
        type: actionTypes.FETCH_MOST_UPVOTED_RECIPES_SUCCESS,
        data: undefined
      }));

    assert.deepEqual(gen.next().done, true);
  });
});

describe('Up Vote Recipe Recipe Saga Function', () => {
  it(`should make API call to up vote a recipe and dispatch response data
    to store`, () => {
    const action = {
      recipeId: 1
    };
    const gen = upvoteRecipe(action);

    assert.deepEqual(gen.next().value,
      call(axios.put, `/api/v1/recipes/${action.recipeId}/upvote`));
    const response = {
      data: { message: undefined, recipe: undefined }
    };

    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.UP_VOTE_RECIPE_SUCCESS, data: undefined }));

    assert.deepEqual(gen.next().done, true);
  });
});

describe('Down Vote Recipe Saga Function', () => {
  it(`should make API call to down vote a recipe and dispatch response data
    to store`, () => {
    const action = {
      recipeId: 1
    };
    const gen = downvoteRecipe(action);

    assert.deepEqual(gen.next().value,
      call(axios.put, `/api/v1/recipes/${action.recipeId}/downvote`));
    const response = {
      data: { message: undefined, recipe: undefined }
    };

    assert.deepEqual(gen.next(response).value,
      put({ type: actionTypes.DOWN_VOTE_RECIPE_SUCCESS, data: undefined }));

    assert.deepEqual(gen.next().done, true);
  });
});
