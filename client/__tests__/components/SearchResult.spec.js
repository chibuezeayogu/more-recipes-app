import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SearchResult from '../../Components/SearchResult';
import mockData from '../__mock__/actionMockData';

const props = {
  searchReducer: {
    recipes: mockData.data.recipes,
  }
};

describe('<SearchResult />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SearchResult {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
