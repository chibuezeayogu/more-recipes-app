import chai from 'chai';
import reviewNotifier from '../../server/helper/reviewNotifier';
import models from '../../server/models';
import {
  recipe,
  review,
  reviewer,
  appLink,
  formatedTemplate
} from '../mockData';

const { User, Recipe } = models;
const expect = chai.expect;

describe('Notifier' , () => {
  it('should get recipe, user and pass as argument to nodemailer', () => {
    expect(reviewNotifier(Recipe, User, recipe.id, review, reviewer, appLink))
      .to.eql();
  });
});