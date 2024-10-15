import express, { Request, Response } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import { handleUpload } from '../middleware/uploads.middleware';
import CandidateController from '../controller/candidate.controller';
import CandidateModel from '../model/candidate.model';
import CandidateService from '../service/candidate.service';
import CandidateMiddleware from '../middleware/candidate.middleware';

const model = new CandidateModel();
const service = new CandidateService(model);
const controller = new CandidateController(service);
const candidateMiddleware = new CandidateMiddleware();
const authMiddleware = new AuthMiddleware();

const router = express.Router();

router.post('/candidate/register', (req, res, next) => handleUpload(req, res, next, 'curriculum'), candidateMiddleware.register, async (req: Request, res: Response) => {
  await controller.store(req, res);
});

router.get('/candidate/:id', authMiddleware.tokenVerify, async (req: Request, res: Response) => {
  await controller.show(req, res);
});

router.get('/candidate', authMiddleware.tokenVerify, async (req: Request, res: Response) => {
  await controller.index(req, res);
});

router.put('/candidate/:id', authMiddleware.tokenVerify, async (req: Request, res: Response) => {
  await controller.update(req, res);
});

router.patch('/candidate/restore/:id', authMiddleware.tokenVerify, async (req: Request, res: Response) => {
  await controller.restore(req, res);
});

router.delete('/candidate/:id', authMiddleware.tokenVerify, async (req: Request, res: Response) => {
  await controller.delete(req, res);
});


export default router;