import axios from "axios";
import { Expense, NewExpense } from "../models/models";

const BACKEND_URL = 'https://react-native-trackerapp-73c72-default-rtdb.europe-west1.firebasedatabase.app/';

export const storeExpense = (expenseData: NewExpense) => {
  axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
}

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses: Expense[] = [];

  for (const key in response.data) {
    const expenseData = response.data[key];
    expenses.push({
      id: key,
      amount: expenseData.amount,
      date: new Date(expenseData.date),
      description: expenseData.description,
    });
  }
  return expenses;
}