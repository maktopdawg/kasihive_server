import mongoose, { Schema, model } from 'mongoose';

const PerformanceSchema = new Schema({
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
})

export default model('Performance', PerformanceSchema)