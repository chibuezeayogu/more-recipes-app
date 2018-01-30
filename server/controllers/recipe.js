// import module dependencies
import models from '../models';
import paginate from '../helper/paginate';

// create reference db model
const { Recipe, Voting, Favourite } = models;

const Votings = Voting;
const Favourites = Favourite;
/**
 * query: hold query limit and offset
 */
const query = {};

export default {
/**
   * @description add recipe controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  addRecipe(req, res) {
    const { title, description, ingredients, procedures, imageUrl } = req.body;
    Recipe
      .create({
        title,
        description,
        ingredients,
        procedures,
        imageUrl,
        addedBy: req.decoded.user.id
      })
      .then(recipe => res.status(201).send({
        message: 'Added successfully',
        recipe
      }))
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
     * @description get all recipe controller
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  getAllRecipe(req, res) {
    /**
     * query limit: get query limit if supplie else use default
     * query offset: get query offset if supplie else use default
     */
    query.limit = req.query.limit || 6;
    query.offset = req.query.offset || 0;

    /**
     * query the db for all recipes
     * ordered by 'id' descending
     */
    Recipe
      .findAndCountAll({
        order: [['id', 'DESC']],
        limit: query.limit,
        offset: query.offset,
      })
      .then((recipe) => {
        if (recipe.rows.length === 0) {
          return res.status(404).send({ message: 'No recipe was found!' });
        }

        /**
         * pass query limit, query offset, recipedata.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagination
         */
        const pagination = paginate(query.limit, query.offset, recipe.count);
        
        return res.status(200).send(
          {
            pagination,
            recipes: recipe.rows,
        });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
    * @description retrieve recipe controller
    * @param {Object} req - Request object
    * @param {Object} res - Response object
    * @returns {Object} json - payload
    */
  retrieveRecipe(req, res) {
    Recipe
      .findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Votings,
            as: 'votings',
            attributes: ['voting', 'userId']
          },
          {
            model: Favourites,
            as: 'favourites',
            attributes: ['recipeId', 'userId']
          }
        ]
      })
      .then((recipe) => {
        if (recipe ) {
          if(req.decoded.user.id !== recipe.addedBy) {
            recipe.update({ views: recipe.views + 1 },
              { fields: ['views'] });
          }
          return res.status(200).send(recipe);
        }
        return res.status(404).send({ message: 'Recipe not found' });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
     * @description update recipe controller
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  updateRecipe(req, res) {
    const { title, description, ingredients, procedures, imageUrl } = req.body;
    // query db to check if recipe exist
    Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe not found' });
        }

        if (req.decoded.user.id !== recipe.addedBy) {
          return res.status(401).send({
            message: 'Operation not allowed. You can only update your recipe'
          });
        }
        recipe
          .update({
            title: title || recipe.title,
            description: description || recipe.description,
            ingredients: ingredients || recipe.ingredients,
            procedures: procedures || recipe.procedures,
            imageUrl: imageUrl || recipe.imageUrl
          })
          .then(recipe => res.status(200).send({
            message: 'Updated Successfully',
            recipe
          }));
      })
  .catch(error => res.status(500).send({ message: error.message }));
  },
  /**
     * @description delete recipe controller
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  deleteRecipe(req, res) {
    // query db to check if recipe exist
    Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe not found' });
        }

        if (req.decoded.user.id !== recipe.addedBy) {
          return res.status(401).send({
            message: 'Operation not allowed. You can only delete your recipe'
          });
        }
        recipe
          .destroy()
          .then(response => res.status(200).send({ message: 'Delete Successfully' }))
          .catch(error => res.status(400).send({ message: error.message }));
      })
      .catch(error => res.status(500).send({ message: error.message }));
  },
  /**
     * @description controller to get recipe with most upvote
     *
     * @param {Object} req - Request object
     *
     * @param {Object} res - Response object
     * 
     * @returns {Object} json - payload
     */
  getMostUpVote(req, res) {

     /**
     * query limit: get query limit if supplie else use default
     * query offset: get query offset if supplie else use default
     */
    query.limit = req.query.limit || 6;
    query.offset = req.query.offset || 0;


    return Recipe
      .findAll({
        order: [['upvotes', 'DESC']],
        where: {
          upvotes: {
            $gte: 1
          },
        },
        limit: 10,
      })
      .then(recipe => res.status(200).send({ recipe }))
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
    * @description search by title or ingredients controller
    * @param {Object} req - Request object
    * @param {Object} res - Response object
    * @returns {Object} json - payload
    */

  search(req, res) {

    const search = req.query.q.split(' ');

    const recipeIngredints = search.map(value => ({ ingredients: { $iLike: `%${value}%` } }));
    const recipeTitle = search.map(value => ({ title: { $iLike: `%${value}%` } }));

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
    Recipe
      .findAndCountAll(
        {
          where: {
            $or:
            recipeIngredints.concat(recipeTitle),
          }, 
          order: [['id', 'DESC']],
          limit: query.limit,
          offset: query.offset,
        })
      .then((recipe) => {
        if (recipe.rows.length <= 0) {
          return res.status(404).send({ message: 'Search term did not match any recipe' });
        }

        /**
         * pass query limit, query offset, recipe.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagenation
         */
        const pagination = paginate(query.limit, query.offset, recipe.count);

        return res.status(200).send(
          {
            pagination,
            recipes: recipe.rows
          }
        );
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
   * @description get user recipes controller
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} json - payload
   */
  userRecipes(req, res) {
    /**
     * query limit: get query limit if supplie else use default
     * query offset: get query offset if supplie else use default
     */
    query.limit = req.query.limit || 8;
    query.offset = req.query.offset || 0;

    Recipe
      .findAndCountAll({
        where: {
          addedBy: req.decoded.user.id
        },
        order: [['id', 'DESC']],
        limit: query.limit,
        offset: query.offset
      })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(404).send({
            message: 'You have not added any recipe'
          });
        }
        /**
         * pass query limit, query offset, recipe.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagination
         */
        const pagination = paginate(query.limit, query.offset, recipes.count);
        return res.status(200).send({
          pagination,
          recipes: recipes.rows
        });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },
};
