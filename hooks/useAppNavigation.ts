import { NavigationProp, useNavigation } from "@react-navigation/native";

type AppNavigationParamList = {
  ManageExpense: undefined;
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

type AppNavigation = NavigationProp<AppNavigationParamList>;

const useAppNavigation = () => {
  return useNavigation<AppNavigation>();
};

export default useAppNavigation;