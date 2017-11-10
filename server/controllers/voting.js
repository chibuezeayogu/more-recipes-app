//const Upvotes = require('../models').Upvotes;

import models from '../models';
const Voting = models.Voting;
const Recipedata = models.Recipedata;

module.exports = {
    upVote(req, res) {
        req.checkParams('id', 'Please input a valid id.').isInt();

        const errors = req.validationErrors();
        if (errors) {
          const errorObject = errors.map(error => error.msg);
          return res.status(400).send({
            message: errorObject,
          });
        }
        return  Recipedata
        .findById(req.params.id)
        .then((recipedata) => {
            if(!recipedata){
                return res.status(400).send({message:'Recipe data not found'});
            } else{
                Voting
                    .find({
                        attributes: ['voting'],
                        where: {
                            recipeId: req.params.id,
                            userId: req.decoded.userdata.id,
                        }
                    })
                    .then((voting) => { 
                        if(voting == null){
                            Voting
                                .create({
                                    view: false,
                                    voting: 1,
                                    recipeId: req.params.id,
                                    userId: req.decoded.userdata.id,
                                })
                                .then(() => {
                                    Recipedata.findById(req.params.id)
                                        .then((recipedata) => {recipedata.increment('upvotes');})
                                    return res.status(200).send({message:'Successfully upvoted'});
                                })        
                        }else if(voting.voting === 1){
                            return res.status(400).send({message: 'You have already upvoted this recipe.'});
                        } else if (voting.voting === 0){
                            Voting
                                .update(
                                    {
                                        voting: 1,
                                    },{
                                        where: {
                                            recipeId: req.params.id,
                                            userId: req.decoded.userdata.id,
                                            }
                                    }
                                    
                                )
                            }
                            Recipedata
                                .findById(req.params.id)
                                .then(recipedata => {
                                    recipedata.increment('upvotes');
                                    recipedata.decrement('downvotes');
                                })
                            return res.status(200).send({message:'Successfully upvoted'});
                        })
                        .catch((error) => res.status(400).send({message:'Error!, Try again'}));
            }
        })
        .catch((error) => res.status(400).send({message:'Error!, Try again'}));
    },

    downVote(req, res) {
        req.checkParams('id', 'Please input a valid id.').isInt();

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
                if(!recipedata){
                    return res.status(400).send({message:'Recipe data not found'});
                } else{
                    Voting
                        .find({
                            attributes: ['voting'],
                            where: {
                                recipeId: req.params.id,
                                userId: req.decoded.userdata.id,
                            }
                        })
                        .then((voting) => {
                            if(voting == null){
                                Voting
                                    .create({
                                        view: false,
                                        voting: 0,
                                        recipeId: req.params.id,
                                        userId: req.decoded.userdata.id,
                                    })
                                    .then((voting) => {
                                        Recipedata.findById(req.params.id).then((recipedata) => {
                                            recipedata.increment('downvotes');}) 
                                        return res.status(200).send({message:'Successfully downvoted'}); 
                                    })
                            } else if(voting.voting == 0){
                                return res.status(400).send({message: 'You have already downvoted this recipe.'});
                            } else if (voting.voting == 1){
                                Voting
                                    .update(
                                        {
                                            voting: 0,
                                        },{
                                            where: {
                                                recipeId: req.params.id,
                                                userId: req.decoded.userdata.id,
                                                }
                                        }
                                    )
                                    Recipedata
                                        .findById(req.params.id).then(recipedata => {
                                            recipedata.increment('downvotes');
                                            recipedata.decrement('upvotes');
                                        })
                                        return res.status(200).send({message:'Successfully downvoted'});        
                                }
                            })
                        .catch((error) => res.status(400).send({message:'Error!, Try again'}));  
                    }
            }) 
            .catch((error) => res.status(400).send({message:'Error!, Try again'}));  
    },
};



 