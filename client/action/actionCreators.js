import actionTypes from './actionTypes';

/**
 *
 * @method
 *
 * @param {String} title - recipe title
 *
 * @param {String} description - recipe description
 *
 * @param {String} ingredients - recipe ingredients
 *
 * @param {String} procedures - recipe procedures
 *
 * @param {String} imageURL - recipe imageUrl
 *
 * @returns {Object} payload
 *
 */
export const createRecipe =
  (title, description, ingredients, procedures, imageUrl) => ({
    type: actionTypes.ADD_RECIPE,
    title,
    description,
    ingredients,
    procedures,
    imageUrl
  });

/**
 *
 * @method
 *
 * @param {Integer} recipeId - recipe id
 *
 * @returns {Object} payload
 *
 */
export const delRecipe = recipeId => ({
  type: actionTypes.DELETE_RECIPE,
  recipeId
});

/**
 *
 * @method
 *
 * @param {Integer} recipeId - recipe id
 *
 * @returns {Object} payload
 *
 */
export const upVoteRecipe = recipeId => ({
  type: actionTypes.UP_VOTE_RECIPE,
  recipeId
});

/**
 *
 * @method
 *
 * @param {Integer} recipeId - recipe id
 *
 * @returns {Object} payload
 *
 */
export const downVoteRecipe = recipeId => ({
  type: actionTypes.DOWN_VOTE_RECIPE,
  recipeId
});

/**
 *
 * @description add or remove recipe from favourite
 *
 * @method
 *
 * @param {Integer} recipeId - recipe id
 *
 * @returns {Object} payload
 *
 */
export const addOrRemoveFavourite = recipeId => ({
  type: actionTypes.ADD_OR_REMOVE_FAVOURITE,
  recipeId
});

/**
 *
 * @method
 *
 * @param {Integer} recipeId - recipe id
 *
 * @returns {Object} payload
 *
 */
export const getRecipeComment = recipeId => ({
  type: actionTypes.GET_COMMENTS,
  recipeId
});

/**
 * 
 * @description dispatches action to post review for recipe
 *
 * @method
 *
 * @param {Integer} id - recipe id
 *
 * @param {String} postedBy - user id
 *
 * @param {Text} comment - user comment
 *
 * @returns {Object} payload
 *
 */
export const postComment = (id, postedBy, comment) => ({
  type: actionTypes.POST_COMMENT,
  id,
  postedBy,
  comment
});

/**
 *
 * @method
 *
 * @param {Srting} email - user email
 *
 * @param {String} password - user password
 *
 * @returns {Object} payload
 *
 */
export const login = (email, password) => ({
  type: actionTypes.SIGN_IN,
  email,
  password
});

/**
 *
 * @method
 *
 * @param {String} firstName - user first name
 *
 * @param {String} lastName - user last name
 *
 * @param {String} email - user email
 *
 * @param {String} password - user password
 *
 * @param {String} imageUrl - user imageUrl
 *
 * @returns {Object} payload
 *
 */
export const createAccount =
  (firstName, lastName, email, password, imageUrl) => ({
    type: actionTypes.SIGN_UP,
    firstName,
    lastName,
    email,
    password,
    imageUrl
  });

  /**
   * 
   * @description dispatches an action to gets all recipes in the db
   * 
   * @param {Integer} offset - query offset
   * 
   * @returns {void}
   */
  export const getAllRecipes = offset => ({
    type: actionTypes.GET_ALL_RECIPES,
    offset
  });

   /**
   * 
   * @description dispatches user logout action
   * 
   * @method
   * 
   * @returns {void}
   */
  export const SignOut = () => ({
    type: actionTypes.LOGOUT
  });

  /**
   * 
   * @description dispatches get recipe action
   * 
   * @method
   * 
   * @returns {void}
   */
  export const getRecipe = recipeId => ({
    type: actionTypes.GET_RECIPE,
    recipeId
  });

   /**
   * 
   * @description dispatches action to get user favourite recipe ids
   *
   * @method
   * 
   * @returns {void}
   */
  export const getUserFavouriteRecipeIds = userId => ({
    type: actionTypes.GET_USER_FAVOURITE_RECIPE_Ids,
    userId
  });



