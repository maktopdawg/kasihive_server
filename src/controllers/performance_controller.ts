import { Request, Response } from "express";
import PerformanceModel from "../models/performance_model";

interface PerformanceProps {
    businessId: string
    financialMetrics: FinancialMetricsProps[]
    performanceIndicators: PerformanceIndicatorsProps[]
    status: string
}

interface FinancialMetricsProps {
    day: string
    date: Date
    revenue: number
    expenses: number
    netProfit: number
}

interface PerformanceIndicatorsProps {
    customerGrowth: number
    employeeGrowth: number
}

class PerformanceController {

    static create_performance = async (req: Request, res: Response) => {
        const { businessId, financialMetrics, performanceIndicators, status }: PerformanceProps = req.body;

        if ( !businessId || !financialMetrics || !performanceIndicators || !status ) {
            return res.status(200).json({ message : 'All fields are required.'})
        }

        try {
            const result = await PerformanceModel.create({
                "businessId": businessId,
                "financialMetrics": financialMetrics,
                "performanceIndicators": performanceIndicators,
                "status": status
            })

            res.status(201).json({ message: "Performance record successfully created", data: result})
        } catch (error:any) {
            res.status(500).json({ "error": error.message, "message": "Error creating performance record." });
        }
    }

    static delete_performance = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Performance ID is required' });
        }

        try {
            const deletedPerformance = await PerformanceModel.findByIdAndDelete(id);

            if (!deletedPerformance) {
                return res.status(404).json({ message: 'Performance record not found' });
            }

            res.status(200).json({ message: 'Performance record deleted successfully', deletedId: id });
        } catch (error: any) {
            res.status(500).json({ error: error.message, message: 'Error deleting performance record' });
        }

    }

    static get_all_performances = async (req: Request, res: Response) => {
        try {
            const performances = await PerformanceModel.find();
            res.status(200).json(performances);
        } catch (error: any) {
            res.status(500).json({ error: error.message, message: 'Error retrieving performance records' });
        }
    }

    static get_performance = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Performance ID is required' });
        }

        try {
            const performance = await PerformanceModel.findById(id);

            if (!performance) {
                return res.status(404).json({ message: 'Performance record not found' });
            }

            res.status(200).json(performance);
        } catch (error: any) {
            if (error.name === 'CastError') {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            res.status(500).json({ error: error.message, message: 'Error retrieving performance record' });
        }
    }
    
}

export default PerformanceController;