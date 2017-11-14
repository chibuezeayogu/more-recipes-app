//import module
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import logger from 'morgan';
import http from 'http';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import routes from './server/routes/index';
import config from './webpack.config.dev';
require('dotenv').config();

//setup app and 
const compiler = webpack(config);
const app = express();
const router = express.Router();
const secret = process.env.SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

/**
 * @description cross domain origin access support 
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin');
  next();
});


routes(router);
app.use('/api/v1', router);

// Log requests to the console
app.use(logger('dev'));

 app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to More Recipe App',
  }));

  /**
   * @description api documentation route
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  app.get("/API-Documentation", (req, res) => {
    res.sendFile(path.join( __dirname,'./build/index.html'));
  });

  //require and use webpack-dev-middleware
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  //use webpack-hot-middleware
  app.use(require("webpack-hot-middleware")(compiler));

  /**
   * @description client route
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   */
  app.get("*", (req, res) => {
    res.sendFile(path.join( __dirname,'./client/index.html'));
  });

const port = parseInt(process.env.PORT, 10) || 26000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is running at localhost:${port}`);
});

export default app;
