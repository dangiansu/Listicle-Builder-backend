// routes/lead.routes.js
import express from 'express';
import { createLeadController, getAllLeadsController } from '../controllers/admin.js';

const router = express.Router();

router.post('/Createleads', createLeadController);
router.get('/Getleads', getAllLeadsController);

export default router;
