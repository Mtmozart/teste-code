import { Request, Response } from 'express';
import AuthService from '../service/auth.service';

class AuthController {

  constructor(private service: AuthService) { 
   }

   // método de autenticação, falta revisar
  async auth(req: Request, res: Response) {
    
    const result = await this.service.login(req.body) as any;
    if (result.error) {
      return res.status(400).json(result);
    }
    return res.json(result);
  }  
}

export default AuthController;