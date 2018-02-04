require('dotenv').config();

import jwt, { decode } from 'jsonwebtoken';
import { setCurrentUser, signOut } from '../action/actionCreators';

const secret = process.env.SECRET;

const verifyToken = (store) => {
  let token = window.localStorage.getItem('jwtToken');
  if (token) {
    jwt.verify(token, secret, (err) => {
    if (err) {
      window.localStorage.removeItem('jwtToken');
      store.dispatch(signOut());
    } else {
      const { user } = jwt.decode(token);
      store.dispatch(setCurrentUser(user));
    }
    });
  } else {
    store.dispatch(signOut());
  }
};

export default verifyToken;
