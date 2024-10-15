import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const handleUpload = (req: Request, res: Response, next: NextFunction, typeFile: string) => {
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      
      const dir = path.resolve(__dirname, '..', '..', `uploads/${typeFile}`);
  
      // Cria a pasta se não existir
      fs.mkdirSync(dir, { recursive: true });
  
      cb(null, dir);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const userID = req.params.id;
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

  return upload.single(typeFile)(req, res, next);
}