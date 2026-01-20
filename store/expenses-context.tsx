import { createContext, useReducer } from 'react';
import { Expense } from '../models/models';
// import uuid from 'react-native-uuid';

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Expense) => void;
  deleteExpense: (id: string) => void;
  setExpenses: (expenses: Expense[]) => void;
}

enum ExpensesActionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  SET = 'SET',
}

interface ExpensesAction {
  type: ExpensesActionType;
  payload: {
    expense?: Expense;
    id?: string;
    expenses?: Expense[];
  };
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  setExpenses: () => {},
});

const expensesReducer = (
  state: Expense[],
  action: ExpensesAction,
): Expense[] => {
  switch (action.type) {
    case 'ADD':
      const newExpense = action.payload?.expense
        ? action.payload.expense
        : null;
      if (newExpense) {
        return [...state, newExpense];
      }
      return state;
    case 'UPDATE':
      const updatedExpense = action.payload?.expense
        ? action.payload.expense
        : null;
      if (updatedExpense) {
        return state.map(expense =>
          expense.id === action.payload.id
            ? { ...expense, ...updatedExpense }
            : expense,
        );
      }
      return state;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload.id);
    case 'SET':
      const revertedExpenses = action.payload?.expenses?.reverse();
      return revertedExpenses ?? [];
    default:
      return state;
  }
};

const ExpensesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expensesState, expensesDispatch] = useReducer(expensesReducer, []);

  const addExpense = (expense: Expense) => {
    expensesDispatch({ type: ExpensesActionType.ADD, payload: { expense } });
  };

  const deleteExpense = (id: string) => {
    expensesDispatch({ type: ExpensesActionType.DELETE, payload: { id } });
  };

  const updateExpense = (id: string, expense: Expense) => {
    expensesDispatch({
      type: ExpensesActionType.UPDATE,
      payload: { id, expense },
    });
  };

  const setExpenses = (expenses: Expense[]) => {
    expensesDispatch({ type: ExpensesActionType.SET, payload: { expenses } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
