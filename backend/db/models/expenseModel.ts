import mongoose,{Document, Schema} from "mongoose";

interface IPaidTo {
    name:string;
    amount:number
}


interface ITransaction extends Document{
    desc:string,
    amount:number,
    createDate:Date,
    paidBy:string,
    paidTo:IPaidTo[]
}

interface IExpense extends Document{
    name:string;
    type:string;
    users: string[],
    transactions:ITransaction[];
}


const paidToSchema = new Schema<IPaidTo>({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  });
  


  const transactionSchema = new Schema<ITransaction>({
    desc: { type: String, required: true },
    amount: { type: Number, required: true },
    createDate: { 
      type: Date, 
      default: Date.now,  
      required: true 
    },
    paidBy: { type: String, required: true },
    paidTo: [paidToSchema],  
  });


const expenseSchema = new Schema<IExpense>({
   name:{type:String, required:true},
   type: { 
    type: String, 
    enum: ['individual', 'group'],
    required: true 
  },
  users: {
    type: [String], 
    required: true, 
  },
   transactions:[transactionSchema]
})


const Expense = mongoose.model("Expense",expenseSchema)

export default Expense