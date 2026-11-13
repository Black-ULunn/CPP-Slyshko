import { FlatList, StyleSheet, Text, View } from "react-native";
import ApplicationItem from "./ApplicationItem";

function ApplicationList({ applications, onToggle, onDelete, header }) {
  return (
      <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <ApplicationItem
                  application={item}
                  onToggle={onToggle}
                  onDelete={onDelete}
              />
          )}
          ListHeaderComponent={
            <View>
              {header}
              <Text style={styles.sectionTitle}>Список заявок</Text>
              {applications.length > 0 && (
                  <Text style={styles.hint}>
                    Торкніться заявки, щоб позначити її опрацьованою.
                  </Text>
              )}
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Заявок поки немає. Додайте першу!</Text>
          }
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
      />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fdf4e3",
    marginBottom: 6,
  },
  hint: {
    fontSize: 13,
    color: "#c38fb2",
    marginBottom: 10,
  },
  empty: {
    color: "#c38fb2",
    textAlign: "center",
    marginTop: 8,
  },
});

export default ApplicationList;
