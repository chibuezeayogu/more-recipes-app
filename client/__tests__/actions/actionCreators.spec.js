import expect from 'expect';
import actionTypes from '../../action/actionTypes';
import * as actions from '../../action/actionCreators';
import userSingUp from '../__mock__/actionMockData';

const id = 1;

describe('SIGN_UP action', () => {
  it('should dispatch SIGN_UP action', () => {
    const user = {
      firstName: 'Chibueze',
      lastName: 'Ayogu',
      email: 'chibuezeayogu@hotmail.com',
      password: 'Abc12345.@',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/'+
        'v1517769827/tvad0agtwxzucqyokktf.jpg'
    };
    const createdUser = {
      type: actionTypes.SIGN_UP,
      user
    };

    expect(createdUser).toEqual(createdUser);
  });
});

describe('SIGN_IN action', () => {
  it('should dispatch SIGN_IN action', () => {
    const email = 'chibuezeayogu@hotmail.com';
    const password = 'Abc12345.@';
    const expectedResult = {
      type: actionTypes.SIGN_IN,
      email,
      password
    };
    const login = actions.login(email, password);

    expect(login).toEqual(expectedResult);
  });
});

describe('DELETE_RECIPE action', () => {
  it('should dispatch DELETE_RECIPE action', () => {
    const expectedResult = {
      type: actionTypes.DELETE_RECIPE,
      id
    };
    const deleteRecipe = actions.delRecipe(id);

    expect(deleteRecipe).toEqual(expectedResult);
  });
});

describe('POST_COMMENT action', () => {
  it('should dispatch POST_COMMENT action', () => {
    const comment = 'nice recipe';
    const id = 2;
    const postedBy = 1;
    const expectedResult = {
      type: actionTypes.POST_COMMENT,
      id,
      postedBy,
      comment
    };
    const postComment = actions.postComment(id, postedBy, comment);

    expect(postComment).toEqual(expectedResult);
  });
});

describe('FETCH_ALL_RECIPES action', () => {
  it('should dispatch FETCH_ALL_RECIPES action', () => {
    const offset = 0;
    const expectedResult = {
      type: actionTypes.FETCH_ALL_RECIPES,
      offset
    };
    const fetchAllRecipes = actions.fetchAllRecipes(offset);

    expect(fetchAllRecipes).toEqual(expectedResult);
  });
});

describe('FETCH_RECIPE action', () => {
  it('should dispatch FETCH_RECIPE action', () => {
    const id = 0;
    const expectedResult = {
      type: actionTypes.FETCH_RECIPE,
      id
    };
    const fetchRecipe = actions.fetchRecipe(id);

    expect(fetchRecipe).toEqual(expectedResult);
  });
});

describe('FETCH_USER_FAVOURITE_RECIPES action', () => {
  it('should dispatch FETCH_USER_FAVOURITE_RECIPES action', () => {
    const userId = 1;
    const offset = 0;
    const expectedResult = {
      type: actionTypes.FETCH_USER_FAVOURITE_RECIPES,
      userId,
      offset
    };
    const fetchUserFavourites = actions.fetchUserFavourites(userId, offset);

    expect(fetchUserFavourites).toEqual(expectedResult);
  });
});


describe('FETCH_USER_RECIPES action', () => {
  it('should dispatch FETCH_USER_RECIPES action', () => {
    const userId = 1;
    const offset = 0;
    const expectedResult = {
      type: actionTypes.FETCH_USER_RECIPES,
      userId,
      offset
    };
    const fetchUserRecipes = actions.fetchUserRecipes(userId, offset);

    expect(fetchUserRecipes).toEqual(expectedResult);
  });
});

describe('SET_CURRENT_USER action', () => {
  it('should dispatch SET_CURRENT_USER action', () => {
    const user = { id: 3, email: 'chibuezeayogu@hotmail.com' };
    const expectedResult = {
      type: actionTypes.SET_CURRENT_USER,
      user
    };
    const setCurrentUser = actions.setCurrentUser(user);

    expect(setCurrentUser).toEqual(expectedResult);
  });
});

