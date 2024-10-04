import mongoose, { Schema, model } from 'mongoose';

const LearningPathSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    modules: [
        {
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ],
    reward: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        min: 0,
        default: 0,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

export default model ('LearningPath', LearningPathSchema)