// import models from models directory
import models from '../models';

// create reference to db model
const { Favourite, Recipe } = models;

// create reference to table models for association
const Favourites = Favourite;

export default {

  /**
   * @description add or remove favourite controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  addRemoveFavourite(req, res) {
    Recipe
      .find({
        where: {
          id: req.params.id
        },
      }).then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe not found!' });
        }

        Favourite
          .find({
            where: {
              recipeId: req.params.id,
              userId: req.decoded.user.id
            },
          })
          .then((favourite) => {
            if (favourite == null) {
              Favourite
                .create({
                  recipeId: req.params.id,
                  userId: req.decoded.user.id
                })
                .then(response => res.status(201).send({
                  message: 'Added to your list of favourite'
                }));
            } else {
              favourite
                .destroy()
                .then(response => res.status(200).send({
                  message: 'Removed from your list of favourites'
                }));
            }
          });
      });
  },

  /**
   * @description get user favourites controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  getUserFavourites(req, res) {
    Recipe
      .findAll({
        include: [
          {
            model: Favourites,
            as: 'favourites',
            attributes: [],
            where: {
              userId: req.decoded.user.id
            },
          },
        ],
      })
      .then((recipe) => {
        if (recipe.length === 0) {
          return res.status(404).send({
            message: 'You have not added any recipe to your favourite'
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

/**
   * @description get user favourite recipe Ids
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  getUserFavouriteIds(req, res) {
    Favourite
      .findAll({
        where: {
          userId: req.decoded.user.id
        },
        attributes: ['recipeId']
      })
      .then((recipe) => {
        if (recipe.length === 0) {
          return res.status(404).send({
            message: 'You have not added any recipe to your favourite'
          });
        }
        return res.status(200).send(recipe);
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },
};

