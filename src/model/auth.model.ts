import { PrismaClient } from '@prisma/client';

class AuthModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // método de autenticação, falta revisar
  async login(email: string) {   

    const candidate = await this.prisma.candidate.findUnique({
      where: {
        email,
      },
    });

    if (!candidate) {
      return {
        error: 'Candidato não encontrado!',
      };
    }
    
    return candidate;
  }
}

export default AuthModel;