"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BusinessSchema = new mongoose_1.Schema({
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
        // required: true,
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
        // required: true
    },
    investorPayouts: [
        {
            investorId: {
                type: mongoose_1.default.Schema.ObjectId,
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
            type: mongoose_1.default.Schema.ObjectId,
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
exports.default = (0, mongoose_1.model)('Business', BusinessSchema);
