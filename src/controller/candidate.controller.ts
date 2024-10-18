import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import CandidateService from '../service/candidate.service';
import { TCandidateCreate, TCandidateDefaultData } from '../types/cadidate';


class CandidateController {

  private prisma: PrismaClient;

  constructor(private service: CandidateService) { 
    this.prisma = new PrismaClient();
   }

  // método para cadastrar um candidato, falta revisar
  async store(req: Request, res: Response) {
    const { email } = req.body;
    const data: TCandidateCreate = req.body;

    const candidateExist = await this.prisma.candidate.findUnique({
      where: {
        email,
      },
    }); 

    if (candidateExist) {
      return res.status(400).json({
        error: 'Email já cadastrado!',
      });
    }

    const result = await this.service.register(data) as any;

    if (result.error) return res.status(400).json(result);

    return res.status(201).json({ message: "Candidato cadastrado com sucesso"});
  }

  // método para buscar um candidato pelo id, falta revisar
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const result: TCandidateDefaultData = await this.service.findById(+id);
    return res.status(200).json({result});
  }

  // método para buscar todos os candidatos, falta revisar
  async index(req: Request, res: Response) {
    const result = await this.service.findAll();
    return res.status(200).json({result});
  }

  // método para atualizar um candidato, falta revisar
  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;
    data.id = +id;
    
    const candidateExistByEmail = await this.prisma.candidate.findUnique({
      where: {
        email: data.email,
      },
    }); 

    const candidateExistById= await this.prisma.candidate.findUnique({
      where: {
        id: data.id,
      },
    }); 

    if(candidateExistById?.isDeleted){
      return res.status(400).json({
        error: 'Usuário deletado, consulte a equipe ou restaure sua conta!',
      });
    }
    
    if (
      candidateExistByEmail && 
      candidateExistById &&
      candidateExistByEmail.id !== candidateExistById.id
    ) {
      return res.status(400).json({
        error: 'Email já cadastrado!',
      });
    }
    

    const result = await this.service.update(data);
    return res.status(200).json({result});
  }

  // método para deletar um candidato, falta revisar
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const candidateExistById= await this.prisma.candidate.findUnique({
      where: {
        id: +id,
      },
    }); 

    if(candidateExistById?.isDeleted){
      return res.status(400).json({
        error: 'Usuário deletado, consulte a equipe ou restaure sua conta!',
      });
    }
    await this.service.delete(+id);
    return res.status(204).send();
  }

  // restaurar um candidato, falta revisar
  async restore(req: Request, res: Response) {
    const { id } = req.params;
   
    const candidateExistById= await this.prisma.candidate.findUnique({
      where: {
        id: +id,
      },
    }); 

    if(!candidateExistById?.isDeleted){
      return res.status(400).json({
        error: 'Usuário ativo.',
      });
    }
    await this.service.restore(+id);
    return res.status(200).json({message: "Candidato restaurado com sucesso"});
  }



}





export default CandidateController;