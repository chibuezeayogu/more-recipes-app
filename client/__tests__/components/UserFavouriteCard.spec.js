import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { UserFavouriteCard } from '../../Components/UserFavouriteCard';
import mockData from '../__mock__/actionMockData';

const props = {
  favourite: mockData.recipe,
};

describe('<UserFavouriteCard />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserFavouriteCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('handelFavourites function', () => {
  it('should call remove recipe from user favourite', () => {
    const wrapper = shallow(<UserFavouriteCard {...props} />);
    const handelFavouritesSpy = jest
      .spyOn(wrapper.instance(), 'handelFavourites');
    wrapper.instance().handelFavourites();
    expect(handelFavouritesSpy).toHaveBeenCalled();
  });
});
