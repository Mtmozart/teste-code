import express, { Request, Response } from 'express';
import { EmailValidateRegex } from '../utils/regex';
import { decodeToken, verifyToken } from '../config/jwt';

class AuthMiddleware {
  
  constructor() {
  }  

  async loginValidate(req: Request, res: Response, next:express.NextFunction): Promise<any> {
    const { email, password } = req.body;

    // Verificação dos campos obrigatórios e espalha os campos faltantes no array missingFields
    const missingFields = [
      !email && 'email',
      !password && 'password'
    ].filter(Boolean);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Preencha todos os campos: ${missingFields.join(', ')}!`,
      });
      
    }

    // verifica o formato do email
    const validEmail = EmailValidateRegex(email);
    if (!validEmail) {
      return res.status(400).json({
        error: 'Email inválido!',
      });
    }

    next();
  }

  async tokenVerify(req: Request, res: Response, next: express.NextFunction): Promise<any> {
    const token = req.headers.authorization;
    const noBearer = token?.split(' ')[1];

    if (!token || !noBearer) {
      return res.status(401).json({
        error: 'Token não fornecido!',
      });
    }
    
    const verify = verifyToken(noBearer);
    if (!verify) {
      return res.status(401).json({
        error: 'Token inválido!',
      });
    }
    next();
  }
}

export default AuthMiddleware;
