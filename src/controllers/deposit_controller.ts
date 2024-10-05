import { Request, Response } from "express";
import deposit from "../models/deposit";

interface DepositController{
    investorId : string
    amount: number
    dateDeposited: Date

}


class DepositController {

    static create_deposit_account = async (req: Request, res: Response) => {
        const { investorId, amount, dateDeposited }: DepositController = req.body;
    
        if (!investorId || !amount || !dateDeposited) {
            return res.status(200).json({message: "All fields are required."})
        }

        try {
            const result = await deposit.create({
                "investorId": investorId,
                "amount": amount,
                "dateDeposited": dateDeposited
            })
            res.status(201).json({ message: "Deposit successfully created"})
        } catch (error: any) {
            res.status(500).json({ "error": error.message, "message": "Error creating deposit"});
        }
    }

} 

export default DepositController;
