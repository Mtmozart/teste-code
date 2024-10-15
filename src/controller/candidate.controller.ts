import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import CandidateService from '../service/candidate.service';


class CandidateController {

  private prisma: PrismaClient;

  constructor(private service: CandidateService) { 
    this.prisma = new PrismaClient();
   }

  // método para cadastrar um candidato, falta revisar
  async store(req: Request, res: Response) {
    const { email } = req.body;
    const data = req.body;
    const file = req.file;

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

    if (!file) {
      return res.status(400).json({
        error: 'Arquivo não enviado!',
      });
    }

    data.curriculum = file.filename

    const result = await this.service.register(data) as any;

    if (result.error) return res.status(400).json(result);

    return res.json(result);
  }

  // método para buscar um candidato pelo id, falta revisar
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.findById(+id);
    res.json(result);
  }

  // método para buscar todos os candidatos, falta revisar
  async index(req: Request, res: Response) {
    const result = await this.service.findAll();
    res.json(result);
  }

  // método para atualizar um candidato, falta revisar
  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;
    data.id = +id;
    const result = await this.service.update(data);
    res.json(result);
  }

  // método para deletar um candidato, falta revisar
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.delete(+id);
    res.json(result);
  }

  // restaurar um candidato, falta revisar
  async restore(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.restore(+id);
    res.json(result);
  }
}

export default CandidateController;