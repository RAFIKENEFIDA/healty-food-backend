import express from 'express';
import { addCategorie, getCategories,getAllCategories,updateCategorie,deleteCategorie } from '@controllers/categorie.controller';

const router = express.Router();

router.post('/add', addCategorie);
router.get('/getAll', getAllCategories);
router.get('/getAll/:id', getCategories);
router.patch('/update/:id', updateCategorie);
router.delete('/delete/:id', deleteCategorie);

export { router };
