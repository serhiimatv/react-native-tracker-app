import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useMemo } from 'react';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = useMemo(() => {
    return expenses.filter(expense => {
      console.log(expense);
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);
      console.log(expense.date, date7DaysAgo);
      return (
        expense.date.getTime() >= date7DaysAgo.getTime() &&
        expense.date.getTime() <= today.getTime()
      );
    });
  }, [expenses]);

  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />
  );
};

export default RecentExpenses;
