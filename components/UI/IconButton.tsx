import { Ionicons } from '@react-native-vector-icons/ionicons';
import glyphMap from '@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import { Pressable, StyleSheet, View } from 'react-native';

const IconButton = ({
  icon,
  size,
  color,
  onPress,
}: {
  icon: keyof typeof glyphMap;
  size: number;
  color: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
