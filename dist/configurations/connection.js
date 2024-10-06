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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import dotenv from 'dotenv';
/**
 * Load enviroment variables from .env file into process.env.
 * This allows for configuration of enviroment-specific settings.
 */
// dotenv.config();
/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * @returns {Promise<void>} A Promise that resolves when the database connection is successfully established.
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to the MongoDB database using the provided DATABASE_URI environment variable.
        // If DATABASE_URI is not defined, an empty string is used as the default value.
        yield mongoose_1.default.connect(process.env.DATABASE_URI || '', {
            // Configuration options for the MongoDB connection.
            useUnifiedTopology: true, // Enable the new unified topology engine.
            useNewUrlParser: true // Enable the new URL parser.
        });
    }
    catch (error) {
        // Throw any errors that occur during the database connection process.
        throw error;
    }
});
exports.default = connectDB;
