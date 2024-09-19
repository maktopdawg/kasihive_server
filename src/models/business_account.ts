import mongoose, { Schema, model} from "mongoose";
import dotenv from "dotenv";

dotenv.config;

const BusinessAccountSchema = new Schema ({
    // Business Information
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    industry: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

    // Business Contact Informatino
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        requried: true,
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

    investors: [
        {
            investorId: {
                type: mongoose.Schema.ObjectId,
                ref: "Investor"
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
                enum: ['OPEN', 'CLOSED']
            },
            returnsPaid: {
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
            enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'CLOSED'],
            default: 'ACTIVE'
        }
})
    
export default model('Business', BusinessAccountSchema);
