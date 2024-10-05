import mongoose, { Schema, model } from 'mongoose';

const InvestmentSchema = new Schema({
    investmentId: {
        type: String,
        required: true
    },
    investmentName: {
        type: String,
        required: true
    },
    investmentType: {
        type: String,
        required: true
    },
    investor: {
        type: String,
        required: true
    },
    dateInvested: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    },
    amountInvested: {
        type: Number,
    },
    dateClosed: {
        type: Date
    },
    returns: {
        type: Number,
        default: 0.0
    }
})

export default model("Investment", InvestmentSchema)