import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';

const app = express();

// Application config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes config
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

// Handlers error config
app.use(errorHandler);

// Server initialization
app.listen(3000, () => {
    console.log('Testeou');
});