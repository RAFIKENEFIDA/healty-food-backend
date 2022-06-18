import express from 'express';
// const multer = require('multer');

import { signup } from '@controllers/manager.controller';
import { signupLivreur } from '@controllers/livreur.controller';
import { signinAdmin,signupAdmin,StatistiqueAdmin } from '@controllers/admin.controller';

const router = express.Router();

router.post('/creatManager', signup);
router.post('/createLivreur', signupLivreur);
router.post('/signup', signupAdmin);
router.post('/signin', signinAdmin);
router.get('/statistiques', StatistiqueAdmin);

export { router };