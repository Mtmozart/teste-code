import express, { Request, Response } from 'express';
import { EmailValidateRegex } from '../utils/regex';

class CandidateMiddleware {
  
  constructor() {
  }

  async register(
    req: Request,
    res: Response,
    next: express.NextFunction,
  ): Promise<void> {
    
    const { name, email, phone, address, age, about, experience, formation, password } = req.body;
    
    const file = req.file as Express.Multer.File;
        
    // Verificação dos campos obrigatórios e espalha os campos faltantes no array missingFields
    const missingFields = [
      !name && 'name',
      !email && 'email',
      !phone && 'phone',
      !address && 'address',
      !age && 'age',
      !about && 'about',
      !experience && 'experience',
      !formation && 'formation',
      !password && 'password'
    ].filter(Boolean);

    if (missingFields.length > 0) {
      res.status(400).json({
        error: `Preencha todos os campos: ${missingFields.join(', ')}!`,
      });
      return;
    }

    // verifica o formato do email
    const validEmail = EmailValidateRegex(email);
    if (!validEmail) {
      res.status(400).json({
        error: 'Email inválido!',
      });

      return;
    }

    // Verifica se o currículo foi enviado
    if (!file) {
      res.status(400).json({
        error: 'Envie o currículo!',
      });

      return;
    }    

    // Verificação do tamanho da senha 
    if (password.length < 8) {
      res.status(400).json({
        error: 'Sua senha deve ter 8 ou mais caracteres!',
      });

      return;
    }

    next();  
  }
}

export default CandidateMiddleware;
