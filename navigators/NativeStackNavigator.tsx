import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from './TabsNavigator';
import ManageExpense from '../screens/ManageExpense';

const Stack = createNativeStackNavigator();

const NativeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExpensesOverview"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ManageExpense" component={ManageExpense} />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
