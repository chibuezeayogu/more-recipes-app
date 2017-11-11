//import modules
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import models from '../models';
require('dotenv').config();


//create reference to db model 
const Userdata =  models.Userdata;

//create variable to hold evironmental variable SECRET
const secret = process.env.SECRET;


module.exports = {

  /**
     * sign up user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  signup(req, res) {

      //validate input
      req.checkBody('firstname', 'firstname is required').notEmpty();
      req.checkBody('firstname', 'firstname must be at least 3 characters long without space').matches(/^[a-zA-Z]{3,}$/);
      req.checkBody('lastname', 'lastname is required').notEmpty();
      req.checkBody('lastname', 'lastname must be at least 3 characters long without space').matches(/^[a-zA-Z]{3,}$/);
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'email is not valid').isEmail();
      req.checkBody('password', 'password is required').notEmpty();
      req.checkBody('password', 'Password must be at least 8 characters and at most 32 characters long without space').matches(/[a-zA-Z0-9.]{8,32}$/);
      
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
                      imageUrl: req.body.imageUrl,
                  })
              .then((userdata) =>  res.status(201).send({
                      message:'Registered successfully',
                      userInfo: {  
                          id: userdata.id,
                          firstname: userdata.firstname,
                          lastname: userdata.lastname,
                          email: userdata.email 
                      } 
                  })
              ) 
              .catch((error) => res.status(400).send(error));
            })
  },
  
  /**
     * sign in user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */ 
  signin(req, res) {
    
    //validate input
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password', 'password must be at least 8 characters and at most 32 characters long').matches(/[a-zA-Z0-9.]{8,32}$/);
    
    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }

    //query the db to check if user already exits or not
    Userdata
      .find({ where: { email: req.body.email } })
        .then((userdata) => {
          if(!userdata) {
              return res.status(404).send({ message: 'User is not registered!.' }); 
           }
          
           //compare the recieved password with the original password in the db
          if(bcrypt.compareSync(req.body.password, userdata.password)) {
              const userData = { userdata };
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
       .catch((error) => res.status(400).send(error));
    },  
  
  /**
     * retrive user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  retrieve(req, res) {
      return Userdata
           //query the db to check if user already exits or not
          .findOne({
            where:{
              id: req.decoded.userdata.id,
            }
          })
          .then((userdata) => {
            if (!userdata) {
              return res.status(404).send({message: 'User not found'});
            }
            return res.status(200).send({userInfo:{  id: userdata.id,
                                          firstname: userdata.firstname,
                                          lastname: userdata.lastname,
                                          email: userdata.email } });
          })
          .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  /**
     * update user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {object} json - payload
     */
  update(req, res) {
    if(req.body.email){
      return res.status(403).send({message: 'email cannot be changed'});
    }

    //validate input
    req.checkBody('firstname', 'firstname is required').notEmpty();
    req.checkBody('firstname', 'firstname must be at least 3 characters long without space').matches(/[a-zA-Z]{3,}$/);
    req.checkBody('lastname', 'lastname is required').notEmpty();
    req.checkBody('lastname', 'lastname must be at least 3 characters long without space').matches(/[a-zA-Z]{3,}$/);
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password', 'Password must be at least 8 characters and at most 32 characters long without space').matches(/[a-zA-Z0-9.]{8,32}$/);

    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }

    //query the db to check if user already exits or not
    return Userdata
      .findById(req.decoded.userdata.id)
      .then((userdata) => {
        if (!userdata) {
          return res.status(404).send({message: 'User not found'});
        }
        return userdata
            .update(req.body)
            .then((userdata) => res.status(200).send({ 
                message:'Updated successfully',
                userInfo:{ 
                  id: userdata.id,
                  firstname: userdata.firstname,
                  lastname: userdata.lastname,
                  email: userdata.email
                } 
              }))
            .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  }
};
