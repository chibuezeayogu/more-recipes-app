require('dotenv').config();

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import http from 'http';
import expressValidator from 'express-validator';
import webpack from 'webpack';
import routes from './routes/index';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

/**
 * @description cross domain origin access support
 * @param {Object} req - Request object
 * @param {Object} next - callback
 * @param {Object} res - Response object
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin');
  next();
});

app.use('/API-Documentation', express.static('build'));
routes(router);
app.use('/api/v1', router);

app.use(logger('dev'));

app.get('/api/v1', (req, res) => res.status(200).send({
  message: 'Welcome to More Recipes App',
}));


app.use('/', express.static('dist'));
app.use('*', express.static('dist'));

const port = parseInt(process.env.PORT, 10) || 26000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is running at localhost:${port}`);
});

export default app;
