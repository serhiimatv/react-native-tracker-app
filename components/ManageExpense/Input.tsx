import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface InputProps extends TextInputProps {
  label: string;
  invalid: boolean;
  style?: StyleProp<ViewStyle>;
}

const Input = ({ label, style, invalid, ...textInputProps }: InputProps) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          textInputProps.multiline && styles.inputMultiline,
          invalid && styles.invalidInput,
        ]}
        {...textInputProps}
      />
    </View>
  );
};

export default Input;

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
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
