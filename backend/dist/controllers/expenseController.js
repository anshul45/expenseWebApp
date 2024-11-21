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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.getTransactionById = exports.getSingleExpense = exports.getAllExpense = exports.addExpense = exports.addExpenseUser = void 0;
const expenseModel_1 = __importDefault(require("../db/models/expenseModel"));
const addExpenseUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type } = req.body;
    const newExpense = new expenseModel_1.default({
        name,
        type,
        transactions: [],
    });
    try {
        const savedExpense = yield newExpense.save();
        return res.json({ message: "Expense user added successfully", expense: savedExpense });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ messsage: "Error Saving ExpenseUser", error: error.messsage });
    }
});
exports.addExpenseUser = addExpenseUser;
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, desc, amount, paidBy, paidTo } = req.body;
    console.log(id);
    try {
        const expense = yield expenseModel_1.default.findById(id);
        if (!expense)
            res.status(403).json({ messsage: "ExpenseUser doesn't exist, First create user then only you can add expense!" });
        const newTransaction = {
            desc,
            amount,
            createDate: new Date(),
            paidBy,
            paidTo
        };
        expense === null || expense === void 0 ? void 0 : expense.transactions.push(newTransaction);
        yield expense.save();
        return res.status(200).json({
            message: "Expense added successfully",
            expense: expense
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ messsage: "Error Saving Expense", error: error.messsage });
    }
});
exports.addExpense = addExpense;
const getAllExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        // Check if 'type' is passed in the query string
        if (!type) {
            return res.status(400).json({ message: "Type is required in the query parameters." });
        }
        const expense = yield expenseModel_1.default.find({ type });
        res.status(201).json({ expense });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving expenses", error: error.message });
    }
});
exports.getAllExpense = getAllExpense;
const getSingleExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        // Check if 'type' is passed in the query string
        if (!id) {
            return res.status(400).json({ message: "Id is required in the query parameters." });
        }
        const expense = yield expenseModel_1.default.findById(id);
        res.status(201).json({ expense });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving expenses", error: error.message });
    }
});
exports.getSingleExpense = getSingleExpense;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionId } = req.query;
        if (!transactionId) {
            return res.status(400).json({ message: "Transaction ID is required in the query parameters." });
        }
        const expense = yield expenseModel_1.default.findOne({ "transactions._id": transactionId });
        if (!expense) {
            return res.status(404).json({ message: "Expense or transaction not found." });
        }
        const transaction = expense.transactions.find((txn) => txn._id.toString() === transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found in the expense." });
        }
        const _a = expense.toObject(), { transactions } = _a, expenseWithoutTransactions = __rest(_a, ["transactions"]);
        return res.status(200).json(Object.assign(Object.assign({}, expenseWithoutTransactions), { transaction }));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving transaction", error: error.message });
    }
});
exports.getTransactionById = getTransactionById;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    if (!transactionId) {
        return res.status(400).json({ message: "Transaction ID is required in the query parameters." });
    }
    try {
        // Find and update the expense by removing the specific transaction
        const result = yield expenseModel_1.default.updateOne({ "transactions._id": transactionId }, // Match document containing the transaction
        { $pull: { transactions: { _id: transactionId } } } // Remove the transaction from the array
        );
        if (result.modifiedCount === 0) {
            // No transaction found or removed
            return res.status(404).json({ message: "Transaction not found." });
        }
        return res.status(200).json({ message: "Transaction deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting transaction:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.deleteExpense = deleteExpense;
