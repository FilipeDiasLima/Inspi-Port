const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const RepositoryController = require('./app/controllers/RepositoryController');

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/repositories', RepositoryController.store);
routes.get('/repositories', RepositoryController.index);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.delete);
routes.post('/repositories/:id/like', RepositoryController.storeLike);

module.exports = routes;