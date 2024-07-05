// src/models/container.model.js

import mongoose from 'mongoose';

const containerSchema = new mongoose.Schema({
    // listicleId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    headline: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    }, // URL or path for image/video
    bodyCopy: {
        type: String,
        required: true
    },
    ctaLink: {
        type: String,
        required: true
    }
});

const Container = mongoose.model('Container', containerSchema);

export default Container;
