import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import InvestorAccount from "../models/investor_account";
import bcrypt from "bcrypt"
import BusinessAccount from "../models/business_account";
import InvestmentRequest from "../models/investment_request";
import VirtualWallet from "../models/virtual_wallet"

interface VirtualWalletProps {
    investor: string
    investmentRequest: string
    initialInvestment: number
}

class VirtualWalletController {
    static create_new_virtual_wallet = async (req: Request, res: Response) => {
        const { investor, investmentRequest, initialInvestment }: VirtualWalletProps = req.body;

        if (!investor || !investmentRequest || !initialInvestment) return res.status(442).json({ "message": "All fields are required." })


        await VirtualWallet.create({
            investor,
            investmentRequest,
            initialInvestment
        })

        return res.status(200).json({ "message": "Virtual Wallet Created." })
    }

    static get_virtual_wallet = async (req: Request, res: Response) => {
        if (!req?.params?.id) return res.status(442).json({ "message": "All fields are required" })

        const virtualWalletId = req.params.id;

        try {
            const virtual_wallet = await VirtualWallet.findOne({ _id: virtualWalletId })
            return res.status(200).json(virtual_wallet)

        } catch (error: any) {
            console.log(error.message)
            return res.status(404).json({ "message": "Virtual Wallet Not Found." })
        }
    }

    static delete_virtual_wallet = async (req: Request, res: Response) => {
        if (!req?.params?.id) return res.status(442).json({ "message": "All fields are required" })

        const virtual_wallet_id = req.params.id;
        
        try {
            const virtual_wallet = await VirtualWallet.findOneAndDelete({ _id: virtual_wallet_id });
            if(!virtual_wallet) return res.status(404).json({ "message": "Virtual Wallet not found." })
            return res.status(200).json({ "message": `Virtual Wallet Successfully deleted.` })

        } catch (error: any) {
            return res.status(404).json({ "message": `Virtual Wallet with id ${virtual_wallet_id} not found.` })
        }
    }
}

export default VirtualWalletController;