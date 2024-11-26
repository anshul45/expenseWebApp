"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseController_1 = require("../controllers/expenseController");
const expenseRouter = express_1.default.Router();
//@ts-ignore
expenseRouter.post("/addExpenseUser", expenseController_1.addExpenseUser);
//@ts-ignore
expenseRouter.post("/addExpense", expenseController_1.addExpense);
//@ts-ignore
expenseRouter.post("/editExpense", expenseController_1.editExpense);
//@ts-ignore
expenseRouter.get("/getexpenses", expenseController_1.getAllExpense);
//@ts-ignore
expenseRouter.get("/getuserexpense", expenseController_1.getUserExpense);
//@ts-ignore
expenseRouter.get("/getSingleTransaction", expenseController_1.getTransactionById);
//@ts-ignore
expenseRouter.delete("/deleteexpense", expenseController_1.deleteExpense);
//@ts-ignore
expenseRouter.delete("/deleteUser", expenseController_1.deleteUser);
exports.default = expenseRouter;
