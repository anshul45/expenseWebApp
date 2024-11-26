import axios from "axios";

const url = "https://expensewebapp.onrender.com/api";

export const getallExpense = async (type: string) => {
  try {
    const response = await axios.get(`${url}/getexpenses`, {
      params: { type },  
    });

    return response.data.expense;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error; 
  }
};


export const getUserExpense = async (id: string) => {
    try {
      const response = await axios.get(`${url}/getuserexpense`, {
        params: { id },  
      });
  
      return response.data.expense;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error; 
    }
  };

  export const getSingleTransaction = async (transactionId: string) => {
    try {
      const response = await axios.get(`${url}/getSingleTransaction`, {
        params: { transactionId },  
      });
      

      return response.data;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error; 
    }
  };


export const addExpenseUser = async (type: string, users: string[]) => {
 const name = users[0];

  if(type === "individual") users = [];
  try {
    const response = await axios.post(`${url}/addExpenseUser`, {
      name, 
      type,
      users
    });

    return response.data;  
}catch (error: any) {  
  if (error.response) {
    
    console.error("Error adding expense user:", error.response.data.message || error.response.data);
    throw new Error(error.response.data.message || "An error occurred while adding the expense user.");
  } else if (error.message) {
 
    console.error("Error adding expense user:", error.message);
    throw new Error(error.message);
  }
  throw new Error("Unknown error occurred");
}
}

export const addExpense = async(id:string, desc:string, amount:number, paidBy:string, paidTo:any) =>{
  try {
    const response = await axios.post(`${url}/addExpense`, {
      id, 
      desc,
      amount,
      paidBy,
      paidTo
    });

    return response.data;  
}catch (error: any) {  
  if (error.response) {
    
    console.error("Error adding expense user:", error.response.data.message || error.response.data);
    throw new Error(error.response.data.message || "An error occurred while adding the expense user.");
  } else if (error.message) {
 
    console.error("Error adding expense user:", error.message);
    throw new Error(error.message);
  }
  throw new Error("Unknown error occurred");
}
  
}

export const editExpense = async(transactionId:string, desc:string, amount:number, paidBy:string, paidTo:any) =>{
  try {
    const response = await axios.post(`${url}/editExpense`, {
      transactionId, 
      desc,
      amount,
      paidBy,
      paidTo
    });

    return response.data.message;  
}catch (error: any) {  
  if (error.response) {
    
    console.error("Error adding expense user:", error.response.data.message || error.response.data);
    throw new Error(error.response.data.message || "An error occurred while adding the expense user.");
  } else if (error.message) {
 
    console.error("Error adding expense user:", error.message);
    throw new Error(error.message);
  }
  throw new Error("Unknown error occurred");
}
  
}

export const deleteExpense = async(transactionId:string) =>{
  try {
    const response = await axios.delete(`${url}/deleteexpense?transactionId=${transactionId}`);

    return response.data.message;  
}catch (error: any) {  
  if (error.response) {
    
    console.error("Error adding expense user:", error.response.data.message || error.response.data);
    throw new Error(error.response.data.message || "An error occurred while adding the expense user.");
  } else if (error.message) {
 
    console.error("Error adding expense user:", error.message);
    throw new Error(error.message);
  }
  throw new Error("Unknown error occurred");
}
  
}


export const deleteUser = async(id:string) =>{
  try {
    const response = await axios.delete(`${url}/deleteuser?id=${id}`);

    return response.data.message;  
}catch (error: any) {  
  if (error.response) {
    
    console.error("Error adding expense user:", error.response.data.message || error.response.data);
    throw new Error(error.response.data.message || "An error occurred while adding the expense user.");
  } else if (error.message) {
 
    console.error("Error adding expense user:", error.message);
    throw new Error(error.message);
  }
  throw new Error("Unknown error occurred");
}
  
}