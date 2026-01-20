import axios from "axios";
import { Expense, NewExpense } from "../models/models";

const BACKEND_URL = 'https://react-native-trackerapp-73c72-default-rtdb.europe-west1.firebasedatabase.app/';

export const storeExpense = async (expenseData: NewExpense) => {
  const response = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
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

export const updateExpense = (id: string, expenseData: NewExpense) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData)
}

export const deleteExpense = async (id: string) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`)
}