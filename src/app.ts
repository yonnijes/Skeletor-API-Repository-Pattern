process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

//Env files
import dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});


import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import jwt from 'express-jwt';
import cors from 'cors';



//express
const app: express.Application = express();

// JSON Support
app.use(express.json());

//CORS
app.use(cors());

//Container
loadContainer(app);

// jwt 
if (process.env.jwt_secret_key) {
    app.use(
        jwt({ 
            secret: process.env.jwt_secret_key as string,
            algorithms:['HS256']
         })
         .unless({path:['/','/user']}) 
    );
}


//controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));

export { app };