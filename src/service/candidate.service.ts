import { hashPassword } from '../config/bcrypt';
import { PrismaClient } from '@prisma/client';
import CandidateModel from '../model/candidate.model';
import { TAllDataCandidate, TCandidate, TCandidateCreate, TCandidateDefaultData } from '../types/cadidate';


const urlBase = `${process.env.URL_HOST}/view/curriculum`;

class CandidateService {

  private hashPassword: any;
  private prisma: PrismaClient;

  constructor(private model: CandidateModel) {
    this.hashPassword = hashPassword;
    this.prisma = new PrismaClient();
  }

  // método para cadastrar um candidato, falta revisar
  async register(data: TCandidateCreate) {
    const  password = data.password;

    const hash = await this.hashPassword(password);
    const newData = { ...data, password: hash };
    const result = await this.model.register(newData);
    return result;
  }

  // método para buscar um candidato pelo id, falta revisar
  async findById(id: number): Promise<TCandidateDefaultData> {
    
    const result = await this.model.findById(id) as any;

    if (result.error) {
      return result;
    }

    const formattedData: TCandidateDefaultData = {
      id: result.id,
      name: result.name,
      email: result.email,
      age: result.age,
      about: result.about,
      experience: result.experience,
      contactInfo: result.contactInfo,
      educations: result.educations,    
      created_at: result.created_at,
      updated_at: result.updated_at,
     
    };    
    return formattedData;
  }

  // método para buscar todos os candidatos, falta revisar
  async findAll() {
    const result = await this.model.findAll() as any;
    if (result.error) {
      return result;
    }

    const formattedData: TCandidateDefaultData = result.map((candidate: TAllDataCandidate) => {
      const formatted: TAllDataCandidate = {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        age: candidate.age,
        about: candidate.about,
        contactInfo: candidate.contactInfo,
        educations: candidate.educations,        
        created_at: candidate.created_at,
        updated_at: candidate.updated_at,
      }

      return formatted;
    })

    return formattedData;
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