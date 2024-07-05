// services/listicle.service.js
import Container from '../models/listicleModels.js';
import fs from 'fs';

// Create multiple containers
export const createMultipleContainers = async (containersData, files) => {
    const createdContainers = [];
    const backUrl = process.env.BACKEND_URL 

    for (let containerData of containersData) {
        try {
            
            const mediaFileName = containerData.media; // Get the file name from containerData
            const file = files.find(file =>  file.filename === mediaFileName) // Find the corresponding file object
            
            if (file) {

                containerData.media = file.path; // Update media to new file name if needed
                console.log('==',`${backUrl}/${containerData.media}`)

              }
              else{
                response.send("file is not found")
              }

            const newContainer = new Container({
                headline: containerData.headline,
                media: containerData.media,
                bodyCopy: containerData.bodyCopy,
                ctaLink: containerData.ctaLink
            });

            const createdContainer = await newContainer.save();
            createdContainers.push(createdContainer);

        } catch (error) {
            console.error(`Error creating container: ${error.message}`);
            
        }
    }

    return createdContainers;
};

// Get all containers
export const getAllContainers = async () => {
    try {
        const containers = await Container.find();
        return containers;
    } catch (err) {
        throw new Error('Error while fetching containers');
    }
};

// Get a container by ID
export const getContainerById = async (containerId) => {
    try {
        const container = await Container.findById(containerId);
        if (!container) {
            throw new Error('Container not found');
        }
        return container;
    } catch (error) {
        throw new Error(`Error fetching container: ${error.message}`);
    }
};

// Update a container by ID
export const updateContainerById = async (containerId, updatedContainer, file) => {
    try {
        const backUrl = process.env.BACKEND_URL;

        // Retrieve existing container data
        const existingContainer = await Container.findById(containerId);
        if (!existingContainer) {
            throw new Error('Container not found');
        }

        // Path of the old media file
        const oldMediaPath = existingContainer.media;

        if (file) {
            // Update container's media field with new file path
            updatedContainer.media = file.path;
            console.log('Media URL:', `${backUrl}/${updatedContainer.media}`);

            // Delete old media file if it exists
            if (oldMediaPath && fs.existsSync(oldMediaPath)) {
                fs.unlinkSync(oldMediaPath);
                console.log('Old media file deleted:', oldMediaPath);
            }
        } else {
            // If no file is provided, retain the old media path
            updatedContainer.media = oldMediaPath;
        }

        // Update container data in MongoDB
        const updated = await Container.findByIdAndUpdate(containerId, updatedContainer, { new: true });
        
        return updated;
    } catch (error) {
        throw new Error(`Error updating container: ${error.message}`);
    }
};

// Delete a container by ID
export const deleteContainerById = async (containerId) => {
    try {
        const deleted = await Container.findByIdAndDelete(containerId);
        return deleted;
    } catch (err) {
        throw new Error(`Error while deleting container with ID ${containerId}`);
    }
};
