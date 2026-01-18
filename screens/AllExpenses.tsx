import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';
const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return <ExpensesOutput expensesPeriod="Total" expenses={expenses} />;
};

export default AllExpenses;
