require('dotenv').config();

// import modules
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import models from '../models';

// create reference to db model
const { User } = models;

// create variable to hold environmental variable SECRET
const secret = process.env.SECRET;

export default {

  /**
     * @description creates a new user controller
     *
     * @method
     *
     * @param {Object} req - Request object
     *
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     *
     */
  signup(req, res) {
    const { firstName, lastName, email, password, imageUrl } = req.body;
    User
      .find({ where: { email } })
      .then((foundUser) => {
        if (foundUser) {
          return res.status(409).send({
            message: 'User already exists.'
          });
        }
        User
          .create({
            firstName,
            lastName,
            email,
            password,
            imageUrl
          })
          .then((createdUser) => {
            const user = { id: createdUser.id, email: createdUser.email };
            const userData = { user };
            const token = jwt.sign(userData, secret, { expiresIn: '24h' });
            return res.status(201).send({
              message: 'Registered successfully',
              token
            });
          });
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },

  /**
     * @description sign in user controller
     *
     * @method
     *
     * @param {Object} req - Request object
     * 
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     *
     */
  signin(req, res) {
    const { email, password } = req.body;
    User
      .find({ where: { email } })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404).send({ message: 'User is not registered!.' });
        }

        if (bcrypt.compareSync(password, foundUser.password)) {
          const user = {id: foundUser.id, email: foundUser.email };
          const userData = { user };
          const token = jwt.sign(userData, secret, { expiresIn: '24h' });
          return res.status(200).send({
            message: 'Logged in Successfully',
            token
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
     *
     * @method
     *
     * @param {Object} req - Request object
     *
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     *
     */
  retrieve(req, res) {
    // query the db to check if user already exits or not
    User
      .findOne({
        where: {
          id: req.decoded.user.id
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
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
     *
     * @param {Object} req - Request object
     *
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     *
     */
  update(req, res) {
    if (req.body.email) {
      return res.status(403).send({
        message: 'email cannot be changed'
      });
    }

    const {
      firstName, lastName, password, imageUrl, location, address, phone
    } = req.body;

    User
      .findById(req.decoded.user.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        return user
          .update({
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            imageUrl: imageUrl || user.imageUrl,
            location: location || user.location,
            address: address || user.address,
            phone: phone || user.phone
          })
          .then(user => res.status(200).send({
            message: 'Updated successfully',
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              imageUrl: user.imageUrl,
              location: user.location,
              address: user.address,
              phone: user.phone
            },
          }))
          .catch(error => res.status(400).send({ message: error.message }));
      })
      .catch(error => res.status(400).send({ message: error.message }));
  },
};
