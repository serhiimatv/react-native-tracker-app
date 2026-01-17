import { FlatList } from 'react-native';
import { Expense } from '../../models/models';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = ({ item }: { item: Expense }) => {
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
