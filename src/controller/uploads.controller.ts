import { Request, Response } from 'express';
import UploadsService from '../service/uploads.service';

class UploadsController {

  constructor(private service: UploadsService) {

  }

  async registerCurriculum(req: Request, res: Response) {
    const file = req.file;
    const id = req.params.id;

    if (!file) {
      return res.status(400).json({ error: "Arquivo não enviado ou com formato inválido. Permitido somente arquivos .pdf" });
    }

    const result = await this.service.registerCurriculum(file.path, Number(id));
    
    if(result.error) {
      return res.status(404).json(result);
    }

    return res.status(201).json(result);
  }
}

export default UploadsController;