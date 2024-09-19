import mongoose, { Schema, model} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const BusinessAccountSchema = new Schema({
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    ownerName: {
        type: String,
        required: true,
        trim: true
    },
    ownerIDNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },


    walletBalance: {
        type: Number,
        default: 0.0
    },
    investmentsReceived: [
        {
            investorId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Investor'
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
            status: {
                type: String,
                enum: ['ACTIVE', 'COMPLETED'],
                default: 'ACTIVE'
            }
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    accountStatus: {
        type: String,
        enum: ['ACTIVE', 'SUSPENDED', 'CLOSED'],
        default: 'ACTIVE'
    }
});

export default model('Business', BusinessAccountSchema);