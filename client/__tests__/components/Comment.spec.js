import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Comments from '../../Components/Comments';

const props = {
  review: {
    comment: '',
    createdAt: '',
    User: {
      firstName: '',
      imageUrl: ''
    }
  },
};

describe('<Comments />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Comments {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
