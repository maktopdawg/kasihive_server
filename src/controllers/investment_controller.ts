import { Request, Response } from "express";
import InvestmentRequest from "../models/investment_request";
import VirtualWallet from "../models/virtual_wallet";
import Investment from "../models/investment";

interface InvestmentControllerProps {
    investmentID: string
    investmentName: string
    investor: string
    dateInvested: Date
    status: string
    amountInvested: string
    dateClosed: Date
    returns: number
}

class InvestmentController {
    static create_new_investment = async (req: Request, res: Response) => {
        const { investorId, virtualWalletId, investmentType } = req.body;

        // Validate required fields
        if (!virtualWalletId || !investmentType) {
            return res.status(400).json({ "message": "All fields are required." });
        }

        try {
            const virtualWallet = await VirtualWallet.findOne({ _id: virtualWalletId }).exec();

            if (!virtualWallet) {
                return res.status(404).json({ "message": "Virtual Wallet not found." });
            }

            const investmentRequest = await InvestmentRequest.findOne({ _id: virtualWallet.investmentRequest }).exec();
            
            if (!investmentRequest) {
                return res.status(404).json({ "message": "Investment Request not found." });
            }

            const newInvestment = await Investment.create({
                investmentId: investmentRequest._id,
                investmentName: investmentRequest.nameOfInvestment,
                investmentType: investmentType,
                investor: investorId,
                amountInvested: virtualWallet.initialInvestment,
                status: investmentRequest.status
            });

            return res.status(201).json({ "message": "New investment created successfully.", investment: newInvestment });

        } catch (error: any) {
            return res.status(500).json({ "message": "Internal Server Error." });
        }
    }

    static get_investment = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Investment ID is required" });
        }

        try {
            const investment = await Investment.findById(id).exec();

            if (!investment) {
                return res.status(404).json({ message: "Investment not found" });
            }

            return res.status(200).json(investment);
        } catch (error: any) {
            if (error.name === 'CastError') {
                return res.status(400).json({ message: "Invalid ID format" });
            }
            return res.status(500).json({ message: "Internal Server Error.", error: error.message });
        }
    }

    static update_investment_status = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Investment ID is required" });
        }

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        try {
            const updatedInvestment = await Investment.findByIdAndUpdate(
                id,
                { status: status },
                { new: true }
            ).exec();

            if (!updatedInvestment) {
                return res.status(404).json({ message: "Investment not found" });
            }
            return res.status(200).json({ message: "Investment status updated successfully", investment: updatedInvestment });
        } catch (error: any) {
            return res.status(500).json({ message: "Internal Server Error.", error: error.message });
        } 
    }
}

export default InvestmentController;