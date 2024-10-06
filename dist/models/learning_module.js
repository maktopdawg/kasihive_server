"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LearningPathSchema = new mongoose_1.Schema({
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
});
exports.default = (0, mongoose_1.model)('LearningPath', LearningPathSchema);
