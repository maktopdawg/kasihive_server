import mongoose, { Schema, model } from 'mongoose';

const DepositSchema = new Schema({
    investorId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    dateDeposited: {
        type: Date,
        default: Date.now
    },
})

export default model("Deposit", DepositSchema)