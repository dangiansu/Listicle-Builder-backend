// controllers/listicle.controller.js

import HttpStatus from 'http-status-codes';
import { listicleService } from '../services/index.js';
import  upload  from '../middleware/multer.js'

// Create multiple containers
export const createall = async (req, res) => {
    try {
      // Execute multer upload middleware for multiple files
      upload.array('files')(req, res, async (err) => {
        if (err) {
          return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
        }
        try {
          const containersData = req.body.containersData; // Assuming req.body contains containers data
          
          const files = req.files; // Assuming req.files contains uploaded file objects
          
          // Call the service function to create multiple containers
          const createdContainers = await listicleService.createMultipleContainers(JSON.parse(containersData), files);
  
          res.status(HttpStatus.CREATED).json(createdContainers);
        } catch (err) {
          console.error(`Error creating containers: ${err.message}`);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
  };

// Get all containers
export const getAllContainers = async (req, res) => {
    try {
        const containers = await listicleService.getAllContainers();
        res.status(HttpStatus.OK).json({ message: 'Get All Listicle successfully', containers});
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
};

// Get a container by ID
export const getContainerById = async (req, res) => {
  const containerId = req.params.id;

  try {
      const container = await listicleService.getContainerById(containerId);
      res.status(HttpStatus.OK).json({ message: 'Get Listicle successfully',container});
  } catch (error) {
      console.error(error.message);
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
  }
};

// Update a container by ID
export const updateContainerById = async (req, res) => {
  const containerId = req.params.id;
  const updatedContainer = JSON.parse(req.body.containerData); // Assuming container data is sent as JSON string
  const file = req.file; // Assuming one file is uploaded for update

  try {
      const updated = await listicleService.updateContainerById(containerId, updatedContainer, file);
      res.status(HttpStatus.OK).json({ message: 'Listicle updated successfully', updatedListicle: updated });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Delete a container by ID
export const deleteContainerById = async (req, res) => {
    const containerId = req.params.id;

    try {
        const deleted = await listicleService.deleteContainerById(containerId);
        res.status(HttpStatus.OK).json({ message: 'Listicle deleted successfully', deleted });
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
};
