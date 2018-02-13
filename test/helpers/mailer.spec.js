import dotenv from 'dotenv';
import chai from 'chai';
import mailer from '../../server/helper/mailer';
import reviewNotifierTemplate from '../../server/helper/emailNotificationTemplates/reviewNotifierTemplate';
import {
  recipe,
  reciever,
  review,
  reviewer,
  appLink,
  user
} from '../MockData/mockData';

dotenv.config();
const expect = chai.expect;

const mailOptions = {
  from: `"More-Recipes" <${process.env.AUTHORIZED_EMAIL}>`,
  to: user.email,
  subject: `${recipe.title} has a new Review`,
  html: reviewNotifierTemplate(recipe, reciever, review, reviewer, appLink)
};

describe('Mailer', () => {
  it('should send mail to user', () => {
    expect(mailer(mailOptions)).to.eql();
  });
});
