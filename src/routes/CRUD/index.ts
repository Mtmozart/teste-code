import express from 'express';
import 'express-async-errors';
import auth from './auth.route';
import candidate from './candidate.route';
import uploads from './uploads.route';

const router = express.Router();

router.use(auth);
router.use(candidate);
router.use(uploads);

export default router;