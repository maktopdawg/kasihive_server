"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PerformanceSchema = new mongoose_1.Schema({
    businessId: {
        type: String,
        required: true
    },
    financialMetrics: [
        {
            day: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            revenue: {
                type: Number,
                required: true
            },
            expenses: {
                type: Number,
                required: true
            },
            netProfit: {
                type: Number,
                required: true
            }
        }
    ],
    performanceIndicators: [
        {
            customerGrowth: {
                type: Number,
                required: true
            },
            employeeGrowth: {
                type: Number,
                required: true
            },
        }
    ],
    status: {
        type: String,
        enum: ['EXCELLENT', 'GOOD', 'AVERAGE', 'POOR']
    }
});
exports.default = (0, mongoose_1.model)('Performance', PerformanceSchema);
