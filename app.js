import express from 'express';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import logger from 'morgan';
import http from 'http';
import expressValidator from 'express-validator';
import routes from './server/routes/index';

require('dotenv').config();

const app = express();

const router = express.Router();

const secret = process.env.SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

routes(router);
app.use('/api/v1', router);

app.use(logger('dev'));

 app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to More Recipe App',
  }));

 app.get('*', (req, res) => res.status(404).send({
    message: 'Page not found',
  }));


const port = parseInt(process.env.PORT, 10) || 26000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is running at localhost:${port}`);
});

export default app;
