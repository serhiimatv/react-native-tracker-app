import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from './TabsNavigator';
import ManageExpense from '../screens/ManageExpense';
import { GlobalStyles } from '../constants/styles';

const Stack = createNativeStackNavigator();

const NativeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
