export interface Transaction {
    amount: number;
    createDate: string;
    desc: string;
    paidBy: string;
    paidTo: { name: string; amount: number; _id: string }[];
    _id: string;
  }
  
  export interface Expense {
    name: string;
    transactions: Transaction[];
    type: "individual" | "group";
    users: string[];
    __v: number;
    _id: string;
  }
  
  export interface ExpensesProps {
    title: "Individual" | "Group";
    expenseData: Expense[];
    refreshData: () => Promise<void>;
  }


  export interface SelectFriendsProps {
    mode: "Individual" | "Group";
    open: boolean; 
    setOpen: (open: boolean) => void; 
    refreshData: () => Promise<void>;
  }
  