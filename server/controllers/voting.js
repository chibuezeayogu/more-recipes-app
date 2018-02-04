// import db models
import models from '../models'

const { Voting, Recipe } = models;

export default {
  /**
   * @description up vote recipe controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  upvote (req, res) {
    Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe not found'
          })
        }
      })

    Voting.find({
      attributes: ['voting'],
      where: {
        recipeId: req.params.id,
        userId: req.decoded.user.id
      }
    })
      .then((voting) => {
        if (!voting) {
          Voting
            .create({
              view: false,
              voting: 1,
              recipeId: req.params.id,
              userId: req.decoded.user.id
            })
            .then(() => {
              Recipe.findById(req.params.id).then((recipe) => {
                recipe.increment('upvotes').then(() => res.status(201).send({
                  message: 'voting recorded',
                  recipe
                }))
              })
            })
        } else if (voting.voting === 1) {
          Voting.destroy(
            {
              where:
              {
                recipeId: req.params.id,
                userId: req.decoded.user.id
              }
            })
            .then(() => {
              Recipe.findById(req.params.id).then((recipe) => {
                recipe.update({ upvotes: recipe.upvotes - 1 },
                  { fields: ['upvotes'] })
                  .then(() => res.status(200).send({
                    message:
                    'voting removed',
                    recipe
                  }))
              })
            })
        } else if (voting.voting === 0) {
          Voting.update(
            {
              voting: 1
            },
            {
              where:
              {
                recipeId: req.params.id,
                userId: req.decoded.user.id
              }
            })
            .then(() => {
              Recipe
                .findById(req.params.id)
                .then((recipe) => {
                  recipe.update({
                    upvotes: recipe.upvotes + 1,
                    downvotes: recipe.downvotes - 1
                  },
                  { fields: ['upvotes', 'downvotes'] })
                    .then(updatedRecipe => res.status(200).send({
                      message: 'voting recorded',
                      recipe: updatedRecipe
                    }))
                })
            })
        }
      })
      .catch(error => res.status(400).send({ message: error.message }))
  },

  /**
   * @description down vote recipe controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  downvote (req, res) {
    Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe not found'
          })
        }
        Voting
          .find({
            attributes: ['voting'],
            where: {
              recipeId: req.params.id,
              userId: req.decoded.user.id
            }
          })
          .then((voting) => {
            if (!voting) {
              Voting
                .create({
                  view: false,
                  voting: 0,
                  recipeId: req.params.id,
                  userId: req.decoded.user.id
                })
                .then(() => {
                  Recipe.findById(req.params.id).then((recipe) => {
                    recipe.increment('downvotes')
                      .then(() => res.status(200).send({
                        message: 'voting recorded',
                        recipe
                    }))
                  })
                })
            } else if (voting.voting === 0) {
              Voting.destroy(
                {
                  where:
                  {
                    recipeId: req.params.id,
                    userId: req.decoded.user.id
                  }
                })
                .then(() => {
                  Recipe.findById(req.params.id).then((recipe) => {
                    recipe.update({ downvotes: recipe.downvotes - 1 },
                      { fields: ['downvotes'] })
                      .then(() => res.status(200).send({
                        message: 'voting removed',
                        recipe
                      }))
                  })
                })
            } else if (voting.voting === 1) {
              Voting
                .update(
                {
                  voting: 0
                },
                {
                  where:
                  {
                    recipeId: req.params.id,
                    userId: req.decoded.user.id
                  }
                })
              Recipe
                .findById(req.params.id)
                .then((recipe) => {
                  recipe.update({
                    upvotes: recipe.upvotes - 1,
                    downvotes: recipe.downvotes + 1
                  },
                  { fields: ['upvotes', 'downvotes'] })
                    .then(updatedRecipe => res.status(200).send({
                      message: 'voting recorded',
                      recipe: updatedRecipe
                    }))
                })
            }
          })
          .catch(error => res.status(400).send({ message: error.message }))
      })
  },

  /**
   * @description get user voting controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  getUserVoting (req, res) {
    Voting
      .findAll({
        where:
        {
          userId: req.decoded.user.id
        },
        attributes: ['voting', 'recipeId']
      })
      .then((voting) => {
        if (!voting) {
          return res.status(404).send({
            message: 'You have not upvoted or downvoted a recipe'
          })
        }

        return res.status(200).send({ voting })
      })
      .catch(error => res.status(400).send({ message: error.message }))
  }
}
