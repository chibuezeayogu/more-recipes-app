//const Downvotes = require('../models').Downvotes;

import models from '../models';

const Favourite = models.Favourite;
const Recipedata = models.Recipedata;


module.exports = {
    addToFavorite(req, res) {
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
                where:{
                id: req.params.id,
                }
            }).then((recipedata) => {
                if(!recipedata){
                    return res.status(404).send({message:'Recipe Not found!'})
                }
            })

        
        Favourite
            .find({
                where: {
                    recipeId: req.params.id,
                    userId: req.decoded.userId,
                }
            })
            .then((favourite) => {
                if(favourite == null) {
                    Favourite
                        .create({
                            recipeId: req.params.id,
                            userId: req.decoded.userId,
                        })
                        .then((favourite) => res.status(201).send({message: 'Successfully added to you favourite'}))
                } else if(favourite.length == 1){
                    return res.status(400).send({message:'Recipe already added to your Favourite'})
                }
            })
            .catch((error) => res.status(400).send({mesage:'Error!, Try again'}));
    },

    removeFromFavorite(req, res) {
        req.checkParams('id', 'Please input a valid id.').isInt();
        
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
                    userId: req.decoded.userId,
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
                                userId: req.decoded.userId,
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
                    userId: req.decoded.userId,
                }
            })
            .then((favourite) => {
                if(favourite == null) {
                    return res.status(400).send({message:'No Recipe was found on your favourite'});
                } else {
                    return Recipedata
                        .findAll({
                            where: {userId: req.decoded.userId,}
                        })
                     return res.status(400).send({recipedata});
                }
            })
            .catch((error) => res.status(400).send(error));
    },
};