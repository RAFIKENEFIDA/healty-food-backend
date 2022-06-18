import express from 'express';
// const multer = require('multer');

import { addIngrediant, getIngrediants,getOneIngrediant,updateIngrediant,deleteIngrediant,getAllIngrediants } from '@controllers/ingrediant.controller';

const router = express.Router();


router.post('/add', addIngrediant);
router.get('/getAll/:id', getIngrediants);
router.get('/getAll', getAllIngrediants);
router.get('/get/:id', getOneIngrediant);
router.patch('/update/:id', updateIngrediant);
router.delete('/delete/:id', deleteIngrediant);

export { router };