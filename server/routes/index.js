//module, controllers and middlewares import
import express from 'express';
import favouriteController from '../controllers/favourites';
import recipeController from '../controllers/recipedata';
import votingController from '../controllers/voting';
import reviewController from '../controllers/reviews';
import userController from '../controllers/userdata';

import verifyToken from '../middlewares/auth';

/**
 * Combine user, recipe, voting reviews and favourite routes
 * @param {function} routes
 * @returns {void}
 */
const routes =  (router) => {
    router.route('/users/signup')
        .post(userController.signup);

    router.route('/users/signin')
        .post(userController.signin);

    router.route('/users')
        .get(verifyToken, userController.retrieve)
        .put(verifyToken, userController.update);
        
    router.route('/recipes')
        .get(verifyToken, recipeController.listRecipe);
    
    router.route('/recipes/search')
        .get(verifyToken, recipeController.searchByIngredients);

    router.route('/recipes/mostupvote')
        .get(verifyToken, recipeController.getMostUpVote);

    router.route('/recipes')
        .post(verifyToken, recipeController.addRecipe);

    router.route('/recipes/:id')
        .get(verifyToken, recipeController.retrieveRecipe)
        .put(verifyToken, recipeController.updateRecipe)
        .delete(verifyToken, recipeController.deleteRecipe);

    router.route('/recipes/:id/upvote')
        .put(verifyToken, votingController.upVote);

    
    router.route('/recipes/:id/downvote')
        .put(verifyToken, votingController.downVote);
    

    router.route('/recipes/:id/removefavourite')   
        .delete(verifyToken, favouriteController.removeFromFavorite);


    router.route('/recipes/:id/addfavourite')   
        .put(verifyToken, favouriteController.addToFavorite);
        
    router.route('/users/:userId/recipes')   
        .get(verifyToken, favouriteController.getAllFavourites);
        
    router.route('/recipes/:id/reviews')   
        .post(verifyToken, reviewController.postReview);
};

export default routes;