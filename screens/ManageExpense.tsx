import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import {
  AppNavigation,
  AppNavigationParamList,
} from '../hooks/useAppNavigation';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { NewExpense } from '../models/models';
import {
  storeExpense,
  updateExpense as updateExpenseHttp,
  deleteExpense as deleteExpenseHttp,
} from '../util/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({
  route,
  navigation,
}: {
  route?: RouteProp<AppNavigationParamList, 'ManageExpense'>;
  navigation?: AppNavigation;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpensesContext);

  const editedExpenseId = route?.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = useMemo(() => {
    const foundExpense = expenses.find(
      expense => expense.id === editedExpenseId,
    );
    return foundExpense;
  }, [expenses, editedExpenseId]);

  const errorHandler = () => {
    setError(null);
  };

  const deleteExpenseHandler = async () => {
    if (editedExpenseId) {
      setIsSubmitting(true);
      try {
        await deleteExpenseHttp(editedExpenseId);
        deleteExpense(editedExpenseId);
        navigation?.goBack();
      } catch (_error) {
        setError('Could not delete expense - please try again later');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const cancelHandler = () => {
    navigation?.goBack();
  };

  const submitHandler = async (expenseData: NewExpense) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, { ...expenseData, id: editedExpenseId });
        await updateExpenseHttp(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation?.goBack();
    } catch (_error) {
      setError('Could not save expense - please try again later');
    } finally {
      setIsSubmitting(false);
    }
  };

  useLayoutEffect(() => {
    navigation?.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior='position' style={styles.screen}>
      <ExpenseForm
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={submitHandler}
      />
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteIconContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
