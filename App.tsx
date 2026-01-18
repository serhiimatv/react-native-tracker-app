import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import NativeStackNavigator from './navigators/NativeStackNavigator';
import ExpensesContextProvider from './store/expenses-context';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <NativeStackNavigator />
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
};

export default App;
