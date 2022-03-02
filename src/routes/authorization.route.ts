import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication.middleware';


const authorizationRoute = Router();

authorizationRoute.post('/token/refresh', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    console.log('desafio');
    //Lançar uma exeçao diferente "401" quando o token expirar, para as aplicações identificarem isso e chamar esse endpoint;
    //Aqui vou receber o token antigo, pegar o usuario dele, autenticar novamente, gerar um token novo nesse requisição
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new ForbiddenError('Usuário não informado!');
        }

        const jwtPayload = { username: user.username};
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: 60000};
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt});

    } catch (error) {
        next(error);
    }
});



export default authorizationRoute;