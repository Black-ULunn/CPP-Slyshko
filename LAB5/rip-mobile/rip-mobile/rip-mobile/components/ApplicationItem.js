import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



function ApplicationItem({ application, onToggle, onDelete }) {
  return (
      <View style={[styles.item, application.done && styles.itemDone]}>
        <TouchableOpacity
            style={styles.info}
            onPress={() => onToggle(application.id)}
        >
          <Text style={[styles.name, application.done && styles.textDone]}>
            {application.name}
          </Text>
          <Text style={[styles.details, application.done && styles.textDone]}>
            {application.phone} · {application.service}
          </Text>
          {application.comment !== "" && (
              <Text style={[styles.details, application.done && styles.textDone]}>
                {application.comment}
              </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(application.id)}
        >
          <Text style={styles.deleteButtonText}>Видалити</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fae4e8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  itemDone: {
    backgroundColor: "#8c5394",
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#72235c",
  },
  details: {
    fontSize: 14,
    color: "#72235c",
    marginTop: 2,
  },
  textDone: {
    textDecorationLine: "line-through",
    color: "#c38fb2",
  },
  deleteButton: {
    backgroundColor: "#a5587c",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: "#e0b4b4",
    fontWeight: "bold",
  },
});

export default ApplicationItem;
