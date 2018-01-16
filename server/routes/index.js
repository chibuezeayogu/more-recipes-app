// module, controllers and middlewares import
import express from 'express';
import favouriteController from '../controllers/favourites';
import recipeController from '../controllers/recipe';
import votingController from '../controllers/voting';
import reviewController from '../controllers/reviews';
import userController from '../controllers/user';
import verifyToken from '../middlewares/auth';
import {
  validateAddRecipeFileds,
  validateParams,
  checkAndValidateUserParams,
  validateCommentField,
  validateUserSignUpFields,
  validateUserSignInFields } from '../middlewares/inputValidation';

/**
 * @description combine user, recipe, voting reviews and favourite routes
 * @param {Function} router
 * @returns {void}
 */
const routes = (router) => {
  router.route('/users/signup')
    .post(validateUserSignUpFields, userController.signup);

  router.route('/users/signin')
    .post(validateUserSignInFields, userController.signin);

  router.route('/users/:userId')
    .get(verifyToken, checkAndValidateUserParams, userController.retrieve)
    .put(verifyToken, checkAndValidateUserParams, userController.update);

  router.route('/recipes')
    .get(verifyToken, recipeController.getAllRecipe);

  router.route('/recipes')
    .post(verifyToken, validateAddRecipeFileds, recipeController.addRecipe);

  router.route('/recipes/mostupvote')
    .get(verifyToken, recipeController.getMostUpVote);

  router.route('/recipes/search')
    .get(verifyToken, recipeController.searchByTitleORIngredient);

  router.route('/users/:userId/recipes')
    .get(verifyToken, checkAndValidateUserParams, recipeController.userRecipes);

  router.route('/recipes/:id')
    .get(verifyToken, validateParams, recipeController.retrieveRecipe)
    .put(verifyToken, validateParams, recipeController.updateRecipe)
    .delete(verifyToken, validateParams, recipeController.deleteRecipe);

  router.route('/recipes/:id/addRemoveFavourite')
    .put(verifyToken, validateParams, favouriteController.addRemoveFavourite);

  router.route('/recipes/:id/downvote')
    .put(verifyToken, validateParams, votingController.downvote);

  router.route('/recipes/:id/upvote')
    .put(verifyToken, validateParams, votingController.upvote);

  router.route('/users/:userId/favouriteRecipes')
    .get(verifyToken, checkAndValidateUserParams, favouriteController.getUserFavourites);

  router.route('/recipes/:id/reviews')
    .post(verifyToken, validateParams, validateCommentField, reviewController.postReview)
    .get(verifyToken, validateParams, reviewController.getReviews);
};

export default routes;
