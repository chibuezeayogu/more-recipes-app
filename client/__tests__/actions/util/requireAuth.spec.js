import React from 'react';
import expect from 'expect';
import requireAuth from '../../../util/requireAuth';
import RecipesList from '../../../Components/RecipesList';

describe('requireAuth', () => {
  it('should render without crashing', () => {
    const wrapper = requireAuth(<RecipesList />);
    expect(wrapper).toMatchSnapshot();
  });
});
