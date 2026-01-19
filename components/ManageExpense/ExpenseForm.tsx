import { View, StyleSheet, Text } from 'react-native';
import Input from './Input';
import { useState } from 'react';

import Button from '../UI/Button';
import { NewExpense } from '../../models/models';

const inputValuesKeys = {
  amount: 'amount',
  date: 'date',
  description: 'description',
} as const;

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
}: {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: NewExpense) => void;
}) => {
  const [inputValues, setInputValues] = useState({
    [inputValuesKeys.amount]: '',
    [inputValuesKeys.date]: '',
    [inputValuesKeys.description]: '',
  });

  const inputsChangeHandler = (
    inputIdentifier: (typeof inputValuesKeys)[keyof typeof inputValuesKeys],
    enteredValue: string,
  ) => {
    setInputValues(currentInputValues => ({
      ...currentInputValues,
      [inputIdentifier]: enteredValue,
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: Number(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description,
    } satisfies NewExpense;
    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          keyboardType="decimal-pad"
          value={inputValues.amount}
          onChangeText={inputsChangeHandler.bind(this, inputValuesKeys.amount)}
        />

        <Input
          style={styles.rowInput}
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          value={inputValues.date}
          onChangeText={inputsChangeHandler.bind(this, inputValuesKeys.date)}
        />
      </View>

      <Input
        label="Description"
        multiline
        value={inputValues.description}
        onChangeText={inputsChangeHandler.bind(
          this,
          inputValuesKeys.description,
        )}
      />
      <View style={styles.buttonsContainer}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
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
});
