//import module dependencies
import models from '../models';
import pagenate from '../helper/pagenate';

//create reference db model 
const Recipedata = models.Recipedata;
const Reviews = models.Review;
const Favourites = models.Favourite;
const Votings = models.Voting;

/**
 * exclude: holds attributes not to be returned
 * query: hold query limit and offset for list recipe
 */
const exclude = {
            exclude :['createdAt', 'updatedAt']
          },
      query = {};


module.exports = {
  /**
     * @description add recipe function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  addRecipe(req, res) { 
    /**
     * validate input field 
     * make sure it doesn't contain leading empty space
     */
      req.checkBody('title', 'title is required').notEmpty();
      req.checkBody('title', 'title must at least contain a word').matches(/\w[\w ,]*\w$/);
      req.checkBody('description', 'description is required').notEmpty();
      req.checkBody('description', 'description must at least contain a word').matches(/\w[\w ,.]*\w$/);
      req.checkBody('ingredients', 'ingredients is required').notEmpty();
      req.checkBody('ingredients', 'ingredients must at least contain a word').matches(/\w[\w ,.]*\w$/);
      req.checkBody('procedures', 'procedures is required').notEmpty();
      req.checkBody('procedures', 'procedures must at least contain a word').matches(/\w[\w ,.]*\w$/);
    
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
        imageUrl: req.body.imageUrl,
        userId: req.decoded.userdata.id,
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
      .catch((error) => res.status(400).send({message: 'Error. Please try again'}));
  },

  /**
     * @description list recipe function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  listRecipe(req, res) {
    /**
     * query limit: get query limit if supplie else use default
     * query offset: get query offset if supplie else use default
     */
    query.limit = req.query.limit || 8;
    query.offset = req.query.offset || 0;
    
    /**
     * query the db for all recipes
     * left join Reviews as reviews
     * left join Favourites as favourites
     * left join left join Votings as votings
     * ordered by 'id' descending
     */
    return Recipedata
      .findAndCountAll({ 
        include:[
          {
            model: Reviews,
            as: 'reviews',
            attributes: exclude
          },
          { 
            model: Favourites,
            as : 'favourites',
            attributes: exclude
          },
          { 
            model: Votings,
            as : 'votings',
            attributes: exclude
          }
        ],
        attributes: exclude,
        order:  [['id', 'DESC']],
        limit: query.limit,
        offset: query.offset
      })
      .then((recipedata) => {
        if (recipedata.rows.length <= 0) {

          //return if no recipe was found
          return res.status(404).send({message:'No recipe was found!'});
        } 

        /**
         * pass query limit, query offset, recipedata.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagenation
         */ 
        const pagenation = pagenate(query.limit, query.offset, recipedata.count);
        
        return res.status(200).send(
          {
            pagenation, 
            recipe: recipedata.rows
          }
        );
      })
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },

   /**
     * @description retrieve recipe function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  retrieveRecipe(req, res) {

      //check if param is of type integer
      req.checkParams('id', 'Please input a valid id.').isInt();

      //catch any error that might occure
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }
    
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
                imageUrl: recipedata.imageUrl,
                upvotes: recipedata.upvotes,
                downvotes: recipedata.downvotes,
                views: recipedata.views,
              } });
        }
        return res.status(404).send({message: 'Recipe not found'});
      })
      .catch((error) => res.status(400).send({message: 'Error. Please try again'}));
  },

  /**
     * @description update recipe function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  updateRecipe(req, res) {

    //check if param is of type integer
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
          return res.status(404).send({message:'Recipe not found'});
        } else{
          
          //query the db for a recipe
          Recipedata
            .find({
              where:{
                userId: req.decoded.userdata.id,
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
                    imageUrl: req.body.procedures || recipedata.imageUrl,
                })
                .then((recipedata) => res.status(200).send({
                    message: 'Updated Successfully',
                    recipeInfo: {
                        id: recipedata.id,
                        title: recipedata.title,
                        description: recipedata.description,
                        ingredients: recipedata.ingredients,
                        procedures: recipedata.procedures,
                        image: recipedata.imageUrl,
                        upvotes: recipedata.upvotes,
                        downvotes: recipedata.downvotes,
                        views: recipedata.views,
                    } 
                }))
                
            })
          }
      })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  /**
     * @description delete recipe function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  deleteRecipe(req, res) {

    //check if params is of type integer
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
            return res.status(404).send({message:'Recipe not found'});
          } else{

            //query the db for a recipe
            Recipedata
            .find({
              where:{
                userId: req.decoded.userdata.id,
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
  /**
     * @description get recipe with most upvote function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  getMostUpVote(req, res) {
    return Recipedata
      .findAll({
        order: [['upvotes', 'DESC']],
        where: {
          upvotes: {
            $gte : 1
          }
        },
        attributes: exclude,
        limit: 10
      })
      .then((recipedata) => res.status(200).send(recipedata))
      .catch(error => res.status(400).send({message: 'Error. Please try again'}));
  },

   /**
     * @description search by ingredients function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  searchByIngredients(req, res){
    const searchTerm = req.query.q.trim();

    /**
     * query limit: get query limit if supplie else use default
     * query offset: get query offset if supplie else use default
     */
    query.limit = req.query.limit || 8;
    query.offset = req.query.offset || 0;
    
    /**
     * query the db for all recipes
     * left join Reviews as reviews
     * left join Favourites as favourites
     * left join left join Votings as votings
     * ordered by 'id' descending
     */
    return Recipedata
      .findAndCountAll({ 
        include:[
          {
            model: Reviews,
            as: 'reviews',
            attributes: exclude
          },
          { 
            model: Favourites,
            as : 'favourites',
            attributes: exclude
          },
          { 
            model: Votings,
            as : 'votings',
            attributes: exclude
          }
        ],
        where: {
           ingredients: {
              $iLike: `%${searchTerm}%`,
            },
        },
        attributes: exclude,
        order:  [['id', 'DESC']],
        limit: query.limit,
        offset: query.offset
      })
      .then((recipedata) => {
        if (recipedata.rows.length <= 0) {

          //return if no recipe was found
          return res.status(404).send({message:'Search term does not match any document'});
        } 

        /**
         * pass query limit, query offset, recipedata.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagenation
         */ 
        const pagenation = pagenate(query.limit, query.offset, recipedata.count);
        
        return res.status(200).send(
          {
            pagenation, 
            recipes: recipedata.rows
          }
        );
      })
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },

  /**
     * @description increment views function
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  incrementViews(req, res){
      return Recipedata
          .findById(req.params.id)
          .then((recipedata) => {
              recipedata.increment('views');
                return res.status(201).send();
          })
          .catch((error) => res.status(400).send({message:'Error. Please try again'}));        
  }
};
