import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const VirtualWalletSchema = new Schema({
    investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investor',
        required: true
    },
    investmentRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InvestmentRequest',
        required: true
    },
    initialInvestment: {
        type: Number,
        required: true
    },
    currentBalance: {
        type: Number,
        default: 0
    }
});

export default model('VirtualWallet', VirtualWalletSchema)