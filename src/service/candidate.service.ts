import { hashPassword } from '../config/bcrypt';
import { PrismaClient } from '@prisma/client';
import CandidateModel from '../model/candidate.model';
import { TAllDataCandidate, TCandidate } from '../types/cadidate';

const urlBase = `${process.env.URL_HOST}/view/curriculum`;

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
    
    const result = await this.model.findById(id) as any;

    if (result.error) {
      return result;
    }

    const formatedData = {
      name: result.name,
      email: result.email,
      age: result.age,
      about: result.about,
      isDeleted: result.isDeleted,
      phone: result.contactInfo.phone,
      address: result.contactInfo.address,
      created_at: result.created_at,
      updated_at: result.updated_at,
      formation: result.educations[0].formation,
      experience: result.educations[0].experience,
      curriculum: `${urlBase}/${result.educations[0].curriculum}`,
    };

    return formatedData;
  }

  // método para buscar todos os candidatos, falta revisar
  async findAll() {
    const result = await this.model.findAll() as any;

    if (result.error) {
      return result;
    }

    const formatedData = result.map((candidate: TAllDataCandidate) => {
      const formated = {
        name: candidate.name,
        email: candidate.email,
        age: candidate.age,
        address: candidate.contactInfo.address,
        isDeleted: candidate.isDeleted,
        curriculum: `${urlBase}/${candidate.educations[0].curriculum}`,
        created_at: candidate.created_at,
        updated_at: candidate.updated_at,
      }

      return formated;
    })

    return formatedData;
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