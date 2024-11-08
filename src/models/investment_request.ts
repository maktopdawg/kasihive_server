import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const InvestmentRequestSchema = new Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor',
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
          ref: 'VirtualWallet'
        },
        dateInvested: {
          type: Date,
          default: Date.now
        }
    }],
    risk: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        required: true
    },
    status: {
        type: String,
        enum: ['OPEN', 'CLOSED'],
        default: 'OPEN'
    }
});

export default model('InvestmentRequest', InvestmentRequestSchema)