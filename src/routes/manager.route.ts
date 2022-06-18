import express from 'express';
// const multer = require('multer');
import { signin,getAllManagers,deleteManager,updateManager,getOneManager } from '@controllers/manager.controller';

const router = express.Router();

router.post('/signin', signin);
router.get('/getAll', getAllManagers);
router.get('/get/:id', getOneManager);
router.patch('/update/:id', updateManager);
router.delete('/delete/:id', deleteManager);

export { router };




