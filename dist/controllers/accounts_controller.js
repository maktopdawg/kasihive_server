"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const investor_account_1 = __importDefault(require("../models/investor_account"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const business_account_1 = __importDefault(require("../models/business_account"));
const validationUtils_1 = require("../utils/validationUtils");
class AccountsController {
}
_a = AccountsController;
AccountsController.create_investor_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, identityNumber, email, phoneNumber, password } = req.body;
    if (!firstName || !lastName || !identityNumber || !email || !phoneNumber || !password) {
        return res.status(200).json({ "message": "All fields are required." });
    }
    if (!(0, validationUtils_1.isValidID)(identityNumber.toString()))
        return res.status(400).json({ "message": `ID number invalid` });
    const duplicateID = yield investor_account_1.default.findOne({ identityNumber: identityNumber }).exec();
    if (duplicateID)
        return res.status(409).json({ "message": `Account With Id; ${identityNumber} already exists.` });
    const duplicateEmail = yield investor_account_1.default.findOne({ email: email }).exec();
    if (duplicateEmail)
        return res.status(409).json({ "message": `Account With email; ${email} already exists.` });
    const duplicatePhone = yield investor_account_1.default.findOne({ phoneNumber: phoneNumber }).exec();
    if (duplicatePhone)
        return res.status(409).json({ "message": `Account With cellphone number; ${phoneNumber} already exists.` });
    try {
        const result = yield investor_account_1.default.create({
            "firstName": firstName,
            "lastName": lastName,
            "username": (0, validationUtils_1.generateUsername)(firstName, lastName),
            "identityNumber": identityNumber,
            "email": email,
            "phoneNumber": phoneNumber,
            "password": yield bcrypt_1.default.hash(password, 10) // Encrypt password
        });
        res.status(201).json({ "message": `Investment account successfully ccreated for ${firstName} ${lastName}!` });
    }
    catch (error) {
        res.status(500).json({ "": error.message, "message": "We are having trouble communicating with the server. Please try again." });
    }
});
// Tested and Working
AccountsController.create_business_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessName, registrationNumber, industry, password, owners, address, email, phoneNumber, websiteUrl } = req.body;
    if (!businessName || !registrationNumber || !industry || !password || !owners || !address || !email || !phoneNumber) {
        return res.status(200).json({ message: "All fields are required." });
    }
    const duplicateRegistration = yield business_account_1.default.findOne({ registrationNumber: registrationNumber }).exec();
    if (duplicateRegistration)
        return res.status(409).json({ message: `Business With Id; ${duplicateRegistration} already exists.` });
    const duplicateEmail = yield business_account_1.default.findOne({ email: email }).exec();
    if (duplicateEmail)
        return res.status(409).json({ message: `Business With email; ${email} already exists.` });
    const duplicatePhone = yield investor_account_1.default.findOne({ phoneNumber: phoneNumber }).exec();
    if (duplicatePhone)
        return res.status(409).json({ message: `Business With cellphone number; ${phoneNumber} already exists.` });
    try {
        const result = yield business_account_1.default.create({
            "businessName": businessName,
            "registrationNumber": registrationNumber,
            "industry": industry,
            "password": yield bcrypt_1.default.hash(password, 10),
            "owners": owners,
            "address": address,
            "email": email,
            "phoneNumber": phoneNumber
        });
        res.status(201).json({ message: `Business account has been successfully created for ${businessName}` });
    }
    catch (error) {
        res.status(500).json({ "": error.message, message: "We are having trouble communicationg with the server. Please try again." });
    }
});
AccountsController.delete_investor_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, identityNumber, password } = req.body;
    if (!username || !identityNumber || !password)
        res.status(200).json({ "message": "All fields are required." });
    const account = yield investor_account_1.default.findOne({ username: username }).exec();
    if (!account)
        return res.status(200).json({ "message": `Account with username ${username} not found.` });
    if (account.identityNumber !== identityNumber)
        return res.status(401).json({ "message": "Incorrect ID." });
    const validPassword = yield bcrypt_1.default.compare(password, account.password);
    if (!validPassword)
        return res.status(409).json({ "message": "Invalid Password." });
    const result = yield account.deleteOne({ _id: account._id });
    return res.status(200).json({ "message": "Account successfully deleted." });
});
// Tested and Working
AccountsController.delete_business_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessName, registrationNumber, password } = req.body;
    if (!businessName || !registrationNumber || !password)
        res.status(200).json({ message: "All fields are required." });
    const business = yield business_account_1.default.findOne({ businessName: businessName }).exec();
    if (!business)
        return res.status(200).json({ message: `Business with the name ${business} was not found.` });
    if (business.registrationNumber !== registrationNumber)
        return res.status(401).json({ message: 'Incorrect registration number' });
    const validPassword = yield bcrypt_1.default.compare(password, business.password);
    if (!validPassword)
        return res.status(409).json({ message: 'Invalid password.' });
    const result = yield business.deleteOne({ _id: business._id });
    return res.status(200).json({ message: 'Account successfully deleted.' });
});
AccountsController.update_investor_account = (req, res) => {
};
AccountsController.update_investor_password = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, current_password, new_password } = req.body;
    if (!username || !current_password || !new_password)
        return res.status(200).json({ "message": "All fields are required." });
    const account = yield investor_account_1.default.findOne({ username: username }).exec();
    if (!account)
        return res.status(200).json({ "message": `Account with username ${username} not found.` });
    const validPassword = yield bcrypt_1.default.compare(current_password, account.password);
    if (!validPassword)
        return res.status(409).json({ "message": "Invalid Password." });
    account.password = yield bcrypt_1.default.hash(new_password, 10);
    yield account.save();
    return res.status(409).json({ "message": "Password updated successfully." });
});
AccountsController.update_business_account = (req, res) => {
};
AccountsController.get_all_investor_accounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query: { filter, value } } = req;
    if (!filter && !value) {
        // Render all investor accounts
        const accounts = yield investor_account_1.default.find();
        console.log(accounts);
        if (!accounts)
            return res.status(204).json({ "message": "No investor accounts found." });
        res.status(200).json(accounts);
    }
});
// Tested and Working
AccountsController.get_all_business_accounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req;
        const filter = query.filter;
        const value = query.value;
        let accounts;
        if (filter && value) {
            accounts = yield business_account_1.default.find({ [filter]: value });
        }
        else {
            accounts = yield business_account_1.default.find();
        }
        res.status(200).json(accounts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching business accounts", error });
    }
});
AccountsController.get_investor_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.username))
        return res.status(400).json({ "message": "Account username is required." });
    const username = req.params.username;
    const account = yield investor_account_1.default.findOne({ username: username }).exec();
    if (!account)
        return res.status(200).json({ "message": `Account with username ${username} not found.` });
    return res.status(200).json(account);
});
// Tested and Working
AccountsController.get_business_account = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id))
        return res.status(400).json({ message: "Account ID is required." });
    const id = req.params.id;
    const business = yield business_account_1.default.findOne({ _id: id }).exec();
    if (!business)
        return res.status(200).json({ message: `Business with id ${id} not found.` });
    return res.status(200).json(business);
});
AccountsController.upload_investor_document = (req, res, f) => {
};
AccountsController.change_investor_profile_status = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const username = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.username;
    const { query: { filter, value } } = req;
    console.log(filter);
    console.log(value);
    if (!filter && !value)
        return res.status(200).json({ "message": "Filter and value required." });
    if (!username)
        return res.status(200).json({ "message": "Username required." });
    const account = yield investor_account_1.default.findOne({ username: username }).exec();
    if (!account)
        return res.status(200).json({ "message": `Account with username ${username} not found.` });
    if (filter !== undefined) {
        account.profileStatus = filter.toString().toUpperCase();
        yield account.save();
        return res.status(200).json({ "message": `${username}'s account has been approved.` });
    }
    return res.status(500).json({ "message": "Error" });
});
exports.default = AccountsController;
