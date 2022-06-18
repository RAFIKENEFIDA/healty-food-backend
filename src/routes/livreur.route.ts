import express from 'express';
// const multer = require('multer');
import { signin,getAllLivreurs,deleteLivreur,updateLivreur,getOneLivreur,StatistqueLivreur } from '@controllers/livreur.controller';
import {  getAllCommandeLivreur,affecteCommande,confirmerCommande } from '@controllers/commande.controller';

const router = express.Router();

router.post('/signin', signin);
router.get('/getAll', getAllLivreurs);
router.get('/get/:id', getOneLivreur);
router.patch('/update/:id', updateLivreur);
router.delete('/delete/:id', deleteLivreur);
router.get('/getAllCommande/:id', getAllCommandeLivreur);
router.patch('/affecteCommande', affecteCommande);
router.patch('/confirmerCommande/:id', confirmerCommande);
router.get('/statistques/:id', StatistqueLivreur);

export { router };




