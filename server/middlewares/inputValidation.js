
import ValidatePassword from 'validate-password';

// add rules that will be validated
const options = {
  enforce: {
    lowercase: true,
    uppercase: true,
    specialCharacters: true,
    numbers: true
  },
};

// instantiate ValidatePassword
const validator = new ValidatePassword(options);

/**
 * @description validate User Sign In Fields
 * @method
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 * @returns {object} json - payload
 */
export const validateUserSignInFields = (req, res, next) => {
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({
      message: errorObject,
    });
  }
  next();
};

/**
 * @description validate add recipe fileds middleware
 * @method
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 * @returns {object} json - payload
 */

export const validateAddRecipeFileds = (req, res, next) => {
  req.checkBody('title', 'title is required').notEmpty();
  req.checkBody('title',
    'title must at least contain a word without leading space')
    .matches(/^\w[\w\d ,]*\w$/);
  req.checkBody('description', 'description is required').notEmpty();
  req.checkBody('description',
    'description must at least contain a word without leading space')
    .matches(/^\w[a-zA-Z0-9 !:.?+=&%@!\-/,()]*\w$/);
  req.checkBody('ingredients', 'ingredients is required').notEmpty();
  req.checkBody('ingredients',
    'ingredients must at least contain a word without leading space')
    .matches(/^\w[a-zA-Z0-9 !:;.?+=&%@!\-/,()]*\w$/);
  req.checkBody('procedures', 'procedures is required').notEmpty();
  req.checkBody('procedures',
    'procedures must at least contain a word without leading space')
    .matches(/^\w[a-zA-Z0-9 !:;.?+=&%@!\-/,()]*\w$/);
  req.checkBody('imageUrl', 'image url is required').notEmpty();
  req.checkBody('imageUrl', 'image url is not valid')
    .matches(/https:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/);

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({ message: errorObject });
  }
  next();
};

/**
 * @description validate user sign up fields middleware
 * @method
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 * @returns {object} json - payload
 */

export const validateUserSignUpFields = (req, res, next) => {
  req.checkBody('firstName', 'first name is required').notEmpty();
  req.checkBody('firstName',
    'first name must be at least 3 and not start with an empty space')
    .matches(/^[a-zA-Z]{3,}$/);
  req.checkBody('lastName', 'last name is required').notEmpty();
  req.checkBody('lastName',
    'last name must be at least 3 character and not start with an empty space')
    .matches(/^[a-zA-Z]{3,}$/);
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password',
    'Password must be at least 8 and at most 32 characters without space')
    .matches(/[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,32}$/);
  req.checkBody('imageUrl', 'image url is required').notEmpty();
  req.checkBody('imageUrl', 'image url is not valid')
    .matches(/https:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/);

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({ message: errorObject });
  }

  const { isValid } = validator.checkPassword(req.body.password);
  if (!isValid) {
    return res.status(400).send({
      message:
      'password must contain `uppercase, lowercase, number, and spacial character`'
    });
  }
  next();
};

/**
 * @description validate Params
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 * @returns {object} json - payload
 */

export const validateParams = (req, res, next) => {
  // check if param is of type integer
  req.checkParams('id', 'Please input a valid id.').isInt();

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({ message: errorObject });
  }
  next();
};

/**
 * @description validate Comment Field
 * @param {Object} req - Request object
 * @param {Object} res - Response objecj
 * @param {Object} next - callback
 * @returns {object} json - payload
 */
export const validateCommentField = (req, res, next) => {
  req.checkBody('comment', 'comment is required').notEmpty();
  req.checkBody('comment',
    'comment should be at least 5 character long without leading space')
    .matches(/^\w[a-zA-Z0-9 !:.?+=&%@!]{5,}$/);

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({
      message: errorObject
    });
  }
  next();
};

/**
 * @description check if userId params is of type integer
 * and check if user is logged in
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 * @returns {object} json - payload
 */
export const checkAndValidateUserParams = (req, res, next) => {
  // check if param is of type integer
  req.checkParams('userId', 'Please input a valid userId.').isInt();

  // catch any error that might occure
  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({
      message: errorObject,
    });
  }

  if (parseInt(req.params.userId, 10) !== req.decoded.user.id) {
    return res.status(401).send({ message: 'User is not authenticated' });
  }
  next();
};
