import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

// Função para sanitizar o nome do arquivo
const sanitizeFileName = (filename: string) => {
  return filename
    .replace(/\s+/g, '-') // Substituir espaços por hífens
    .replace(/[^a-zA-Z0-9._-]/g, '') // Remover caracteres especiais
    .toLowerCase(); // transformar tudo em minúsculas
};

export const handleUpload = (req: Request, res: Response, next: NextFunction, typeFile: string) => {  

  // Configura o destino do arquivo
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {      
            
      const dir = path.resolve(__dirname, '..', '..', `uploads/${typeFile}`);
  
      // Cria a pasta se não existir
      fs.mkdirSync(dir, { recursive: true });
  
      cb(null, dir);
    },
    
    // Renomear o arquivo
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const sanitizedFileName = sanitizeFileName(file.originalname);
      const userID = req.params.id;
      cb(null, `${userID}-${sanitizedFileName}`);
    },
  });

  // Filtrar arquivos por tipo
  const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype !== 'application/pdf' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb(null, false);
    }
    cb(null, true);
  };  

  const upload = multer({ 
    storage,
    fileFilter,
  });
 
  // typeFile é o nome do campo do formulário que contém o arquivo. É passado como parâmetro para a função handleUpload na rota.
  return upload.single(typeFile)(req, res, next);




  

  // Para fazer upload de vários arquivos no futuro.

  /* return  upload.fields([{ name: 'curriculum', maxCount: 3 }, { name: 'photo', maxCount: 3 }])(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Erro no upload.' });
      }
      return res.status(400).json({ message: 'Apenas arquivos PDF são permitidos!' });
    }
    next(); // Se tudo estiver certo, prossiga para o próximo middleware
  }); */
}
