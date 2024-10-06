"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const virtual_wallet_controller_1 = __importDefault(require("../controllers/virtual_wallet_controller"));
const router = (0, express_1.Router)();
router.post("/virtual_wallet/new", virtual_wallet_controller_1.default.create_new_virtual_wallet);
router.get("/virtual_wallet/view/:id", virtual_wallet_controller_1.default.get_virtual_wallet);
router.delete("/virtual_wallet/delete/:id", virtual_wallet_controller_1.default.delete_virtual_wallet);
exports.default = router;
