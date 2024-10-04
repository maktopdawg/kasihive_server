import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import InvestorAccount from "../models/investor_account";
import bcrypt from "bcrypt"
import BusinessAccount from "../models/business_account";
import { generateUsername, isValidID } from "../utils/validationUtils";

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
    ownerName: string
    ownerIDNumber: string
    email: string
    contactNumber: string
    password: string
}

interface DeleteInvestorProps {
    username: string
    identityNumber: string
    password: string
}

interface UpdateInvestorProps {
    phoneNumber: string
}

class AccountsController {
    static create_investor_account = async (req: Request, res: Response) => {
        const { firstName, lastName, identityNumber, email, phoneNumber, password }: InvestorSignupProps = req.body;

        if (!firstName || !lastName || !identityNumber || !email || !phoneNumber || !password ) {
            return res.status(200).json({ "message": "All fields are required." })
        }

        if (!isValidID(identityNumber.toString())) return res.status(400).json({ "message": `ID number invalid` })

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
                "username": generateUsername(firstName, lastName),
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
        const { businessName, ownerName, ownerIDNumber, email, contactNumber, password }: BusinessSignupProps = req.body;

        if ( !businessName || !ownerName || !ownerIDNumber || !email || !contactNumber || !password ) {
            return res.status(200).json({ message: "All fields are required."})
        }
        
        const duplicateID = await BusinessAccount.findOne({ ownerIDNumber : ownerIDNumber }).exec();

        if (duplicateID) return res.status(409).json({ message: `Account With Id; ${ownerIDNumber} already exists.`});
        if (!isValidID(ownerIDNumber)) return res.status(400).json({ message: "Invalid ID number entered." });

        const duplicateEmail = await BusinessAccount.findOne({ email: email}).exec();
        if (duplicateEmail) return res.status(409).json({ message: `Account With email; ${email} already exists.`});

        const duplicatePhone = await InvestorAccount.findOne({ contactNumber: contactNumber }).exec();
        if (duplicatePhone) return res.status(409).json({ "message": `Account With cellphone number; ${contactNumber} already exists.` });

        try {
            const result = await BusinessAccount.create({
                "businessName": businessName,
                "ownerName": ownerName,
                "ownerIDNumber": ownerIDNumber,
                "email": email,
                "contactNumber": contactNumber,
                "password": await bcrypt.hash(password, 10)
            })

            res.status(201).json({ message: `Business account has been successfully created for ${businessName}`})
        } catch (error: any) {
            res.status(500).json({ "": error.message, message : "We are having trouble communicationg with the server. Please try again." })
        }
    }

    static delete_investor_account = async (req: Request, res: Response) => {
        const { username, identityNumber, password }: DeleteInvestorProps = req.body;

        if (!username || !identityNumber || !password) res.status(200).json({ "message": "All fields are required." })

        const account = await InvestorAccount.findOne({ username: username }).exec();

        if (!account) return res.status(200).json({ "message": `Account with username ${username} not found.` })
        
        if (account.identityNumber !== identityNumber) return res.status(401).json({ "message": "Incorrect ID." })

        const validPassword = await bcrypt.compare(password, account.password)
        if (!validPassword) return res.status(409).json({ "message": "Invalid Password." })

        const result = await account.deleteOne({ _id: account._id });

        return res.status(200).json({ "message": "Account successfully deleted." })
    }

    static delete_business_account = async (req: Request, res: Response) => {
        // Just trying out the logic, I have no idea if this is correct or not lol
        const { businessId } = req.params;

        if ( !businessId ) {
            return res.status(400).json({ message: "Business ID is required."});
        }

        try {
            const deletedBusiness = await BusinessAccount.findByIdAndDelete(businessId);

            if (!deletedBusiness) {
                return res.status(404).json({ message: `Business account with ID ${businessId} was not found.`})
            }

            return res.status(200).json({ message: "Business account successfully deleted."})
        } catch (error: any) {
            return res.status(500).json({ "": error.message, message : "We are having trouble communicationg with the server. Please try again." })
        }
    }

    static update_investor_account = (req: Request, res: Response) => {
    
    }

    static update_investor_password = async (req: Request, res: Response) => {
        const { username, current_password, new_password }: UpdatePasswordProps = req.body;

        if (!username || !current_password || !new_password) return res.status(200).json({ "message": "All fields are required." })

        const account = await InvestorAccount.findOne({ username: username }).exec()

        if (!account) return res.status(200).json({ "message": `Account with username ${username} not found.` })

        const validPassword = await bcrypt.compare(current_password, account.password);
        if (!validPassword) return res.status(409).json({ "message": "Invalid Password." })

        account.password = await bcrypt.hash(new_password, 10)

        await account.save()

        return res.status(409).json({ "message": "Password updated successfully." })
    }

    static update_business_account = (req: Request, res: Response) => {
        
    }

    static get_all_investor_accounts = async (req: Request, res: Response) => {
        const { query: { filter, value } } = req;

        if (!filter && !value) {
            // Render all investor accounts
            const accounts = await InvestorAccount.find();
            console.log(accounts)
            if (!accounts) return res.status(204).json({ "message": "No investor accounts found." })
            res.status(200).json(accounts)
        }
    }

    static get_all_business_accounts = (req: Request, res: Response) => {
        
    }

    static get_investor_account = async (req: Request, res: Response) => {
        if (!req?.params?.username) return res.status(400).json({ "message": "Account username is required." })
        const username: string = req.params.username;
        const account = await InvestorAccount.findOne({ username: username }).exec();
        if (!account) return res.status(200).json({ "message": `Account with username ${username} not found.` })
        return res.status(200).json(account)
    }

    static get_business_account = (req: Request, res: Response) => {
        
    }

    static upload_investor_document = (req: Request, res: Response, f: FormData) => {
        
    }

    static change_investor_profile_status = async (req: Request, res: Response) => {
        const username = req?.params?.username;
        const { query: { filter, value } } = req;

        console.log(filter)
        console.log(value)

        if (!filter && !value) return res.status(200).json({ "message": "Filter and value required." })

        if (!username) return res.status(200).json({ "message": "Username required." })

        const account = await InvestorAccount.findOne({ username: username }).exec();

        if (!account) return res.status(200).json({ "message": `Account with username ${username} not found.` })

        if (filter !== undefined) {
            account.profileStatus = filter.toString().toUpperCase() as "APPROVED" | "UNAPPROVED" | 'VERIFIED' | 'UNVERIFIED' | 'SUSPENDED' | 'TERMINATED';

            await account.save();

            return res.status(200).json({ "message": `${username}'s account has been approved.` })
        }

        return res.status(500).json({ "message": "Error" })
    }
}

interface UpdatePasswordProps {
    username: string
    current_password: string
    new_password: string
}

interface UploadInvestorDoc {
    documentType: string
    document: File
}

export default AccountsController;