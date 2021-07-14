import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';

//import repositorio y servicios
import { UserMySQLRepository } from './services/repositories/impl/mysql/user.repository';
import { UserService } from './services/user.service';


export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        //repositorio
        UserRepository: asClass(UserMySQLRepository).scoped(),
        //services
        UserService: asClass(UserService).scoped(),

    });

    app.use(scopePerRequest(container));
};

