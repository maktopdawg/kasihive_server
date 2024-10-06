"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InvestmentSchema = new mongoose_1.Schema({
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
});
exports.default = (0, mongoose_1.model)("Investment", InvestmentSchema);
