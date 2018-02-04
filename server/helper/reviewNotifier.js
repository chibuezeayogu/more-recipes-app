import dotenv from 'dotenv';
import mailer from './mailer';
import reviewNotifierTemplate from './emailNotificationTemplates/reviewNotifierTemplate';

dotenv.config();
const appLink = process.env.APP_LINK;

/**
 * @description function for sending notification email when a user's 
 * recipe gets a review
 *
 * @function
 *
 * @param {object} modelR - Recipes model
 *
 * @param {object} modelU - Users model
 *
 * @param {number} recipeId - ID of the recipe been reviewed
 *
 * @param {string} reviewBody - Content of the review
 *
 * @param {string} reviewer - The username of the person who made the review
 *
 */

const reviewNotifier = (modelR, modelU, recipeId, review, reviewer, appLink) => {
  modelR.findOne({ where: { id: recipeId } })
    .then((recipe) => {
      modelU.findOne({ where: { id: recipe.addedBy } })
        .then((user) => {
          const mailOptions = {
            from: `"More-Recipes" <${process.env.AUTHORIZED_EMAIL}>`,
            to: user.email,
            subject: `${recipe.title} has a new Review`,
            html: reviewNotifierTemplate(recipe, user, review, reviewer, appLink)
          };
          mailer(mailOptions);
        });
    });
};

export default reviewNotifier;
