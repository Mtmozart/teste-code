import express, { Request, Response } from 'express';
import AuthMiddleware from '../../middleware/auth.middleware';
import { handleUpload } from '../../middleware/uploads.middleware';
import UploadsModel from '../../model/uploads.model';
import { PrismaClient } from '@prisma/client';
import UploadsService from '../../service/uploads.service';
import UploadsController from '../../controller/uploads.controller';

const prisma = new PrismaClient();
const model = new UploadsModel(prisma);
const service = new UploadsService(model);
const controller = new UploadsController(service);
const authMiddleware = new AuthMiddleware();

const router = express.Router();

router.post('/uploads/curriculum/:id', (req, res, next) => handleUpload(req, res, next, 'curriculum'), authMiddleware.tokenVerify, async (req: Request, res: Response) => {
  await controller.registerCurriculum(req, res);
});


export default router;
