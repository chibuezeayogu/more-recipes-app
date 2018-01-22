require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];
//   console.log(token);
//   if (token) {
//     console.log('else00000000', token, jwt.verify(token, secret), 'if');
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         res.json({ success: false, message: 'Could not authenticate token.' });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     console.log('else00000000', token, jwt.verify(token, secret), 'else00000000');
//     return res.status(401).send({
//       status: 'Failed',
//       message: 'No token provided.'
//     });
//   }
// };
console.log(token, 'token provided');
  if (!token) {
    console.log('got here if');
    return res.status(401).send({
      status: 'Failed',
      message: 'No token provided.'
    });
  } else {
    console.log('got here else');
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Could not authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

export default verifyToken;
