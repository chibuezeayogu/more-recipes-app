// import module dependencies
import models from '../models';
import pagenate from '../helper/pagenate';

// create reference db model
const Recipe = models.Recipe;

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
    Recipe
      .create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        procedures: req.body.procedures,
        imageUrl: req.body.imageUrl,
        addedBy: req.decoded.user.id,
      })
      .then(recipe => res.status(201).send({
        message: 'Added successfully',
        recipe,
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
    query.limit = req.query.limit || 1;
    query.offset = req.query.offset || 0;

    /**
     * query the db for all recipes
     * left join Reviews as reviews
     * left join Favourites as favourites
     * left join left join Votings as votings
     * ordered by 'id' descending
     */
    Recipe
      .findAndCountAll({
        order: [['id', 'DESC']],
        limit: query.limit,
        offset: query.offset,
      })
      .then((recipe) => {
        if (recipe.rows.length <= 0) {
          return res.status(404).send({ message: 'No recipe(s) was found!' });
        }

        /**
         * pass query limit, query offset, recipedata.count to pagenate helper
         * and return totalCount, currentPage, pageCount, and pageSize
         * to pagenation
         */
        const pagenation = pagenate(query.limit, query.offset, recipe.count);

        return res.status(200).send(
          {
            pagenation,
            recipes: recipe.rows,
          }
        );
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
          id: req.params.id,
        },
      })
      .then((recipe) => {
        if (recipe) {
          recipe.increment('views');
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
    // query db to check if recipe exist
    Recipe
      .findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe not found' });
        }
        Recipe
          .find({
            where: {
              addedBy: req.decoded.user.id,
              id: req.params.id,
            },
          })
          .then((recipe) => {
            if (!recipe) {
              return res.status(401).send({
                message: 'Operation not allowed. You can only update your recipe'
              });
            }
            recipe
              .update({
                title: req.body.title || recipe.title,
                description: req.body.description || recipe.description,
                ingredients: req.body.ingredients || recipe.ingredients,
                procedures: req.body.procedures || recipe.procedures,
                imageUrl: req.body.imageUrl || recipe.imageUrl,
              })
              .then(recipe => res.status(200).send({
                message: 'Updated Successfully',
                recipe,
              }));
          });
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
      .then((recipedata) => {
        if (!recipedata) {
          return res.status(404).send({ message: 'Recipe not found' });
        }

        // query the db for a recipe
        Recipe
          .find({
            where: {
              addedBy: req.decoded.user.id,
              id: req.params.id,
            },
          })
          .then((recipe) => {
            if (!recipe) {
              return res.status(401).send({
                message: 'Operation not allowed. You can only delete your recipe'
              });
            }
            recipe
              .destroy()
              .then(response => res.status(200).send({ message: 'Delete Successfully' }))
              .catch(error => res.status(400).send({ message: error.message }));
          });
      })
      .catch(error => res.status(500).send({ message: error.message }));
  },
  /**
     * @description controller to get recipe with most upvote
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  getMostUpVote(req, res) {
    return Recipe
      .findAll({
        order: [['upvotes', 'DESC']],
        where: {
          upvotes: {
            $gte: 1,
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

  searchByTitleORIngredient(req, res) {
    let query = {};

    if (req.query.title) {
      query = {
        where: {
          title: {
            $iLike: `%${req.query.title.trim()}%`,
          },
        },
      };
    } else {
      query = {
        where: {
          ingredients: {
            $iLike: `%${req.query.ingredients.trim()}%`,
          },
        },
      };
    }

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
        query, {
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
        const pagenation = pagenate(query.limit, query.offset, recipe.count);

        return res.status(200).send(
          {
            pagenation,
            recipes: recipe.rows,
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
          addedBy: req.decoded.user.id,
        },
        order: [['id', 'DESC']],
        limit: query.limit,
        offset: query.offset,
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
         * to pagenation
         */
        const pagenation = pagenate(query.limit, query.offset, recipes.count);
        return res.status(200).send({
          pagenation,
          recipes: recipes.rows,
        });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },
};