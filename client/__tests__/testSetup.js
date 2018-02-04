import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';
// import toJson from 'enzyme-to-json';

global.process.env.CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/chibuezeayogu/upload';
global.process.env.CLOUDINARY_UPLOAD_PRESET = 'obuxro65';


global.shallow = shallow;
global.Materialize = { toast: () => {} };
// global.decode = decode;

global.localStorage = {
  clear: jest.fn(),
  set: jest.fn(data => data),
  get: jest.fn(),
  removeItem: jest.fn(item => item)
};

global.document.getElementById = () => ({ innerHTML: '' });

global.$ = () => ({
  sideNav: jest.fn(),
  collapsible: jest.fn(),
  dropdown: jest.fn(),
});

// configure({ adapter: new Adapter() });
