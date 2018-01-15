// import modules
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import models from '../models';

require('dotenv').config();

// create reference to db model
const User = models.User;

// create variable to hold environmental variable SECRET
const secret = process.env.SECRET;

export default {

  /**
     * @description creates a new user controller
     * @method
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  signup(req, res) {
    User
      .find({ where: { email: req.body.email } })
      .then((response) => {
        if (response) {
          return res.status(409).send({
            message: 'User already exists.',
          });
        }
        User
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            imageUrl: req.body.imageUrl,
          })
          .then((user) => {
            const userData = { user };
            const token = jwt.sign(userData, secret);
            return res.status(201).send({
              message: 'Registered successfully',
              token,
            });
          });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
     * @description sign in user controller
     * @method
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  signin(req, res) {
    User
      .find({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User is not registered!.' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const userData = { user };
          const token = jwt.sign(userData, secret);
          return res.status(200).send({
            message: 'Logged in Successfully',
            token,
          });
        }
        return res.status(409).send({
          message: 'Invalide username or password',
        });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
     * @description retrive user controller
     * @method
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  retrieve(req, res) {
    // query the db to check if user already exits or not
    User
      .findOne({
        where: {
          id: req.decoded.user.id
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({ user });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
     * @description update user controller
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} json - payload
     */
  update(req, res) {
    if (req.body.email) {
      return res.status(403).send({
        message: 'email cannot be changed'
      });
    }

    User
      .findById(req.decoded.user.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            password: req.body.password || user.password,
            imageUrl: req.body.imageUrl || user.imageUrl,
            location: req.body.location || user.location,
            address: req.body.address || user.address,
            phone: req.body.phone || user.phone,
          })
          .then(user => res.status(200).send({
            message: 'Updated successfully',
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              imageUrl: user.imageUrl,
              location: user.location,
              address: user.address,
              phone: user.phone,
            },
          }))
          .catch(error => res.status(400).send({ message: error.message }));
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },
};
