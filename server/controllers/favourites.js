
//import models from models directory
import models from '../models';

//create reference to db model 
const Favourite = models.Favourite,
      Recipedata = models.Recipedata,
      Userdata = models.Userdata;

// create reference to table models for association
const Favourites = models.Favourite,
      Recipedatas = models.Recipedata,
      Userdatas = models.Userdata;

export default {

  /**
   * @description add to favourites function
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {object} json - payload
   */
  addToFavorite(req, res) {

    //check if a valid parameter id was entered
    req.checkParams('id', 'Please input a valid id.').isInt();

    //display error if it occurs
    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }

    Recipedata
      .find({
        where: {
          id: req.params.id,
        }
      }).then((recipedata) => {
        if (!recipedata) {
          return res.status(404).send({ message: 'Recipe not found!' });
        }

        Favourite
          .find({
            where: {
              recipeId: req.params.id,
              userId: req.decoded.userdata.id,
            }
          })
          .then((favourite) => {
            if (favourite == null) {
              Favourite
                .create({
                  recipeId: req.params.id,
                  userId: req.decoded.userdata.id,
                })
                .then((favourite) => {
                  return res.status(201).send({ message: 'Successfully added to your favourite' });
                });
            } else if (favourite) {
              return res.status(400).send({ message: 'Recipe already added to your favourite' });
            }
          });
      })
      .catch((error) => res.status(500).send({ message: 'Error. Please try again' }));
  },

  /**
  * @description remove favourites function
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {object} json - payload
  */
  removeFromFavorite(req, res) {
    req.checkParams('id', 'Please input a valid id.').isInt();

    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }

    Recipedata
      .find({
        where: {
          id: req.params.id,
        }
      })
      .then((recipedata) => {
        if (!recipedata) {
          return res.status(404).send({ message: 'Recipe not found!' });
        }
        
        Favourite
          .find({
            where: {
              recipeId: req.params.id,
              userId: req.decoded.userdata.id,
            }
          })
          .then((favourite) => {
            if (!favourite) {
              return res.status(400).send({ message: 'Recipe is not in your favourite' });
            }

            if (favourite) {
              favourite
                .destroy()
                .then((favourite) => {
                  return res.status(200).send({ message: 'Recipe has been removed from your favourite' });
                });
            }
          });

      })
      .catch((error) => res.status(500).send({ message: 'Error. Please try again' }));
  },

  /**
   * @description get all favourites function
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {object} json - payload
   */
  getAllFavourites(req, res) {

    Recipedata
      .findAll({
        include: [
          {
            model: Favourites,
            as: 'favourites',
            where: {
              userId: req.decoded.userdata.id
            },
          },
        ],
      })
      .then((recipedata) => {
        if (recipedata.length <= 0) {
          return res.status(200).send({ message: 'You have not added any recipe to your favourite' });
        }
        return res.status(200).send({ recipedata });
      })
      .catch((error) => res.status(500).send({ message: 'Error. Please try again' }));
  },
};