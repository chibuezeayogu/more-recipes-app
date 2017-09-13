import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';

//const Userdata = require ('../models').Userdata;

import models from '../models';
const Userdata =  models.Userdata;

require('dotenv').config();

const secret = process.env.SECRET;

module.exports = {
  signup(req, res) {
      req.checkBody('firstname', 'firstname is required').notEmpty();
      req.checkBody('lastname', 'lastname is required').notEmpty();
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email is not valid').isEmail();
      req.checkBody('password', 'password is required').notEmpty();
      
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }

      return Userdata
        .find({where:{email: req.body.email}})
          .then((userdata) => {
            if(userdata) {
             return res.status(409).send({
                message: 'User already exists.'
              });
            }
            Userdata
              .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
              })
              .then((userdata) =>  res.status(201).send({message:'Registered successfully'}))
              .catch((error) => res.status(400).send(error));
            })
  },

  signin(req, res) {
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    
    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }
    Userdata
      .find({ where: { email: req.body.email } })
        .then((userdata) => {
          if(!userdata) {
              return res.status(404).send({ message: 'User is not registered!.' }); 
           }
          // bcrypt.compareSync(req.body.password, userdata.password)
          if(bcrypt.compareSync(req.body.password, userdata.password)) {
            const userData = { userId: userdata.id };
            const token = jwt.sign(userData, secret);
            return res.status(200).send({
              message: 'Logged in Successfully',
              token
            });
           } else {
            return res.status(409).send({
              message: 'Password mismatch'
            });
           }
            })
            .catch((error) => res.status(500).send(error));
    },  
  retrieve(req, res) {

      req.checkParams('id', 'Invalid parameter id.').isInt();
      
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }
      return Userdata
          .findOne({
            where:{
              email:req.decoded.userdata.id,
            }
          })
          .then((userdata) => {
            if (!userdata) {
              return res.status(404).send({message: 'User Not Found'});
            }
            return res.status(200).send(userdata);
          })
          .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },

  update(req, res) {
      req.checkParams('id', 'Please input a valid id.').isInt();
      
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }
      return Userdata
        .findById(req.params.id)
        .then((userdata) => {
          if (!userdata) {
            return res.status(400).send({message: 'User Not Found'});
          }
          return userdata
            .update(req.body)
            .then((userdata) => res.status(200).send(userdata))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  destroy(req, res) {
    return Userdata
      .findById(req.params.id)
      .then(userdata => {
        if (!userdata) {
          return res.status(404).send({message: 'User Not Found'});
        }
        return userdata
          .destroy()
          .then((userdata) => res.status(204).send({message:'User deleted Sucessfully'}))
          .catch((error) => res.status(400).send({message:'Error occurred while deleting User'}));
      })
      .catch((error) => res.status(400).send({message:'Error occurred while deleting User'}));
  },
};
