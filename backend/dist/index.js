"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const connect_1 = require("./db/connect");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", expenseRoutes_1.default);
app.get("/health", (req, res) => {
    res.send('Server is healthy!');
});
const port = 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    (0, connect_1.conn)();
});
