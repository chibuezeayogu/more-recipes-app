import actionTypes from './actionTypes';

/**
 *
 * @method
 *
 * @param {String} state - recipe details
 *
 * @returns {Object} payload
 *
 */
export const createRecipe = (state) => {
  const {
    title, description, ingredients, procedures, imageUrl
  } = state;
  return {
    type: actionTypes.ADD_RECIPE,
    title,
    description,
    ingredients,
    procedures,
    imageUrl
  };
};

/**
 *
 * @method
 *
 * @param {Integer} id - recipe id
 *
 * @returns {Object} payload
 *
 */
export const delRecipe = id => ({
  type: actionTypes.DELETE_RECIPE,
  id
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
export const fetchRecipeComment = recipeId => ({
  type: actionTypes.FETCH_COMMENTS,
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
 * @param {Object} state - user details
 *
 * @returns {Object} payload
 *
 */
export const createAccount = (state) => {
  const {
    firstName, lastName, email, password, imageUrl
  } = state;
  return {
    type: actionTypes.SIGN_UP,
    firstName,
    lastName,
    email,
    password,
    imageUrl
  };
};

/**
   *
   * @description dispatches an action to fetch all recipes in the db
   *
   * @param {Integer} offset - query offset
   *
   * @returns {void}
   */
export const fetchAllRecipes = offset => ({
  type: actionTypes.FETCH_ALL_RECIPES,
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
export const signOut = () => ({
  type: actionTypes.LOGOUT
});

  /**
   *
   * @description dispatches fetch recipe action
   *
   * @method
   *
   * @param {Integer} id
   *
   * @returns {void}
   */
export const fetchRecipe = id => ({
  type: actionTypes.FETCH_RECIPE,
  id
});

  /**
   *
   * @description dispatches action to fetch user favourite recipes
   *
   * @method
   *
   * @param {Integer} userId - user id
   *
   * @param {Integer} offset
   *
   * @returns {void}
   */
export const fetchUserFavourites = (userId, offset) => ({
  type: actionTypes.FETCH_USER_FAVOURITE_RECIPES,
  userId,
  offset
});

  /**
   *
   * @description dispatches action to fetch user recipes
   *
   * @method
   *
   * @param {Integer} userId - user id
   *
   * @param {Integer} offset - query offset
   *
   * @returns {void}
   */
export const fetchUserRecipes = (userId, offset) => ({
  type: actionTypes.FETCH_USER_RECIPES,
  userId,
  offset
});

/**
   *
   * @description dispatches action to search for recipes
   *
   * @method
   *
   * @param {Integer} searchTerm - searched word
   *
   * @returns {void}
   */
export const search = searchTerm => ({
  type: actionTypes.SEARCH_RECIPE,
  searchTerm
});

/**
 *
 * @method
 *
 * @param {String} state - recipe details
 *
 * @returns {Object} payload
 *
 */
export const editRecipe = (state) => {
  const {
    id, title, description, ingredients, procedures, imageUrl
  } = state;
  return {
    type: actionTypes.EDIT_RECIPE,
    id,
    title,
    description,
    ingredients,
    procedures,
    imageUrl
  };
};

/**
 *
 * @method
 *
 * @param {String} state - user details
 *
 * @returns {Object} payload
 *
 */
export const editProfile = (state) => {
  const {
    id, firstName, lastName, location, phone, address, imageUrl
  } = state;
  return {
    type: actionTypes.EDIT_PROFILE,
    id,
    firstName,
    lastName,
    location,
    phone,
    address,
    imageUrl
  };
};

/**
 *
 * @method
 *
 * @param {id} id - user id
 *
 * @returns {Object} payload
 *
 */
export const fetchUser = id => ({
  type: actionTypes.FETCH_USER,
  id
});


/**
 *
 * @method
 *
 * @param {id} user - user id
 *
 * @returns {Object} payload
 *
 */
export const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  user
});

/**
 *
 * @method
 *
 * @returns {Object} payload
 *
 */
export const fetchRecipesWithMostUpvote = () => ({
  type: actionTypes.FETCH_MOST_UPVOTED_RECIPES,
});
