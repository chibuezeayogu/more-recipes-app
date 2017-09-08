//const Upvotes = require('../models').Upvotes;

import models from '../models';
const Voting = models.Voting;
const Recipedata = models.Recipedata;

module.exports = {
    upVote(req, res) {
        req.checkBody('userId', 'userId is required').notEmpty();
        req.checkBody('voting', 'voting is required').notEmpty();

        const errors = req.validationErrors();
        if (errors) {
          const errorObject = errors.map(error => error.msg);
          return res.status(400).send({
            message: errorObject,
          });
        }

        if(req.body.voting != 1) {
            return res.status(400).send({message: 'Invalid voting input: Enter 1 to upvote'});
        }

        Voting
            .find({
                attributes: ['voting'],
                where: {
                    recipeId: req.params.id,
                    userId: req.body.userId,
                }
            })
            .then((voting) => { 
                if(voting == null){
                    Voting
                        .create({
                            view: false,
                            voting: req.body.voting,
                            recipeId: req.params.id,
                            userId: req.body.userId,
                        })
                        .then(() => {
                            Recipedata
                                .findById(req.params.id)
                                .then((recipedata) => {recipedata.increment('upvotes');})
                            return res.status(200).send({mesage:'Successfully upvoted'});
                        })        
                        .catch((error) => res.status(400).send({mesage:'Error!, Try again'}));
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
                                    userId: req.body.userId,
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
                    return res.status(200).send({mesage:'Successfully upvoted'});
                })
                .catch((error) => res.status(400).send({mesage:'Error!, Try again'}));
    },

    downVote(req, res) {
        req.checkBody('userId', 'userId is required').notEmpty();
        req.checkBody('voting', 'voting is required').notEmpty();

        const errors = req.validationErrors();
        if (errors) {
          const errorObject = errors.map(error => error.msg);
          return res.status(400).send({
            message: errorObject,
          });
        }

        if(req.body.voting != 0) {
            return res.status(400).send({message: 'Invalid voting input: Enter 0 to downvote'});
        }

        return Voting
            .find({
                attributes: ['voting'],
                where: {
                    recipeId: req.params.id,
                    userId: req.body.userId,
                }
            })
            .then((voting) => {
                if(voting == null){
                    Voting
                        .create({
                            view: false,
                            voting: req.body.voting,
                            recipeId: req.params.id,
                            userId: req.body.userId,
                        })
                        .then((voting) => {
                            Recipedata.findById(req.params.id).then((recipedata) => {
                                recipedata.increment('upvotes');}) 
                            return res.status(200).send({mesage:'Successfully downvoted'}); 
                        })
                        .catch((error) => res.status(400).send({mesage:'Error!, Try again!!!!'}));
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
                                    userId: req.body.userId,
                                    }
                            }
                        )
                        Recipedata.
                        findById(req.params.id).then(recipedata => {
                            recipedata.decrement('downvotes');
                            recipedata.increment('upvotes');
                        })
                        return res.status(200).send({mesage:'Successfully downvoted'});        
                    }
                })
               .catch((error) => res.status(400).send({mesage:'Error!, Try again'}));  
    },
};
