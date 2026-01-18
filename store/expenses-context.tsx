import { createContext, useReducer } from 'react';
import { Expense } from '../models/models';
import uuid from 'react-native-uuid';

const uuidv4 = uuid.v4;

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
}

enum ExpensesActionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

interface ExpensesAction {
  type: ExpensesActionType;
  payload: {
    expense?: Omit<Expense, 'id'>;
    id?: string;
  };
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
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
        return [...state, { ...newExpense, id: uuidv4() }];
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
    default:
      return state;
  }
};

const DUMMY_EXPENSES: Expense[] = [
  {
    id: uuidv4(),
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: uuidv4(),
    description: 'A pair of trousers',
    amount: 89.99,
    date: new Date('2026-01-14'),
  },
  {
    id: uuidv4(),
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2026-01-12'),
  },
  {
    id: uuidv4(),
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: uuidv4(),
    description: 'Another book',
    amount: 25.99,
    date: new Date('2022-02-18'),
  },
  {
    id: uuidv4(),
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: uuidv4(),
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: uuidv4(),
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: uuidv4(),
    description: 'A book',
    amount: 14.99,
    date: new Date('2026-01-12'),
  },
];

const ExpensesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expensesState, expensesDispatch] = useReducer(
    expensesReducer,
    DUMMY_EXPENSES,
  );

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    expensesDispatch({ type: ExpensesActionType.ADD, payload: { expense } });
  };

  const deleteExpense = (id: string) => {
    expensesDispatch({ type: ExpensesActionType.DELETE, payload: { id } });
  };

  const updateExpense = (id: string, expense: Omit<Expense, 'id'>) => {
    expensesDispatch({
      type: ExpensesActionType.UPDATE,
      payload: { id, expense },
    });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
