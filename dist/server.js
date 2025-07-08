"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./configurations/connection"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = require("./configurations/cors");
const cors_2 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, connection_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_2.default)(cors_1.corsOptions));
app.use(express_1.default.json({
    limit: "100mb"
}));
app.use('/api', index_1.default);
app.get("/", (req, res) => {
    res.send("KasiHive Server");
});
mongoose_1.default.connection.once('open', () => {
    console.log("⚡️[server]: Connection To Database Successful");
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
});
