import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import InvestorAccount from "../models/investor_account";
import bcrypt from "bcrypt"
import BusinessAccount from "../models/business_account";
import InvestmentRequest from "../models/investment_request";

interface OpenInvestmentRequest {
    nameOfInvestment: string
    description: string
    amountRequested: number
    duration: number
    risk: string
}

class InvestmentRequestController {
    static open_investment_request = async (req: Request, res: Response) => {
        const businessId = req?.params?.id;
        const { nameOfInvestment, description, amountRequested, duration, risk }: OpenInvestmentRequest = req.body;
        console.log("R1")

        if (!businessId || !nameOfInvestment || !description || !amountRequested || !duration || !risk) return res.status(200).json({ "message": "All fields are required." })
        console.log("R2")

        try {
            // const business = await BusinessAccount.findOne({ _id: businessId }).exec();
            // if (!business) return res.status(200).json({ "message": "No business found." })

            // const openRequests = business.investmentRounds.length;
            const openRequests = 1;
            console.log("R3")

            if (openRequests < 2) {
                console.log("R4")
                const result = await InvestmentRequest.create({
                    "businessId": businessId,
                    "nameOfInvestment": nameOfInvestment,
                    "description": description,
                    "amountRequested": amountRequested,
                    "duration": duration,
                    "risk": risk as "LOW" | "MEDIUM" | "HIGH"
                })
                console.log("R5")
            

                return res.status(200).json({ "message": "Investment Request Now Opened." })
            } else {
                return res.status(200).json({ "message": "Can't open more than two investment requests." })
            }
        } catch (error: any) {
            console.log(error.message)
            return res.status(500).json({ "message": "Internal Server Error." })
        }
    }
}

export default InvestmentRequestController;