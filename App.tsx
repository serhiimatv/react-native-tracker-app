import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import NativeStackNavigator from './navigators/NativeStackNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <NativeStackNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
