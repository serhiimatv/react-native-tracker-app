import { RouteProp } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import {
  AppNavigation,
  AppNavigationParamList,
} from '../hooks/useAppNavigation';
import { useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';

const ManageExpense = ({
  route,
  navigation,
}: {
  route?: RouteProp<AppNavigationParamList, 'ManageExpense'>;
  navigation?: AppNavigation;
}) => {
  const editedExpenseId = route?.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const deleteExpenseHandler = () => {
    console.log('delete expense');
  };

  const cancelHandler = () => {
    navigation?.goBack();
  };

  const confirmHandler = () => {
    console.log('confirm');
  };

  useLayoutEffect(() => {
    navigation?.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button mode="flat" style={styles.button} onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteIconContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteIconContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
