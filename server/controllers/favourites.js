//const Downvotes = require('../models').Downvotes;

import models from '../models';

const Favourite = models.Favourite;
const Recipedata = models.Recipedata;


module.exports = {
    addToFavorite(req, res) {
        req.checkBody('userId', 'userId is required').notEmpty();

        const errors = req.validationErrors();
        if (errors) {
          const errorObject = errors.map(error => error.msg);
          return res.status(400).send({
            message: errorObject,
          });
        }
        
        return Favourite
            .find({
                where: {
                    recipeId: req.params.id,
                    userId: req.body.userId,
                }
            })
            .then((favourite) => {
                if(favourite == null) {
                    favourite
                        .create({
                            recipeId: req.params.id,
                            userId: req.body.userId,
                        })
                        .then((favourite) => res.status(201).send({message: 'Successfully added to you favourite'}))
                        .catch((error) => res.status(400).send({mesage:'Error!, Try again'}))
                } else if(favourite.length == 1){
                    return res.status(400).send({message:'Recipe Already added to your Favourite'})
                }
            })
            .catch((error) => res.status(400).send({mesage:'Error!, Try again'}));
    },

    removeFromFavorite(req, res) {
        req.checkBody('userId', 'userId is required').notEmpty();

        const errors = req.validationErrors();
        if (errors) {
          const errorObject = errors.map(error => error.msg);
          return res.status(400).send({
            message: errorObject,
          });
        }

        return Favourite
            .find({
                where: {
                    recipeId: req.params.id,
                    userId: req.body.userId,
                }
            })
            .then((favourite) => {
                if(favourite == null) {
                    return res.status(400).send({message:'Recipe is not in your favourite'})
                } else if(favourite.length == 1){
                    favourite
                        .destroy({
                            where:{
                                recipeId: req.params.id,
                                userId: req.body.userId,
                            }
                        })
                    return res.status(400).send({message:'Recipe has been removed from your Favourite'});
                }
            })
            .catch((error) => res.status(400).send({mesage:'Error!, Try again'}));
    },
    getAllFavourites(req, res) {
        return Favourite
            .find({
                attributes: ['recipeId'],
                where: {
                    userId: req.params.userId,
                }
            })
            .then((favourite) => {
                if(favourite == null) {
                    return res.status(400).send({message:'No Recipe was found on your favourite'});
                } else {
                    return Recipedata
                        .findAll({
                            attributes:{exclude: ['createdAt', 'updatedAt', 'addedBy']},
                            include: [{
                                modle: Favourite,
                                as: 'My Favourites'
                            }]
                        })
                     return res.status(400).send({recipedata});
                }
            })
            .catch((error) => res.status(400).send(error));
    },
};