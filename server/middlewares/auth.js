require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Could not authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      status: 'Failed',
      message: 'No token provided.'
    });
  }
};

export default verifyToken;
