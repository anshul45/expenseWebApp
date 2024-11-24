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
expenseRouter.post("/editExpense", expenseController_1.editExpense);
expenseRouter.get("/getexpenses", expenseController_1.getAllExpense);
expenseRouter.get("/getuserexpense", expenseController_1.getUserExpense);
expenseRouter.get("/getSingleTransaction", expenseController_1.getTransactionById);
expenseRouter.delete("/deleteexpense", expenseController_1.deleteExpense);
expenseRouter.delete("/deleteUser", expenseController_1.deleteUser);
exports.default = expenseRouter;
