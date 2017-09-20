// Import module dependencies
import models from '../models';

//reference db model recipedata
const Recipedata = models.Recipedata;

module.exports = {
  //add recipe
 addRecipe(req, res) { 
   //validate input field 
   //make sure it doesn't contain leading empty space
    req.checkBody('title', 'title is required').notEmpty();
    //req.checkBody('title', 'title must at least contain a word').matches(/^\w[\w ,]*\w$/);
    req.checkBody('description', 'description is required').notEmpty();
    //req.checkBody('description', 'description must at least contain a word').matches(/^\w[\w ,.]*\w$/);
    req.checkBody('ingredients', 'ingredients is required').notEmpty();
    //req.checkBody('ingredients', 'ingredients must at least contain a word').matches(/^\w[\w ,.]*\w$/);
    req.checkBody('procedures', 'procedures is required').notEmpty();
    //req.checkBody('procedures', 'procedures must at least contain a word').matches(/^\w[\w ,.]*\w$/);
    
    //output error if it occurs
    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }
    //insert recipe data into the database
    return Recipedata
      .create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        procedures: req.body.procedures,
        addedBy: req.decoded.userId,
      })
      .then((recipedata) => res.status(201).send({
        message: 'Added successfully', 
              recipeInfo :{
                id: recipedata.id,
                title: recipedata.title,
                description: recipedata.description,
                ingredients: recipedata.ingredients,
                procedures: recipedata.procedures,
              } }))
      .catch((error) => res.status(400).send(error));;
  },
  //get all recipes in the database
  listRecipe(req, res) {

    //query the db for all recipes
    return Recipedata
      .findAll()
      .then((recipedata) => {
        if (recipedata.length <= 0) {
          //stop if no recipe was found
          return res.status(404).send({message:'No recipe was found!'});
        } 
        //return found recipes
        return res.status(200).send(recipedata)
      })
      //if error occurs stop
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },
  //get a paticular recipe
  retrieveRecipe(req, res) {
    //check if param is of type int
    req.checkParams('id', 'Please input a valid id.').isInt();

      //output error if it occurs
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }
    //query the db for one recipe
    return Recipedata
      .findOne({
        where:{
          id: req.params.id,
        }
      })
      .then((recipedata) => {
        if (recipedata) {
          return res.status(200).send({
            recipeInfo :{
                id: recipedata.id,
                title: recipedata.title,
                description: recipedata.description,
                ingredients: recipedata.ingredients,
                procedures: recipedata.procedures,
                upvotes: recipedata.upvotes,
                downvotes: recipedata.downvotes,
                views: recipedata.views,
              } });
        }
        return res.status(404).send({message: 'Recipe not found'});
      })
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },
  updateRecipe(req, res) {

    req.checkParams('id', 'Please input a valid id.').isInt();
    
      //output error if it occurs
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }
    
    //query db to check if recipe exist
    return Recipedata
      .findById(req.params.id)
      .then((recipedata) => {
        if(!recipedata){
          return res.status(404).send({message:"Recipe not found"});
        } else{
          
          //query the db for a recipe
          Recipedata
            .find({
              where:{
                addedBy: req.decoded.userId,
                id: req.params.id,
              }
            })
            .then((recipedata) => {
                if (!recipedata) {
                  return res.status(404).send({message: 'You can only update you recipe'});
                }
                recipedata
                  .update({
                    title: req.body.title || recipedata.title,
                    description: req.body.description || recipedata.description,
                    ingredients: req.body.ingredients || recipedata.ingredients,
                    procedures: req.body.procedures || recipedata.procedures,
                })
                .then((recipedata) => res.status(200).send({
                  message:'Updated Successfully',
                  recipeInfo :{
                      id: recipedata.id,
                      title: recipedata.title,
                      description: recipedata.description,
                      ingredients: recipedata.ingredients,
                      procedures: recipedata.procedures,
                      upvotes: recipedata.upvotes,
                      downvotes: recipedata.downvotes,
                      views: recipedata.views,
                    } }))
                
            })
          }
      })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  //delect a particular recipe
  deleteRecipe(req, res) {
    req.checkParams('id', 'Please input a valid id.').isInt();
    
      //output error if it occurs
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }

      //query db to check if recipe exist
      return Recipedata
        .findById(req.params.id)
        .then((recipedata) => {
          if(!recipedata){
            return res.status(404).send({message:"Recipe not found"});
          } else{

            //query the db for a recipe
            Recipedata
            .find({
              where:{
                addedBy: req.decoded.userId,
                id: req.params.id,
              }
            })
            .then((recipedata) => {
              if (!recipedata) {
                return res.status(404).send({message: 'You can only delete you recipe'});
              }
              recipedata
                .destroy()
                .then((recipedata) => res.status(200).send({message:'Delete Successfully'}))
                .catch((error) => res.status(400).send({message:'Error. Please try again'}));
            })
          }
        })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  //get recipes with the most upvotes
  //in descending order
  getMostUpVote(req, res) {
    return Recipedata
      .findAll({
        order: [['upvotes', 'DESC']],
        limit: 5
      })
      .then((recipedata) => res.status(200).send(recipedata))
      .catch(error => res.status(200).send(error));

  }
};
