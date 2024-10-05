// deposit_controller.ts
import { Request, Response } from "express";
import deposit from "../models/deposit";

interface DepositProps {
    investorId: string;
    amount: number;
    dateDeposited: Date;
}

class DepositController {
    static create_deposit = async (req: Request, res: Response) => {
        const { investorId, amount, dateDeposited }: DepositProps = req.body;

        if (!investorId || !amount || !dateDeposited) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const result = await deposit.create({
                investorId,
                amount,
                dateDeposited,
            });
            res.status(201).json({ message: "Deposit successfully created", deposit: result });
        } catch (error: any) {
            res.status(500).json({ error: error.message, message: "Error creating deposit" });
        }
    };

    static get_deposit = async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Deposit id is required." });
        }
        try {
            const result = await deposit.findById(id);

            if (!result) {
                return res.status(404).json({ message: "Deposit record not found" });
            }

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message, message: "Error retrieving deposit record" });
        }
    };
}

export default DepositController;