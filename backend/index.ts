import express,{Request, Response} from "express";
import expenseRouter from "./routes/expenseRoutes";
import {conn} from "./db/connect"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())

app.use("/api",expenseRouter)

app.get("/health", (req:Request,res:Response)=> {
    res.send('Server is healthy!')
})

const port = 3001

app.listen(port, ()=> {
console.log(`Server is listening on port ${port}`)
conn()
})