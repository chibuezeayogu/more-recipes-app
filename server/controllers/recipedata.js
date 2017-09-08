import models from '../models';

const Recipedata = models.Recipedata;

module.exports = {
 addRecipe(req, res) { 
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();
    req.checkBody('ingredients', 'ingredients required').notEmpty();
    req.checkBody('procedures', 'procedures is required').notEmpty();
    req.checkBody('addedBy', 'addedBy is required').notEmpty();
    
    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }
    return Recipedata
      .create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        procedures: req.body.procedures,
        addedBy: req.body.addedBy,
      })
      .then((recipedata) => res.status(201).send({message: 'Added successfully'}))
      .catch((error) => res.status(400).send(error));;
  },
  listRecipe(req, res) {
    return Recipedata
      .findAll()
      .then((recipedata) => {
        if (recipedata.length <= 0) {
          return res.status(400).send({message:'No Recipe found! Add Recipe'});
        } 
        return res.status(200).send(recipedata)
      })
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },
  retrieveRecipe(req, res) {
    return Recipedata
      .findOne({
        where:{
          addedBy: req.decoded.userdata.id,
          recipeId: req.params.Id,
        }
      })
      .then((recipedata) => {
        if (recipedata.length <= 0) {
          return res.status(400).send({message: 'Recipe Not Found'});
        }
        return res.status(200).send(recipedata);
      })
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },
  updateRecipe(req, res) {
    return Recipedata
      .findOne({
        where:{
          addedBy: req.decoded.userdata.id,
          recipeId: req.params.Id,
        }
      })
      .then((recipedata) => {
          if (recipedata.length <= 0) {
            return res.status(404).send({message: 'recipe not found'});
          }
          return recipedata
            .update({
              title: req.body.title || recipedata.title,
              description: req.body.description || recipedata.description,
              ingredients: req.body.ingredients || recipedata.ingredients,
              procedures: req.body.procedures || recipedata.procedures,
          })
          .then((recipedata) => res.status(200).send(recipedata))
          .catch((error) => res.status(400).send(error));
     })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  
  deleteRecipe(req, res) {
    return Recipedata
      .findOne({
        where:{
          addedBy: req.params.id,
          recipeId: req.params.id,
        }
      })
      .then((recipedata) => {
        if (recipedata.length <= 0) {
          return res.status(404).send({message: 'Recipe Not Found'});
        }
        return recipedata
          .destroy()
          .then((recipedata) => res.status(200).send({message:'Delete Successfully'}))
          .catch((error) => res.status(400).send({message:'Error. Please try again'}));
      })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
};
