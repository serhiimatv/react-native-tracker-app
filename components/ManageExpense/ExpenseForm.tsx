import { View, StyleSheet, Text } from 'react-native';
import Input from './Input';
import { useState } from 'react';

import Button from '../UI/Button';
import { Expense, NewExpense } from '../../models/models';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';
import DatePicker from './DatePicker';

const inputValuesKeys = {
  amount: 'amount',
  date: 'date',
  description: 'description',
} as const;

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}: {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: NewExpense) => void;
  defaultValues?: Expense;
}) => {
  const [input, setInputs] = useState({
    [inputValuesKeys.amount]: {
      value: defaultValues?.amount.toString() ?? '',
      isValid: true,
    },
    [inputValuesKeys.date]: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    [inputValuesKeys.description]: {
      value: defaultValues?.description ?? '',
      isValid: true,
    },
  });

  const inputsChangeHandler = (
    inputIdentifier: (typeof inputValuesKeys)[keyof typeof inputValuesKeys],
    enteredValue: string,
  ) => {
    setInputs(currentInputValues => ({
      ...currentInputValues,
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true,
      },
    }));
  };

  const dateChangeHandler = (date: string) => {
    inputsChangeHandler(inputValuesKeys.date, date);
  };

  const submitHandler = () => {
    const expenseData = {
      amount: Number(input.amount.value.replace(',', '.')),
      date: new Date(input.date.value),
      description: input.description.value,
    } satisfies NewExpense;

    const isAmountValid =
      !Number.isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = !Number.isNaN(expenseData.date.getTime());
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setInputs(currentInputs => ({
        [inputValuesKeys.amount]: {
          value: currentInputs.amount.value,
          isValid: isAmountValid,
        },
        [inputValuesKeys.date]: {
          value: currentInputs.date.value,
          isValid: isDateValid,
        },
        [inputValuesKeys.description]: {
          value: currentInputs.description.value,
          isValid: isDescriptionValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          keyboardType="decimal-pad"
          value={input.amount.value}
          onChangeText={inputsChangeHandler.bind(this, inputValuesKeys.amount)}
          invalid={!input.amount.isValid}
        />
        <DatePicker
          value={input.date.value}
          invalid={!input.date.isValid}
          style={styles.rowInput}
          onChange={dateChangeHandler}
        />
      </View>

      <Input
        label="Description"
        multiline
        value={input.description.value}
        onChangeText={inputsChangeHandler.bind(
          this,
          inputValuesKeys.description,
        )}
        invalid={!input.description.isValid}
      />
      <View style={styles.errorContainer}>
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered values
          </Text>
        )}
      </View>
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
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowInput: {
    flex: 1,
  },
  errorContainer: {
    height: 40,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
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
