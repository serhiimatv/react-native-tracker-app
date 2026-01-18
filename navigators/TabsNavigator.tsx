import Ionicons from '@react-native-vector-icons/ionicons';
import glyphMap from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import { GlobalStyles } from '../constants/styles';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconButton from '../components/UI/IconButton';
import { useCallback } from 'react';
import { HeaderOptions } from '@react-navigation/elements';

const BottomTabs = createBottomTabNavigator();

const getTabBarIcon = (name: keyof typeof glyphMap) => {
  return ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name} color={color} size={size} />
  );
};

const TabsNavigator = () => {
  const getHeaderRight = useCallback<
    Exclude<HeaderOptions['headerRight'], undefined>
  >(({ tintColor }) => {
    return (
      <IconButton
        icon="add"
        size={24}
        color={tintColor ?? 'white'}
        onPress={() => {}}
      />
    );
  }, []);

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: getHeaderRight,
      }}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: getTabBarIcon('hourglass'),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: getTabBarIcon('calendar'),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default TabsNavigator;
