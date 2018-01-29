import models from '../models';
import reviewNotifier from '../helper/reviewNotifier';

// create reference db model
const { Review, Recipe, User } = models;

export default {
  /**
     * @description get recipe reviews controller
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  getReviews(req, res) {
    Review
      .findAll({
        include: {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'imageUrl'],
        },
        where: {
          recipeId: req.params.id
        }
      })
      .then((review) => {
        if (review.length === 0) {
          return res.status(404).send({
            message:
            'Recipe not found'
          });
        }
        return res.status(200).send(review);
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
   * @description post review controller
   *
   * @param {Object} req - Request object
   *
   * @param {Object} res - Response object
   *
   * @returns {Object} json - payload
   */
  postReview(req, res) {
    const { id } = req.params
    return Recipe
      .findById(id)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({
            message: 'Recipe not found'
          });
        }
        Review
          .create({
            view: false,
            comment: req.body.comment,
            recipeId: req.params.id,
            userId: req.decoded.user.id
          })
          .then((comment) => {
            if (comment) {
              Review
                .find({
                  include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'imageUrl']
                  },
                  where: {
                    id: comment.id
                  }
                })
                .then(review => {
                  reviewNotifier(Recipe, User, id, review.comment, review.User);
                  res.status(201).send({
                  message:
                  'Comment Posted',
                  review
                })
              });
            }
          })
          .catch(error => res.status(400).send({ message: error.message }));
      });
  }
};
