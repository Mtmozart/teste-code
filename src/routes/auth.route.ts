import express, { Request, Response } from 'express';
import AuthController from '../controller/auth.controller';
import AuthService from '../service/auth.service';
import AuthModel from '../model/auth.model';
import AuthMiddleware from '../middleware/auth.middleware';

const model = new AuthModel();
const service = new AuthService(model);
const controller = new AuthController(service);
const middleware = new AuthMiddleware();

const router = express.Router();


router.post('/auth', middleware.loginValidate, async (req: Request, res: Response) => {
   await controller.auth(req, res);
});

export default router;
