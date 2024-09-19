import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import InvestorAccount from "../models/investor_account";
import bcrypt from "bcrypt"
import BusinessAccount from "../models/business_account";

interface InvestorSignupProps {
    firstName: string
    lastName: string
    identityNumber: number
    email: string
    phoneNumber: string
    password: string
}

interface BusinessSignupProps {
    businessName: string
    industry: string
    description: string
    email: string
    contactNumber: string
    password: string
}

class AccountsController {
    static create_investor_account = async (req: Request, res: Response) => {
        const { firstName, lastName, identityNumber, email, phoneNumber, password }: InvestorSignupProps = req.body;

        if (!firstName || !lastName || !identityNumber || !email || !phoneNumber || !password ) {
            return res.status(200).json({ "message": "All fields are required." })
        }

        const duplicateID = await InvestorAccount.findOne({ identityNumber: identityNumber }).exec();

        if (duplicateID) return res.status(409).json({ "message": `Account With Id; ${identityNumber} already exists.` });

        const duplicateEmail = await InvestorAccount.findOne({ email: email }).exec();

        if (duplicateEmail) return res.status(409).json({ "message": `Account With email; ${email} already exists.` });

        const duplicatePhone = await InvestorAccount.findOne({ phoneNumber: phoneNumber }).exec();

        if (duplicatePhone) return res.status(409).json({ "message": `Account With cellphone number; ${phoneNumber} already exists.` });

        try {
            const result = await InvestorAccount.create({
                "firstName": firstName,
                "lastName": lastName,
                "username": `${firstName}${identityNumber}`,
                "identityNumber": identityNumber,
                "email": email,
                "phoneNumber": phoneNumber,
                "password": await bcrypt.hash(password, 10) // Encrypt password
            })

            res.status(201).json({ "message": `Investment account successfully ccreated for ${firstName} ${lastName}!` })
        } catch (error: any) {
            res.status(500).json({ "": error.message, "message": "We are having trouble communicating with the server. Please try again." })
        }
    }

    static create_business_account = async (req: Request, res: Response) => {
        const { businessName, industry, description, email, contactNumber, password }: BusinessSignupProps = req.body;

        if ( !businessName || !industry || !description || !email || !contactNumber || !password ) {
            return res.status(200).json({ message: "All fields are required." })
        }

        const duplicateEmail = await BusinessAccount.findOne({ email }).exec();
        
        if (duplicateEmail) return res.status(409).json({ message: `Business with email; ${email} already exists.`});

        const duplicateContactNumber = await BusinessAccount.findOne({ contactNumber }).exec();

        if (duplicateContactNumber) return res.status(409).json({ message: `Business with contact number; ${contactNumber} already exists.`});

        try {
            const result = await BusinessAccount.create({
                "businessName": businessName,
                "industry": industry,
                "description": description,
                "email": email,
                "contactNumber": contactNumber,
                "password": await bcrypt.hash(password, 10)
            })
            res.status(201).json({ message: `Business account successfully created for ${businessName}!`})
        } catch (error: any) {
            res.status(500).json({ "": error.message, "message": "We are having trouble communicating with the server. Please try again." })
        }
    }

    static delete_investor_account = (req: Request, res: Response) => {
        
    }

    static delete_business_account = (req: Request, res: Response) => {
        
    }

    static update_investor_account = (req: Request, res: Response) => {
        
    }

    static update_business_account = (req: Request, res: Response) => {
        
    }

    static get_all_investor_accounts = (req: Request, res: Response) => {
        
    }

    static get_all_business_accounts = (req: Request, res: Response) => {
        
    }

    static get_investor_account = (req: Request, res: Response) => {
        
    }

    static get_business_account = (req: Request, res: Response) => {
        
    }
}

export default AccountsController;