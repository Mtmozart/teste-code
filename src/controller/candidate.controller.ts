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
    const data: TCandidateCreate = req.body;

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

    const result = await this.service.update(data);
    if (result.error) return res.status(400).json(result);
    return res.status(200).json({result});
  }

  // método para deletar um candidato, falta revisar
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.delete(+id);
    if (result.error) return res.status(401).json(result);    
    return res.status(204).send();
  }

  // restaurar um candidato, falta revisar
  async restore(req: Request, res: Response) {
    const { id } = req.params;   
   
    const result = await this.service.restore(+id);
    if (result.error) return res.status(401).json(result);
    
    return res.status(200).json({message: "Candidato restaurado com sucesso"});
  }
}

export default CandidateController;