import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import InvestorAccount from "../models/investor_account";
import bcrypt from "bcrypt"
import BusinessAccount from "../models/business_account";
import InvestmentRequest from "../models/investment_request";
import VirtualWallet from "../models/virtual_wallet"
import Investment from "../models/investment";

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
}

export default InvestmentController;