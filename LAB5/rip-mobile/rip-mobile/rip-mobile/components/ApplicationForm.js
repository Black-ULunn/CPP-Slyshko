import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const SERVICES = [
  "Поховання",
  "Кремація",
  "Ритуальний зал",
  "Транспорт",
  "Памʼятники",
  "Інше",
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  service: SERVICES[0],
  comment: "",
};

function ApplicationForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function changeField(field, value) {
    setForm({ ...form, [field]: value });
  }

  function handleAdd() {
    const added = onAdd(form);
    if (added) {
      setForm(EMPTY_FORM);
    }
  }

  return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Додати заявку</Text>

        <TextInput
            style={styles.input}
            placeholder="Імʼя замовника"
            value={form.name}
            onChangeText={(text) => changeField("name", text)}
            returnKeyType="next"
        />
        <TextInput
            style={styles.input}
            placeholder="Телефон, напр. 0501234567"
            value={form.phone}
            onChangeText={(text) => changeField("phone", text)}
            keyboardType="phone-pad"
        />

        <Text style={styles.label}>Послуга</Text>
        <View style={styles.services}>
          {SERVICES.map((service) => (
              <TouchableOpacity
                  key={service}
                  style={[styles.chip, form.service === service && styles.chipActive]}
                  onPress={() => changeField("service", service)}
              >
                <Text
                    style={[
                      styles.chipText,
                      form.service === service && styles.chipTextActive,
                    ]}
                >
                  {service}
                </Text>
              </TouchableOpacity>
          ))}
        </View>

        <TextInput
            style={styles.input}
            placeholder="Коментар"
            value={form.comment}
            onChangeText={(text) => changeField("comment", text)}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Додати заявку</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#c783b0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#3c145c",
    shadowOpacity: 0.43,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3d1f34",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ac69b2",
    backgroundColor: "#eed0ea",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#72235c",
    marginBottom: 6,
  },
  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#ac69b2",
    backgroundColor: "#eed0ea",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipActive: {
    backgroundColor: "#8c5394",
    borderColor: "#8c5394",
  },
  chipText: {
    fontSize: 14,
    color: "#72235c",
  },
  chipTextActive: {
    color: "#fdf4e3",
  },
  addButton: {
    backgroundColor: "#fefde7",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginTop: 2,
  },
  addButtonText: {
    color: "#8c5394",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ApplicationForm;
