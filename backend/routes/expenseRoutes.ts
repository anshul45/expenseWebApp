import express,{Request, Response} from "express"
import { addExpenseUser,addExpense, getAllExpense, getTransactionById,deleteExpense, getUserExpense, editExpense } from "../controllers/expenseController"

const expenseRouter =  express.Router()


expenseRouter.post("/addExpenseUser",addExpenseUser)
expenseRouter.post("/addExpense",addExpense)
expenseRouter.post("/editExpense",editExpense)
expenseRouter.get("/getexpenses", getAllExpense)
expenseRouter.get("/getuserexpense", getUserExpense)
expenseRouter.get("/getSingleTransaction",getTransactionById)
expenseRouter.delete("/deleteexpense",deleteExpense)

export default expenseRouter