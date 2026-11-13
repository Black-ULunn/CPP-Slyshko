import { StyleSheet, Text, View } from "react-native";

function Header({ total, done }) {
  return (
      <View>
        <Text style={styles.title}>RIP mobile</Text>
        <Text style={styles.stats}>
          Усього заявок: {total} · Опрацьовано: {done}
        </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fdf4e3",
    textAlign: "center",
    marginBottom: 8,
  },
  stats: {
    fontSize: 16,
    color: "#c38fb2",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Header;
