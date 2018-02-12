import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { UserRecipeCard } from '../../Components/UserRecipeCard';
import mockData from '../__mock__/actionMockData';

const props = {
  recipe: mockData.recipe,
  history: {
    push: jest.fn()
  }
};

describe('<UserRecipeCard />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserRecipeCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('handelEditRecipe function', () => {
  it('should navigate to the edit recipe page', () => {
    const wrapper = shallow(<UserRecipeCard {...props} />);
    const handelEditRecipeSpy = jest
      .spyOn(wrapper.instance(), 'handelEditRecipe');
    wrapper.instance().handelEditRecipe();
    expect(handelEditRecipeSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});

describe('handelDeleteRecipe function', () => {
  it('should delete a recipe when clicked', () => {
    const wrapper = shallow(<UserRecipeCard {...props} />);
    const handelDeleteRecipeSpy = jest
      .spyOn(wrapper.instance(), 'handelDeleteRecipe');
    wrapper.instance().handelDeleteRecipe();
    expect(handelDeleteRecipeSpy).toHaveBeenCalled();
  });
});
