// src/routes/index.js

import express from 'express';
import listicleRoutes from './listicleRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/listicles', listicleRoutes);
router.use('/admin',adminRoutes)

export default router;
