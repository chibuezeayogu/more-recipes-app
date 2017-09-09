
import express from 'express';
import controller from '../controllers';
import verifyToken from '../middlewares/auth';

const userController = controller.userdata;
const recipeController = controller.recipedata;
const votingController = controller.voting;
const favouriteController = controller.favourite;
const reviewController = controller.review;

const routes =  (router) => {
    router.route('/users/signup')
        .post(userController.signup);

    router.route('/users/signin')
        .post(userController.signin);


    router.route('/users/:id')
        .get(verifyToken, userController.retrieve)
        .put(verifyToken, userController.update)
        .delete(verifyToken, userController.destroy);

    router.route('/recipes')
        .get(verifyToken, recipeController.listRecipe)
        .post(verifyToken, recipeController.addRecipe);

    router.route('/recipes/:id')
        .get(verifyToken, recipeController.retrieveRecipe)
        .put(verifyToken, recipeController.updateRecipe)
        .delete(verifyToken, recipeController.deleteRecipe);

    router.route('/recipes/:id/upvote')
        .put(verifyToken, votingController.upVote);

    
    router.route('/recipes/:id/downvote')
        .put(verifyToken, votingController.downVote);
    

    router.route('/users/:id/remove')   
        .delete(verifyToken, favouriteController.removeFromFavorite);


    router.route('/users/:id/add')   
        .put(verifyToken, favouriteController.addToFavorite);
        
    router.route('/users/:userId/recipes')   
        .get(verifyToken, favouriteController.getAllFavourites);
        
    router.route('/recipes/:id/reviews')   
        .post(verifyToken, reviewController.postReview);
}

export default routes;