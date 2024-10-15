import { hashPassword } from '../config/bcrypt';
import { PrismaClient } from '@prisma/client';
import CandidateModel from '../model/candidate.model';
import { TCandidate } from '../types/cadidate';

class CandidateService {

  private hashPassword: any;
  private prisma: PrismaClient;

  constructor(private model: CandidateModel) {
    this.hashPassword = hashPassword;
    this.prisma = new PrismaClient();
  }

  // método para cadastrar um candidato, falta revisar
  async register(data: any) {
    const { password } = data;

    const hash = await this.hashPassword(password);
    const newData = { ...data, password: hash };
    const result = await this.model.register(newData);
    return result;
  }

  // método para buscar um candidato pelo id, falta revisar
  async findById(id: number) {
    const result = await this.model.findById(id);
    return result;
  }

  // método para buscar todos os candidatos, falta revisar
  async findAll() {
    const result = await this.model.findAll();
    return result;
  }

  // método para atualizar um candidato, falta revisar
  async update(data: TCandidate) {
    const result = await this.model.update(data);

    return result;
  }

  // método para deletar(soft delete) um candidato, falta revisar
  async delete(id: number) {
    const result = await this.model.delete(id);
    return result;
  }

  // restaurar um candidato, falta revisar

  async restore(id: number) {
    const result = await this.model.restore(id);
    return result;
  }
}

export default CandidateService;