import mongoose, { Schema, model } from 'mongoose';

const InvestmentOptionsSchema = new Schema({
    optionName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    investmentType: {
        type: String,
        enum: ["SINGLE_BUSINESS_EQUITY", "BASKET", "POOL"]
    },
    minInvestment: {
        type: Number,
        required: true,
        min: 0
    },
    maxInvestment: {
        type: Number,
        required: true,
        min: 0
    },
    expectedReturns: {
        type: Number,
        required: true
    },
    riskLevel: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        required: true
    },
    investmentDuration: {
        type: Number,
        required: true
    },
    investmentRequests: [
        {
            businessId: {
                type: mongoose.Schema.ObjectId,
                ref: "InvestmentOptions"
            }
        }
    ],
    investors: [
        {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "Investor",
                required: true
            } 
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

export default model("InvestmentOption", InvestmentOptionsSchema)