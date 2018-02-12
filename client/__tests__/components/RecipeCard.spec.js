import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { RecipeCard } from '../../Components/RecipeCard';
import mockData from '../__mock__/actionMockData';

const props = {
  recipe: mockData.recipe
};

describe('<UserRecipeCard />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RecipeCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
