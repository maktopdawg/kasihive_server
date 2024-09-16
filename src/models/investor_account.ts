import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const InvestorAccountSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }, 

    // Wallet
    walletBalance: {
        type: Number,
        default: 0.0
    },

    investments: [
        {
            businessId: {
                type: mongoose.Schema.ObjectId,
                ref: "Business"
            },
            investmentId: {
                type: String,
            },
            amountInvested: {
                type: Number,
            },
            dateInvested: {
                type: Date,
                default: Date.now
            },
            dateClosed: {
                type: Date
            },
            status: {
                enum: ['OPEN', 'CLOSED']
            }, 
            returns: {
                type: Number,
                default: 0.0
            }
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    profileStatus: {
        type: String,
        enum: ['VERIFIED', 'UNVERIFIED', 'SUSPENDED', 'TERMINATED'],
        default: 'UNVERIFIED'
    },
    rank: {
        type: Number,
        default: 0
    }
})

export default model('Investor', InvestorAccountSchema)