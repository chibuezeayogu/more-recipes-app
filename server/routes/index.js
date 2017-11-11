//module, controllers and middlewares import
import express from 'express';
import controller from '../controllers';
import verifyToken from '../middlewares/auth';


const userController = controller.userdata,
      recipeController = controller.recipedata,
      votingController = controller.voting,
      favouriteController = controller.favourite,
      reviewController = controller.review;


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

    router.route('/recipes/views/:id')
        .put(verifyToken, recipeController.incrementViews);

    router.route('/recipes/:id/upvote')
        .put(verifyToken, votingController.upVote);

    
    router.route('/recipes/:id/downvote')
        .put(verifyToken, votingController.downVote);
    

    router.route('/users/:id/remove')   
        .delete(verifyToken, favouriteController.removeFromFavorite);


    router.route('/users/:id/add')   
        .put(verifyToken, favouriteController.addToFavorite);
        
    router.route('/users/:userId/favourites')   
        .get(verifyToken, favouriteController.getAllFavourites);
        
    router.route('/recipes/:id/reviews')   
        .post(verifyToken, reviewController.postReview);
}

export default routes;