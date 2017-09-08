
import express from 'express';
import controller from '../controllers';
const userController = controller.userdata;
const recipeController = controller.recipedata;
const votingController = controller.voting;
const favouriteController = controller.favourite;
const reviewController = controller.review;


const router = express.Router();
router.post('/api/v1/users/signup', userController.signup);
router.post('/api/v1/users/signin', userController.signin);
router.get('/api/v1/users/:id', userController.retrieve);
router.put('/api/v1/users/:id', userController.update);
router.delete('/api/v1/users/:id', userController.destroy);


router.post('/api/v1/recipes', recipeController.addRecipe);
router.get('/api/v1/recipes/:id', recipeController.retrieveRecipe);
router.put('/api/v1/recipes/:id', recipeController.updateRecipe);
router.get('/api/v1/recipes', recipeController.listRecipe);
router.delete('/api/v1/recipes/:id', recipeController.deleteRecipe);

router.put('/api/v1/recipes/:id/upvote', votingController.upVote);
router.put('/api/v1/recipes/:id/downvote', votingController.downVote);

router.delete('/api/v1/users/:id/remove', favouriteController.removeFromFavorite);
router.put('/api/v1/users/:id/add', favouriteController.addToFavorite);
router.get('/api/v1/users/:userId/recipes', favouriteController.getAllFavourites);

router.post('/api/v1/recipes/:id/reviews', reviewController.postReview);


export default router;

// router.post()

// module.exports = (app) => {
//   app.get('/api', (req, res) => res.status(200).send({
//     message: 'Welcome to the Todos API!',
//   }));

//   app.post('/api/users/signup', userController.signup);
//   app.post('/api/users/signin', userController.signin);
//   app.get('/api/users/:id', userController.retrieve);
//   app.put('/api/users/:id', userController.update);
//   app.delete('/api/users/:id', userController.destroy);


//   app.post('/api/recipes', recipeController.addRecipe);
//   app.get('/api/recipes/:id', recipeController.retrieveRecipe);
//   app.put('/api/recipes/:id', recipeController.updateRecipe);
//   app.get('/api/recipes', recipeController.listRecipe);
//   app.delete('/api/recipes/:id', recipeController.deleteRecipe);

//   app.put('/api/recipes/:id/upvote', votingController.upVote);
//   app.put('/api/recipes/:id/downvote', votingController.downVote);

//   app.delete('/api/users/:id/remove', favouriteController.removeFromFavorite);
//   app.put('/api/users/:id/add', favouriteController.addToFavorite);
//   app.get('/api/users/:userId/recipes', favouriteController.getAllFavourites);


//   app.post('/api/recipes/:id/reviews', reviewController.postReview);
 


// };
