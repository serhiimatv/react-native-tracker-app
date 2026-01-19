export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export type NewExpense = Omit<Expense, 'id'>;

export type InputValues = {
  [key in keyof NewExpense]: string;
};