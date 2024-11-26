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
exports.deleteUser = exports.deleteExpense = exports.getTransactionById = exports.getUserExpense = exports.getAllExpense = exports.editExpense = exports.addExpense = exports.addExpenseUser = void 0;
const expenseModel_1 = __importDefault(require("../db/models/expenseModel"));
const addExpenseUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, users } = req.body;
    // Validation checks
    if (!name || !type) {
        return res.status(400).json({ message: "Invalid input data: name and type are required" });
    }
    if (type === "individual") {
        if (!name) {
            return res.status(400).json({
                message: "Invalid input data: For 'individual', exactly one friend must be provided",
            });
        }
    }
    else if (type === "group") {
        if (!users || users.length === 0) {
            return res.status(400).json({
                message: "Invalid input data: For 'group', at least one user must be provided",
            });
        }
    }
    else {
        return res.status(400).json({ message: "Invalid input data: Type must be 'individual' or 'group'" });
    }
    const usersList = type === "individual" ? ["you", name] : ["you", ...users];
    // Create a new Expense
    const newExpense = new expenseModel_1.default({
        name,
        type,
        users: usersList,
        transactions: [],
    });
    try {
        const savedExpense = yield newExpense.save();
        return res.json({ message: "Expense user added successfully", expense: savedExpense });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error saving ExpenseUser",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.addExpenseUser = addExpenseUser;
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, desc, amount, paidBy, paidTo } = req.body;
    try {
        const expense = yield expenseModel_1.default.findById(id);
        if (!expense) {
            return res.status(403).json({
                message: "ExpenseUser doesn't exist. First create a user, then you can add expenses!",
            });
        }
        // Directly create the new transaction object
        const newTransaction = {
            desc,
            amount,
            createDate: new Date(),
            paidBy,
            paidTo,
        };
        // Push the new transaction object to the transactions array
        expense.transactions.push(newTransaction);
        yield expense.save();
        return res.status(200).json({
            message: "Expense added successfully",
            expense,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error saving expense",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.addExpense = addExpense;
const editExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, desc, amount, paidBy, paidTo } = req.body;
    if (!transactionId) {
        return res.status(400).json({ message: "Transaction ID is required in the request body." });
    }
    try {
        // Prepare dynamic update fields
        const updateFields = {};
        if (desc)
            updateFields["transactions.$.desc"] = desc;
        if (amount)
            updateFields["transactions.$.amount"] = amount;
        if (paidBy)
            updateFields["transactions.$.paidBy"] = paidBy;
        // For nested `paidTo` updates, overwrite the entire array if provided
        if (paidTo && Array.isArray(paidTo)) {
            updateFields["transactions.$.paidTo"] = paidTo;
        }
        // Update transaction using array filters to match the specific transaction ID
        const result = yield expenseModel_1.default.updateOne({ "transactions._id": transactionId }, { $set: updateFields });
        // Handle cases where no documents are updated
        if (result.modifiedCount === 0) {
            return res.status(404).json({
                message: "Transaction not found. Ensure the transaction ID is correct.",
            });
        }
        return res.status(200).json({
            message: "Transaction updated successfully.",
            result,
        });
    }
    catch (error) {
        console.error("Error editing expense:", error);
        return res.status(500).json({
            message: "Error while updating the transaction.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.editExpense = editExpense;
const getAllExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        // Check if 'type' is passed in the query string
        if (!type) {
            res.status(400).json({ message: "Type is required in the query parameters." });
            return; // Ensure function ends here
        }
        const expense = yield expenseModel_1.default.find({ type });
        res.status(200).json({ expense });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error retrieving expenses",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getAllExpense = getAllExpense;
const getUserExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        // Check if 'id' is passed in the query string
        if (!id) {
            return res.status(400).json({ message: "Id is required in the query parameters." });
        }
        const expense = yield expenseModel_1.default.findById(id);
        // Return the expense 
        return res.status(200).json({ expense });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving expenses",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getUserExpense = getUserExpense;
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
        const transaction = expense.transactions.find(
        //@ts-ignore
        (txn) => txn._id.toString() === transactionId);
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found in the expense." });
        }
        const _a = expense.toObject(), { transactions } = _a, expenseWithoutTransactions = __rest(_a, ["transactions"]);
        return res.status(200).json(Object.assign(Object.assign({}, expenseWithoutTransactions), { transaction }));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error retrieving transaction",
            error: error instanceof Error ? error.message : "Unknown error",
        });
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
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: "userId ID is required in the query parameters." });
    }
    try {
        // Find and update the expense by removing the specific transaction
        const result = yield expenseModel_1.default.findByIdAndDelete(id);
        if (!result) {
            // No user found
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ message: "user deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
exports.deleteUser = deleteUser;
