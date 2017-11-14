
import models from '../models';
const Review = models.Review;
const Recipedata = models.Recipedata;

export default {
  /**
     * @description post recipe function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  postReview(req, res) {
    req.checkParams('id', 'Please input a valid id.').isInt();
    req.checkBody('comment', 'comment is required').notEmpty();
    req.checkBody('comment', 'comment should be at least 5 char long without leading space').matches(/[a-zA-Z0-9]{5,}$/);

    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }
    return Recipedata
      .findById(req.params.id)
      .then((recipedata) => {
        if (!recipedata) {
          res.status(404).send({ message: 'Cannot post. Recipe id not found' });
        }
        
        Review
          .create({
            view: false,
            comment: req.body.comment,
            recipeId: req.params.id,
            userId: req.decoded.userdata.id,
          })
          .then((reviews) => res.status(201).send({ message: 'Comment Posted' }))
          .catch((error) => res.status(400).send({ message: 'Error!. Try again' }));
      })
      .catch((error) => res.status(500).send({ message: 'Error!. Try again' }));
  },
};