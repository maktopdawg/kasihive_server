import mongoose, { Schema, model } from 'mongoose';

const BusinessSchema = new Schema({
    // Basic business information
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    registrationNumber: {
        type: String,
        unique: true,
        trim: true
    },
    industry: {
        type: String,
        required: true,
        trim: true // e.g. "Retail", "Agriculture", "Technology"
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

    username: String,
    password: {
        type: String,
        required: true
    },

    owners: [
        {
            name: String,
            surname: String,
            idNumber: String
        }
    ],

    // Location data
    address: {
        street: { 
            type: String,
            required: true, 
            trim: true 
        },
        city: { 
            type: String, 
            required: true, 
            trim: true 
        },
        province: { 
            type: String, 
            required: true, 
            trim: true 
        },
        postalCode: { 
            type: String, 
            required: true, 
            trim: true 
        }
    },
    
    // Contact information
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    websiteUrl: String,

    // KYC and verification documents for business
    documents: [
        {
            documentType: {
                type: String,
                enum: [
                    'BUSINESS REGISTRATION CERTIFICATE',
                    'TAX CLEARANCE CERTIFICATE',
                    'PROOF OF ADDRESS',
                    'BANK STATEMENT',
                    'BUSINESS LICENSE',
                    'IDENTITY DOCUMENT'
                ]
            },
            documentURL: {
                type: String,
                required: true
            },
            dateUploaded: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ['PENDING', 'APPROVED', 'REJECTED'],
                default: 'PENDING'
            }
        }
    ],

    totalRaised: {
        type: Number, // Amount raised from investors so far
        default: 0.0
    },

    investmentRounds: [
        {
            roundId: {
                type: String
            },
            amount: {
                type: Number, // Amount raised in this round
            },
            dateRaised: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ['OPEN', 'CLOSED'],
                default: 'OPEN'
            }
        }
    ],

    // Profit-sharing & investor relations
    profitSharePercentage: {
        type: Number, // Percentage of profit shared with investors
        required: true
    },
    
    investorPayouts: [
        {
            investorId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Investor',
                required: true
            },
            amountPaid: {
                type: Number,
                required: true
            },
            datePaid: {
                type: Date,
                default: Date.now
            }
        }
    ],

    reviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: '',
        }
    ],

    // Business status
    businessStatus: {
        type: String,
        enum: ['UNAPPROVED', 'APPROVED', 'VERIFIED', 'SUSPENDED', 'TERMINATED'],
        default: 'UNAPPROVED'
    },

    // Date fields
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

export default model('Business', BusinessSchema);