describe('FETCH_USER action', () => {
  it('should dispatch FETCH_USER action', () => {
    const id = 3;
    const expectedResult = {
      type: actionTypes.FETCH_USER,
      id
    };
    const fetchUser = actions.fetchUser(id);

    expect(fetchUser).toEqual(expectedResult);
  });
});

describe('FETCH_MOST_UPVOTED_RECIPES action', () => {
  it('should dispatch FETCH_MOST_UPVOTED_RECIPES action', () => {
    const expectedResult = {
      type: actionTypes.FETCH_MOST_UPVOTED_RECIPES,
    };
    const fetchRecipesWithMostUpvote = actions.fetchRecipesWithMostUpvote();

    expect(fetchRecipesWithMostUpvote).toEqual(expectedResult);
  });
});


describe('EDIT_PROFILE action', () => {
  it('should dispatch EDIT_PROFILE action', () => {
    const user = {
      id: 1,
      firstName: 'Chibueze',
      lastName: 'Ayogu',
      location: 'chibuezeayogu@hotmail.com',
      phone: '07033497338',
      address: 'No 1 Aminu street',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/'+
        'v1517769827/tvad0agtwxzucqyokktf.jpg'
    };
    const expectedResult = {
      type: actionTypes.EDIT_PROFILE,
      id: 1,
      firstName: 'Chibueze',
      lastName: 'Ayogu',
      location: 'chibuezeayogu@hotmail.com',
      phone: '07033497338',
      address: 'No 1 Aminu street',
      imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/'+
        'v1517769827/tvad0agtwxzucqyokktf.jpg'
    };
    const editProfile = actions.editProfile(user);

    expect(editProfile).toEqual(expectedResult);
  });
});

describe('LOGOUT action', () => {
  it('should dispatch LOGOUT action', () => {
    const expectedResult = {
      type: actionTypes.LOGOUT
    };
    const signOut = actions.signOut();

    expect(signOut).toEqual(expectedResult);
  });
});

describe('ADD_OR_REMOVE_FAVOURITE action', () => {
  it('should dispatch ADD_OR_REMOVE_FAVOURITE action', () => {
    const expectedResult = {
      type: actionTypes.ADD_OR_REMOVE_FAVOURITE,
      recipeId: 1
    };
    const addOrRemoveFavourite = actions.addOrRemoveFavourite(1);

    expect(addOrRemoveFavourite).toEqual(expectedResult);
  });
});

describe('SEARCH_RECIPE action', () => {
  it('should dispatch SEARCH_RECIPE action', () => {
    const expectedResult = {
      type: actionTypes.SEARCH_RECIPE,
      searchTerm: 'Elendil-Cfh'
    };
    const search = actions.search('Elendil-Cfh');

    expect(search).toEqual(expectedResult);
  });
});

describe('UP_VOTE_RECIPE action', () => {
  it('should dispatch UP_VOTE_RECIPE action', () => {
    const expectedResult = {
      type: actionTypes.UP_VOTE_RECIPE,
      recipeId: 1
    };
    const upVoteRecipe = actions.upVoteRecipe(1);

    expect(upVoteRecipe).toEqual(expectedResult);
  });
});

describe('DOWN_VOTE_RECIPE action', () => {
  it('should dispatch DOWN_VOTE_RECIPE action', () => {
    const expectedResult = {
      type: actionTypes.DOWN_VOTE_RECIPE,
      recipeId: 1
    };
    const upVoteRecipe = actions.downVoteRecipe(1);

    expect(upVoteRecipe).toEqual(expectedResult);
  });
});

describe('FETCH_COMMENTS action', () => {
  it('should dispatch FETCH_COMMENTS action', () => {
    const expectedResult = {
      type: actionTypes.FETCH_COMMENTS,
      recipeId: 1
    };
    const fetchRecipeComment = actions.fetchRecipeComment(1);

    expect(fetchRecipeComment).toEqual(expectedResult);
  });
});

