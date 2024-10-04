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
    profileImage: String,

    documents: [
        {
            documentType: {
                type: String, // e.g. "ID", "Proof of Address"
                enum: ['ID', 'PROOF OF RESIDENCE', 'PROOF OF BANK ACCOUNT', 'PASSPORT', 'DRIVER\'S LICENSE', 'BANK STATEMENT', 'PAYSLIP']
            },
            documnetURL: String,
            dateUploaded: {
                type: Date,
                default: Date.now
            }
        }
    ],

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
        enum: ['UNAPPROVED', 'APPROVED', 'VERIFIED', 'UNVERIFIED', 'SUSPENDED', 'TERMINATED'],
        default: 'UNAPPROVED'
    },
    rank: {
        type: Number,
        default: 0
    }
})

export default model('Investor', InvestorAccountSchema)