//const Downvotes = require('../models').Downvotes;

import models from '../models';

const Favourite = models.Favourite;
const Recipedata = models.Recipedata;
const Userdata = models.Userdata;


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

        return Recipedata
            .find({
                where:{
                id: req.params.id,
                }
            }).then((recipedata) => {
                if(!recipedata){
                    return res.status(404).send({message:'Recipe Not found!'})
                } else {
                    return Favourite
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
                                    .then((favourite) => {
                                        return res.status(201).send({message: 'Successfully added to you favourite'});
                                    })
                            } else if(favourite){
                                return res.status(400).send({message:'Recipe already added to your Favourite'})
                            }
                        })
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
        
        return Recipedata
          .find({
              where:{
              id: req.params.id,
              }
          })
          .then((recipedata) => {
              if(!recipedata){
                  return res.status(404).send({message:'Recipe Not found!'})
              } else {
                return Favourite
                    .find({
                        where: {
                            recipeId: req.params.id,
                            userId: req.decoded.userId,
                        }
                    })
                    .then((favourite) => {
                        if(!favourite) {
                            return res.status(400).send({message:'Recipe is not in your favourite'})
                        } else if(favourite){
                            favourite
                                .destroy()
                                .then((favourite) =>{
                                    return res.status(200).send({message:'Recipe has been removed from your Favourite'});
                                })
                        }
                    })
                }
            })
            .catch((error) => res.status(400).send({mesage:'Error!, Try again'}));
    },
    getAllFavourites(req, res) {
        return Userdata
        .findAll({
            include: [{
                model: Favourite,
                include:[{
                    model: Recipedata
                }]
            }],
            where:{
                userId: req.decoded.userId
            }
        })
        .then((userdata) => {
            const resObj = userdata.map(userdata =>{
                return Object.assign(
                    {},
                    {
                        userId: userdata.id,
                        FirstName: userdata.firstname,
                        LastName: userdata.Lastname,
                        favourite: userdata.favourite.recipedata.map(recipedata => {

                            return Object.assign(
                               {},
                               {
                                    recipeId: recipedata.id,
                                    title: recipedata.title,
                                    description: recipedata.description,
                                    ingredients: recipedata.ingredients,
                                    procedures:recipedata.procedures,

                               })
                        })
                    })
                })
            })
            .catch((error) => res.status(400).send(error));
    },
};