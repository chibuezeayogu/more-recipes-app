const expressJWT = require('express-jwt');
import JWT from 'jsonwebtoken';
import bcryptNodejs from 'bcrypt-nodejs';

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
      req.checkBody('birthday', 'birthday is required').notEmpty();
      req.checkBody('address', 'address is required').notEmpty();
      req.checkBody('nationality', 'nationality is required').notEmpty();
      req.checkBody('phone', 'phone is required').notEmpty();
      req.checkBody('gender', 'gender is required').notEmpty();
      
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
                address: req.body.address,
                birthday: req.body.birthday,
                nationality: req.body.nationality,
                phone: req.body.phone,
                gender: req.body.gender
              })
              .then((userdata) =>  res.status(201).send({message:'Registered successfully'}))
              .catch((error) => res.status(400).send(messsage:"Error! Try again"));
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
    return Userdata
      .findOne({where: {email: req.body.email}})
      .then((userdata) => {
        if(!userdata) {
            return res.status(404).send({message: 'User is not registered!.'}); 
            const password = bcryptNodejs.compareSync(req.body.password, userdata.password) ;        
          } else if (userdata && password ) {

              const token = JWT.sign(userdata, secret, {
                expiresIn: '24h'
              });
              res.status(200).send({message: 'Logged in Successfully'});
              return res.status(200).json({token});
          }else{
            return res.status(401).send({ message: 'Password mismatch.' });
          } 
        })
        .catch((error) => res.status(500).send({message:'Error. Please try again'}));
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
            .update({
              firstname: req.body.firstname || userdata.firstname,
              lastname: req.body.lastname || userdata.lastname,
              password: req.body.password || userdata.password,
              nationality: req.body.nationality || userdata.nationality,
              address: req.body.address || userdata.address,
              birthday: req.body.address || userdata.birthday,
              phone: req.body.phone || userdata.phone,
              gender: req.body.gender || userdata.gender,

            })
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
