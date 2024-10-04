import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const InvestmentRequestSchema = new Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    nameOfInvestment: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    amountRequested: {
        type: Number,
        required: true,
        min: 0
    },
    amountReceived: {
        type: Number,
        default: 0,
        min: 0
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    closingDate: Date,
    investors: [{
        investor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Investor'
        },
        username: String,
        amountInvested: Number,
        dateInvested: {
          type: Date,
          default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED'],
        default: 'OPEN'
    }
});

export default model('InvestmentRequest', InvestmentRequestSchema)