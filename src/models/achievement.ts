import mongoose, { Schema, model } from 'mongoose';

const AchievementSchema = new Schema({
    username: {
        type: mongoose.Schema.ObjectId,
        ref: "Investor",
        required: true
    },
    learningPath: {
        type: mongoose.Schema.ObjectId,
        ref: "LearningPath",
        required: true
    }
})

export default model("Achievement", AchievementSchema)