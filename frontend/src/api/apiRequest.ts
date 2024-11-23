import axios from "axios";

const url = "http://localhost:3001/api";

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


export const addExpenseUser = async (type: string, name: string) => {
  try {
    const response = await axios.post(`${url}/addExpenseUser`, {
      name, 
      type
    });

    return response.data;  
}catch (error) {
    console.error("Error adding expense user:", error.response ? error.response.data : error.message);
    throw error;
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
}catch (error) {
    console.error("Error adding expense user:", error.response ? error.response.data : error.message);
    throw error;
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

    return response.message;  
}catch (error) {
    console.error("Error adding expense user:", error.response ? error.response.data : error.message);
    throw error;
  }  
  
}

export const deleteExpense = async(transactionId:string) =>{
  try {
    const response = await axios.delete(`${url}/deleteexpense?transactionId=${transactionId}`);

    return response.message;  
}catch (error) {
    console.error("Error adding expense user:", error.response ? error.response.data : error.message);
    throw error;
  }  
  
}