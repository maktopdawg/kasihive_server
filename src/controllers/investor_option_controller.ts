import { Request, Response } from "express";
import InvestmentOption from "../models/investment_option";
import mongoose from "mongoose";

interface InvestmentOptionProps {
    optionName: string
    description: string
    investmentType: string
    minInvestment: number
    maxInvestment: number
    expectedReturns: number
    riskLevel: string
    investmentDuration: number
    investmentRequests?: InvestmentRequests[]
    investors?: Investors[]
}

interface InvestmentRequests {
    businessId: mongoose.Types.ObjectId;
}

interface Investors {
    id: mongoose.Types.ObjectId
}

class InvestorOptionController {

    static create_investment_option = async (req: Request, res: Response) => {
        const { optionName, description, investmentType, minInvestment, maxInvestment, expectedReturns, riskLevel, investmentDuration, investmentRequests, investors}: InvestmentOptionProps = req.body;

        if ( !optionName || !description || !investmentType || !minInvestment || !maxInvestment || 
            !expectedReturns || !riskLevel || !investmentDuration ) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        try {
            const result = await InvestmentOption.create({
                "optionName": optionName,
                "description": description,
                "investmentType": investmentType,
                "minInvestment": minInvestment,
                "maxInvestment": maxInvestment,
                "expectedReturns": expectedReturns,
                "riskLevel": riskLevel,
                "investmentDuration": investmentDuration,
                "investmentRequests": investmentRequests,
                "investors": investors
            })

            res.status(201).json({ message: "Investment record successfully created", data: result})
        } catch (error: any) {
            res.status(500).json({ "error": error.message, "message": "Error creating investment option"})
        }
    }

    static get_all_investment_options = async (req: Request, res: Response) => {
        try {
            const investmentOptions = await InvestmentOption.find();
            res.status(200).json(investmentOptions);
        } catch (error: any) {
            res.status(500).json({ error: error.message, message: 'Error retrieving investment options' });
        }
    }

    static get_investment_options = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Investment Option ID is required' });
        }

        try {
            const investmentOption = await InvestmentOption.findById(id);

            if (!investmentOption) {
                return res.status(404).json({ message: 'Investment option not found' });
            }

            res.status(200).json(investmentOption);
        } catch (error: any) {
            res.status(500).json({ error: error.message, message: 'Error retrieving investment option' });
        }
    }

    static delete_investment_options = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Investment Option ID is required' });
        }

        try {
            const deletedPerformance = await InvestmentOption.findByIdAndDelete(id);

            if (!deletedPerformance) {
                return res.status(404).json({ message: 'Performance record not found' });
            }

            res.status(200).json({ message: 'Performance record deleted successfully', deletedId: id });
        } catch (error: any) {
            res.status(500).json({ error: error.message, message: 'Error deleting performance record' });
        }
    }
}

export default InvestorOptionController;