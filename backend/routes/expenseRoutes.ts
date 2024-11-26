import express,{Request, Response} from "express"
import { addExpenseUser,addExpense, getAllExpense, getTransactionById,deleteExpense, getUserExpense, editExpense, deleteUser } from "../controllers/expenseController"

const expenseRouter =  express.Router()

//@ts-ignore
expenseRouter.post("/addExpenseUser",addExpenseUser)
//@ts-ignore
expenseRouter.post("/addExpense",addExpense)
//@ts-ignore
expenseRouter.post("/editExpense",editExpense)
//@ts-ignore
expenseRouter.get("/getexpenses", getAllExpense)
//@ts-ignore
expenseRouter.get("/getuserexpense", getUserExpense)
//@ts-ignore
expenseRouter.get("/getSingleTransaction",getTransactionById)
//@ts-ignore
expenseRouter.delete("/deleteexpense",deleteExpense)
//@ts-ignore
expenseRouter.delete("/deleteUser",deleteUser)

export default expenseRouter