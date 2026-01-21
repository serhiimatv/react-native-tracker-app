import { useContext, useEffect, useMemo, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
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
      const todayOffset = today.getTimezoneOffset() * 60000;
      const todayLocal = new Date(today.getTime() - todayOffset);
      const date7DaysAgo = new Date(
        todayLocal.getTime() - 7 * 24 * 60 * 60 * 1000,
      );
      const expenseOffset = expense.date.getTimezoneOffset() * 60000;
      const expenseLocal = new Date(expense.date.getTime() - expenseOffset);
      return expenseLocal >= date7DaysAgo && expense.date <= todayLocal;
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
