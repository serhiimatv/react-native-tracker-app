import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import DatePickerComponent from 'react-native-date-picker';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useState } from 'react';

interface DatePickerProps {
  value: string;
  invalid: boolean;
  style?: StyleProp<ViewStyle>;
  onChange: (date: string) => void;
}

const DatePicker = ({ value, invalid, style, onChange }: DatePickerProps) => {
  const [date, setDate] = useState<Date>(new Date(value));
  const [open, setOpen] = useState(false);

  const dateChangeHandler = (newDate: Date) => {
    const offsetMS = newDate.getTimezoneOffset() * 60000;
    const localDate = new Date(newDate.getTime() - offsetMS);
    onChange(localDate.toISOString());
    setDate(localDate);
    setOpen(false);
  };
  return (
    <>
      <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>Date</Text>
        <Pressable
          style={({ pressed }) => [
            styles.datePressable,
            pressed && styles.pressed,
            invalid && styles.invalidDatePressable,
          ]}
          onPress={() => setOpen(true)}
        >
          <Text style={styles.dateText}>
            {!Number.isNaN(new Date(date).getTime())
              ? getFormattedDate(date)
              : 'YYYY-MM-DD'}
          </Text>
        </Pressable>
      </View>
      <DatePickerComponent
        modal
        mode="date"
        open={open}
        date={!Number.isNaN(new Date(date).getTime()) ? date : new Date()}
        onConfirm={dateChangeHandler}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  datePressable: {
    height: '100%',
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 18,
  },
  pressed: {
    opacity: 0.75,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidDatePressable: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
