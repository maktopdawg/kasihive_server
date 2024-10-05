import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import InvestorAccount from "../models/investor_account";
import bcrypt from "bcrypt"
import BusinessAccount from "../models/business_account";
import InvestmentRequest from "../models/investment_request";
import VirtualWallet from "../models/virtual_wallet"

interface OpenInvestmentRequest {
    nameOfInvestment: string
    description: string
    amountRequested: number
    duration: number
    risk: string
}

interface AddInvestorToRequest {    
    virtualWalletId: string
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

    static get_all_investment_request = async (req: Request, res: Response) => {
        const { query: { filter, value } } = req;

        if (!filter && !value) {
            const investment_requests = await InvestmentRequest.find();
            if (!investment_requests) return res.status(200).json({ "message": [] })
            return res.status(200).json(investment_requests)
        } else {
            const filterUppercase: string | undefined = filter?.toString().toUpperCase();
            console.log(filterUppercase)

            // Return based on risk level
            if (filterUppercase === 'MEDIUM') {
                const investment_requests = await InvestmentRequest.find({ "risk": "MEDIUM" })
                return res.status(200).json(investment_requests)
            } else if (filterUppercase === "LOW") {
                const investment_requests = await InvestmentRequest.find({ "risk": "LOW" })
                return res.status(200).json(investment_requests)
            } else if (filterUppercase === "HIGH") {
                const investment_requests = await InvestmentRequest.find({ "risk": "HIGH" })
                return res.status(200).json(investment_requests)
            }

            // Rerturn investment requests based on business
            const investment_requests = await InvestmentRequest.find({ businessId: filter });
            return res.status(200).json(investment_requests)
        }
    }

    static get_investment_request = async (req: Request, res: Response) => {
        if (!req?.params?.id) return res.status(400).json({ "message": "Investment Request Id required." })
        const investment_request_id = req.params.id;

        try {
            const investment_request = await InvestmentRequest.findOne({ _id: investment_request_id }).exec()
            return res.status(200).json(investment_request)
        } catch (error: any) {
            return res.status(200).json({ "message": `Investment Request with id ${investment_request_id} not found.` })
        }
    }

    static add_investor_to_investment_request = async (req: Request, res: Response) => {
        const { virtualWalletId }: AddInvestorToRequest = req.body;
        
        if (!virtualWalletId) return res.status(400).json({ "message": "No wallet id provided." })

        try {
            const virtualWallet = await VirtualWallet.findOne({ _id: virtualWalletId }).exec()

            try {
                const investment_request = await InvestmentRequest.findOne({ _id: virtualWallet?.investmentRequest }).exec()

                if (!investment_request) return res.status(200).json({ "message": `Investment Request Not found` })

                investment_request.investors.push(
                    {
                        investor: virtualWalletId,
                    }
                )

                investment_request.amountReceived += virtualWallet?.initialInvestment!;

                await investment_request.save()

                return res.status(200).json({ "message": `Virtual Wallet '${virtualWalletId}' has successfully invested.` })
            } catch (error: any) {
                return res.status(200).json({ "message": `Investment Request Not found.` })
            }
            

        } catch (error) {
            return res.status(200).json({ "message": `Virtual Wallet Not found` })
        }
    }

    static remove_investor_from_investment_request = async (req: Request, res: Response) => {
        const { virtualWalletId }: AddInvestorToRequest = req.body;
        
        if (!virtualWalletId) return res.status(400).json({ "message": "No wallet id provided." });
    
        try {
            // Fetch the virtual wallet
            const virtualWallet = await VirtualWallet.findOne({ _id: virtualWalletId }).exec();
            
            if (!virtualWallet) return res.status(200).json({ "message": "Virtual Wallet Not found." });
    
            try {
                const investment_request = await InvestmentRequest.findOne({ _id: virtualWallet?.investmentRequest }).exec();
    
                if (!investment_request) return res.status(200).json({ "message": "Investment Request Not found." });
    
                const investorIndex = investment_request.investors.findIndex(
                    (investor: any) => investor.investor.toString() === virtualWalletId
                );
    
                if (investorIndex === -1) {
                    return res.status(200).json({ "message": "Investor not found in this investment request." });
                }
    
                investment_request.investors.splice(investorIndex, 1);
        
                await investment_request.save();
    
                return res.status(200).json({ "message": `Investor '${virtualWalletId}' has been successfully removed from the investment request.` });
            } catch (error: any) {
                return res.status(500).json({ "message": "Error updating investment request." });
            }
    
        } catch (error: any) {
            return res.status(500).json({ "message": "Error fetching virtual wallet." });
        }
    };
    
}

export default InvestmentRequestController;