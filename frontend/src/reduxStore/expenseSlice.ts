import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ExpenseData} from "../assets/ExpenseData.js"

const initialState ={
    data:ExpenseData,
}

const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers :{
    getExpense:(state, action:PayloadAction) => {
       return state.data;
    },
    addUser:(state,action:PayloadAction) => {

    },
    addExpense:(state,action:PayloadAction) => {
        
    },
    deleteExpense:(state,action:PayloadAction) => {
        
    }
    }
})

export const {getExpense} = expenseSlice.actions;

export default expenseSlice.reducer;