import express from 'express';
import { getDataUser } from '@controllers/commun.controller';

const router = express.Router();

router.post('/data', getDataUser);

export { router };
