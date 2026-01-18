import { NavigationProp, useNavigation } from "@react-navigation/native";

export type AppNavigationParamList = {
  ManageExpense: { expenseId: string } | undefined;
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

export type AppNavigation = NavigationProp<AppNavigationParamList>;

const useAppNavigation = () => {
  return useNavigation<AppNavigation>();
};

export default useAppNavigation;