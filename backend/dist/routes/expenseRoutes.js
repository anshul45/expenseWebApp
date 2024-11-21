"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseController_1 = require("../controllers/expenseController");
const expenseRouter = express_1.default.Router();
expenseRouter.post("/addExpenseUser", expenseController_1.addExpenseUser);
expenseRouter.post("/addExpense", expenseController_1.addExpense);
expenseRouter.get("/getexpenses", expenseController_1.getAllExpense);
expenseRouter.get("/getexpense", expenseController_1.getSingleExpense);
expenseRouter.get("/getSingleTransaction", expenseController_1.getTransactionById);
exports.default = expenseRouter;
