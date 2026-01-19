import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useMemo } from 'react';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);
      return expense.date >= date7DaysAgo && expense.date <= today;
    });
  }, [expenses]);

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses found for the last 7 days."
    />
  );
};

export default RecentExpenses;
