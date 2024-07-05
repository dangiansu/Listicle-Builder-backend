// services/lead.service.js
import Lead from '../models/adminModels.js';

export const createLead = async (leadData) => {
    try {
        const newLead = new Lead(leadData);
        return await newLead.save();
    } catch (error) {
        throw new Error('Error creating lead: ' + error.message);
    }
};

export const getAllLeads = async () => {
    try {
        return await Lead.find({});
    } catch (error) {
        throw new Error('Error retrieving leads: ' + error.message);
    }
};
