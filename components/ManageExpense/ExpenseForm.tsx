import { View, StyleSheet, Text } from 'react-native';
import Input from './Input';
import { useState } from 'react';

const inputValuesKeys = {
  amount: 'amount',
  date: 'date',
  description: 'description',
} as const;

const ExpenseForm = () => {
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
  container: {
    padding: 16,
  },
});
