"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_controller_1 = __importDefault(require("../controllers/accounts_controller"));
const router = (0, express_1.Router)();
router.post("/account/investor/register", accounts_controller_1.default.create_investor_account);
router.delete("/accounts/delete-investor-account", accounts_controller_1.default.delete_investor_account);
router.post("/accounts/new-business-account", accounts_controller_1.default.create_business_account);
router.delete("/business/delete/delete-business-account", accounts_controller_1.default.delete_business_account);
router.patch("/accounts/update-investor-password", accounts_controller_1.default.update_investor_password);
router.get("/accounts/investors/all", accounts_controller_1.default.get_all_investor_accounts);
router.get("/accounts/businesses/all", accounts_controller_1.default.get_all_business_accounts);
router.get("/accounts/investors/:username", accounts_controller_1.default.get_investor_account);
router.get("/accounts/business/:id", accounts_controller_1.default.get_business_account);
router.patch("/accounts/investors/:username/change-status", accounts_controller_1.default.change_investor_profile_status);
exports.default = router;
