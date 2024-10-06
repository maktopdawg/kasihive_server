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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const InvestorAccountSchema = new mongoose_1.Schema({
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
    achievements: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: 'Achievement',
            required: true
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
                type: mongoose_1.default.Schema.ObjectId,
                ref: "Investment"
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
});
exports.default = (0, mongoose_1.model)('Investor', InvestorAccountSchema);
