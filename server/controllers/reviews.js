
import models from '../models';
const Review = models.Review;
const Recipedata = models.Recipedata;

module.exports = {
    postReview(req, res) {
        req.checkParams('id', 'Please input a valid id.').isInt();
        req.checkBody('comment', 'commnet is required').notEmpty();
        req.checkBody('comment', 'commnet is required').matches(/^[a-zA-Z]{10,}$/);
        
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
                if (!recipedata){
                    res.status(404).send({message:'Connot post recipe id not found'});
                }
                else{
                    Review
                        .create({
                            view: false,
                            comment: req.body.comment,
                            recipeId: req.params.id, 
                            userId: req.decoded.userId,                
                        })
                        .then((reviews) => res.status(201).send({message:'Comment Posted'}))
                        .catch((error) => res.status(404).send({message:'Error!. Try again'}));
                } 
            })
            
    },
};