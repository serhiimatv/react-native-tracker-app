import { useContext, useEffect, useMemo, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const { expenses, setExpenses } = useContext(ExpensesContext);

  const recentExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);
      return expense.date >= date7DaysAgo && expense.date <= today;
    });
  }, [expenses]);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      const fetchedExpenses = await fetchExpenses();
      setIsFetching(false);
      setExpenses(fetchedExpenses);
    };
    getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses found for the last 7 days."
    />
  );
};

export default RecentExpenses;
