import express,{ Router } from 'express';
import path from 'path';

const staticRoute = Router();

staticRoute.use('/view/candidate/img', express.static(path.join(__dirname, '..', 'uploads/photo')));
staticRoute.use('/view/candidate/curriculum', express.static(path.join(__dirname, '..', 'uploads/curriculum')));

export default staticRoute;
