import express from 'express';

import { createCommande,getAllCommandes,getOneCommande,getAllCommandesDisp } from '@controllers/commande.controller';

const router = express.Router();

router.post('/add', createCommande);
router.get('/getAll', getAllCommandes);
router.get('/get/:id', getOneCommande);
router.get('/getAllCommandesDisp', getAllCommandesDisp);

export { router };