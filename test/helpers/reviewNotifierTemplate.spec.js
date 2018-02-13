import chai from 'chai';
import reviewNotifierTemplate from '../../server/helper/emailNotificationTemplates/reviewNotifierTemplate';
import {
  recipe,
  reciever,
  review,
  reviewer,
  appLink,
  formatedTemplate
} from '../MockData/mockData';

const expect = chai.expect;

describe('Format Review Template', () => {
  it('should add information to review template', () => {
    expect(reviewNotifierTemplate(recipe, reciever, review, reviewer, appLink))
      .to.eql(formatedTemplate);
  });
});
