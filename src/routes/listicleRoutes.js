// routes/listicleRoutes.js
import express from 'express';
import upload from '../middleware/multer.js';
import { listicleControllers } from '../controllers/index.js';

const router = express.Router();

// POST /api/listicles/create
router.post('/create', listicleControllers.createall);
router.get('/getall', listicleControllers.getAllContainers)
router.get('/GetById/:id', listicleControllers.getContainerById);
router.put('/update/:id',upload.single('file'),listicleControllers.updateContainerById)
router.delete('/delete/:id', listicleControllers.deleteContainerById)

export default router;
