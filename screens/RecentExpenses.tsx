import { useContext, useEffect, useMemo, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { expenses, setExpenses } = useContext(ExpensesContext);

  const errorHandler = () => {
    setError(null);
  };

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
      try {
        const fetchedExpenses = await fetchExpenses();
        setExpenses(fetchedExpenses);
      } catch (_error) {
        setError('Could not fetch expenses!');
      } finally {
        setIsFetching(false);
      }
    };
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

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
