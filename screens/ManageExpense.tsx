import { RouteProp } from '@react-navigation/native';
import { Text, View } from 'react-native';
import {
  AppNavigation,
  AppNavigationParamList,
} from '../hooks/useAppNavigation';
import { useLayoutEffect } from 'react';

const ManageExpense = ({
  route,
  navigation,
}: {
  route?: RouteProp<AppNavigationParamList, 'ManageExpense'>;
  navigation?: AppNavigation;
}) => {
  const editedExpenseId = route?.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation?.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);
  return (
    <View>
      <Text>Manage Expense</Text>
    </View>
  );
};

export default ManageExpense;
