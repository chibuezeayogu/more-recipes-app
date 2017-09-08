import express from 'express';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import JWT from 'jsonwebtoken';
import logger from 'morgan';
import http from 'http';
import expressValidator from 'express-validator';
import router from './server/routes';

require('dotenv').config();
const secret = process.env.SECRET;



const app = express();
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(expressJWT({secret}).unless({ path: ['/api/v1/users/signup','/api/v1/users/signin','/*']}));
app.use(expressValidator());

 //require('./server/routes')(app);
 app.use(router);

 app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to More Recipe App',
  }));

 app.get('*', (req, res) => res.status(404).send({
    message: 'Page not found',
  }));


const port = parseInt(process.env.PORT, 10) || 9900;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`The server is running at localhost:${port}`);
});

export default app;






