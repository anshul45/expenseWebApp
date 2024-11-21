import express,{Request, Response} from "express"
import { addExpenseUser,addExpense, getAllExpense, getSingleExpense, getTransactionById,deleteExpense } from "../controllers/expenseController"

const expenseRouter =  express.Router()


expenseRouter.post("/addExpenseUser",addExpenseUser)
expenseRouter.post("/addExpense",addExpense)
expenseRouter.get("/getexpenses", getAllExpense)
expenseRouter.get("/getexpense", getSingleExpense)
expenseRouter.get("/getSingleTransaction",getTransactionById)
expenseRouter.delete("/deleteexpense",deleteExpense)

export default expenseRouter