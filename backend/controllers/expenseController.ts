import { Request, Response } from "express";
import Expense from "../db/models/expenseModel"


export const addExpenseUser = async (req: Request, res: Response): Promise<Response> => {
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
  } else if (type === "group") {
    if (!users || users.length === 0) {
      return res.status(400).json({
        message: "Invalid input data: For 'group', at least one user must be provided",
      });
    }
  } else {
    return res.status(400).json({ message: "Invalid input data: Type must be 'individual' or 'group'" });
  }
  
  const usersList = type === "individual" ? ["you", name] : ["you", ...users];

  // Create a new Expense
  const newExpense = new Expense({
    name,
    type,
    users: usersList,
    transactions: [],
  });

  try {
    const savedExpense = await newExpense.save();
    return res.json({ message: "Expense user added successfully", expense: savedExpense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error saving ExpenseUser",
      error: error instanceof Error ? error.message : "Unknown error",
    });  
  }
};


export const addExpense = async (req: Request, res: Response): Promise<Response> => {
  const { id, desc, amount, paidBy, paidTo } = req.body;

  try {
    const expense = await Expense.findById(id);

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
    expense.transactions.push(newTransaction as any); 

    await expense.save();

    return res.status(200).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error saving expense",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};



export const editExpense = async (req: Request, res: Response): Promise<Response> => {
  const { transactionId, desc, amount, paidBy, paidTo } = req.body;

  if (!transactionId) {
    return res.status(400).json({ message: "Transaction ID is required in the request body." });
  }

  try {
    // Prepare dynamic update fields
    const updateFields: any = {};
    if (desc) updateFields["transactions.$.desc"] = desc;
    if (amount) updateFields["transactions.$.amount"] = amount;
    if (paidBy) updateFields["transactions.$.paidBy"] = paidBy;

    // For nested `paidTo` updates, overwrite the entire array if provided
    if (paidTo && Array.isArray(paidTo)) {
      updateFields["transactions.$.paidTo"] = paidTo;
    }

    // Update transaction using array filters to match the specific transaction ID
    const result = await Expense.updateOne(
      { "transactions._id": transactionId },
      { $set: updateFields }
    );

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
  } catch (error) {
    console.error("Error editing expense:", error);
    return res.status(500).json({
      message: "Error while updating the transaction.",
      error: error instanceof Error ? error.message : "Unknown error",
    }); 
  }
};


export const getAllExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.query;

    // Check if 'type' is passed in the query string
    if (!type) {
      res.status(400).json({ message: "Type is required in the query parameters." });
      return; // Ensure function ends here
    }

    const expense = await Expense.find({ type });
    res.status(200).json({ expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving expenses",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};



export const getUserExpense = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.query;

    // Check if 'id' is passed in the query string
    if (!id) {
      return res.status(400).json({ message: "Id is required in the query parameters." });
    }

    const expense = await Expense.findById(id);

    // Return the expense 
    return res.status(200).json({ expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error retrieving expenses",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};



export const getTransactionById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { transactionId } = req.query;

        if (!transactionId) {
            return res.status(400).json({ message: "Transaction ID is required in the query parameters." });
        }

        const expense = await Expense.findOne({ "transactions._id": transactionId });

        if (!expense) {
            return res.status(404).json({ message: "Expense or transaction not found." });
        }


        const transaction = expense.transactions.find(
           //@ts-ignore
            (txn) => txn._id.toString() === transactionId
        );

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found in the expense." });
        }

        const { transactions, ...expenseWithoutTransactions } = expense.toObject();

        
        return res.status(200).json({
            ...expenseWithoutTransactions,
            transaction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Error retrieving transaction", 
          error: error instanceof Error ? error.message : "Unknown error",
        }); 
    }
};


export const deleteExpense = async (req: Request, res: Response) => {
    const { transactionId } = req.query;
  
    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required in the query parameters." });
    }
  
    try {
      // Find and update the expense by removing the specific transaction
      const result = await Expense.updateOne(
        { "transactions._id": transactionId }, // Match document containing the transaction
        { $pull: { transactions: { _id: transactionId } } } // Remove the transaction from the array
      );
  
      if (result.modifiedCount === 0) {
        // No transaction found or removed
        return res.status(404).json({ message: "Transaction not found." });
      }
  
      return res.status(200).json({ message: "Transaction deleted successfully." });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };


export const deleteUser = async (req:Request, res:Response) => {
  const { id } = req.query;
  
    if (!id) {
      return res.status(400).json({ message: "userId ID is required in the query parameters." });
    }
  
    try {
      // Find and update the expense by removing the specific transaction
      const result = await Expense.findByIdAndDelete(id);
  
      if (!result) {
        // No user found
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.status(200).json({ message: "user deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
}