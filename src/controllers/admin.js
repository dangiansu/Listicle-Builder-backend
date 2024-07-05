// controllers/lead.controller.js
import HttpStatus from 'http-status-codes';
import  {adminService} from '../services/index.js';

export const createLeadController = async (req, res) => {
    try {
        const lead = await adminService.createLead(req.body);
        res.status(HttpStatus.CREATED).json(lead);
    } catch (error) {
        console.error(error.message);
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
};

export const getAllLeadsController = async (req, res) => {
    try {
        const leads = await adminService.getAllLeads();
        res.status(HttpStatus.OK).json(leads);
    } catch (error) {
        console.error(error.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
