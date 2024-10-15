import AuthModel from '../model/auth.model';
import { comparePassword, hashPassword } from '../config/bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../config/jwt';
import { TCandidate } from '../types/cadidate';

class AuthService {

  constructor(private model: AuthModel) {
  }

  // método de autenticação, falta revisar
  async login(data: { email: string, password: string }) {
    const { email, password } = data;
    const isCandidate = await this.model.login(email) as unknown as TCandidate;
    
    if (isCandidate.error) {     
      return {
        error: 'Candidato não encontrado!',
      };
    }
    
    if ('password' in isCandidate) {
      const isValidPassword = await comparePassword(password, isCandidate.password);
      if (!isValidPassword) return { error: 'Senha inválida!' };
    }
    
    const token = generateToken(isCandidate.id);
    return { token };
  }
}

export default AuthService;