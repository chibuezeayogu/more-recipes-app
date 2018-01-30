
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
  req.sanitize('title').trim();
  req.sanitize('description').trim();
  req.sanitize('ingredients').trim();
  req.sanitize('procedures').trim();
  req.sanitize('imageUrl').trim();

  req.checkBody('title', 'title is required').notEmpty();
  req.checkBody('title', 'title must be at least 5 characters long')
    .isLength({ min: 5 });;
  req.checkBody('description', 'description is required').notEmpty();
  req.checkBody('description', 'description must be at least 5 characters long')
    .isLength({ min: 5 });
  req.checkBody('ingredients', 'ingredients is required').notEmpty();
  req.checkBody('ingredients', 'ingredients must be at least 5 characters long')
    .isLength({ min: 5 });
  req.checkBody('procedures', 'procedures is required').notEmpty();
  req.checkBody('procedures', 'procedures must be at least 5 characters long')
    .isLength({ min: 5 });
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
  req.sanitize('firstName').trim();
  req.sanitize('lastName').trim();
  req.sanitize('email').trim();
  req.sanitize('password').trim();
  req.sanitize('imageUrl').trim();

  req.checkBody('firstName', 'first name is required').notEmpty();
  req.checkBody('firstName', 'first name must be at least 3 characters long')
    .isLength({ min: 3 });
  req.checkBody('lastName', 'last name is required').notEmpty();
  req.checkBody('lastName', 'last name must be at least 3 character long')
    .isLength({ min: 3 });
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password', 'password must be at least 8 characters long')
    .isLength({ min: 8 });;
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
      'password must contain `uppercase, lowercase, number, and special character`'
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
