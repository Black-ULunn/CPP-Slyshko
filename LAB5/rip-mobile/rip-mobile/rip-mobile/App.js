import { useState } from "react";
import { Alert, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";

export default function App() {
  const [applications, setApplications] = useState([]);


  function addApplication(data) {
    const name = data.name.trim();
    const phone = data.phone.trim();
    const digits = phone.replace(/\D/g, "");

    if (!name) {
      Alert.alert("Помилка", "Будь ласка, введіть імʼя замовника.");
      return false;
    }
    if (digits.length < 10) {
      Alert.alert(
          "Помилка",
          "Введіть коректний номер телефону (щонайменше 10 цифр)."
      );
      return false;
    }

    const newApplication = {
      id: Date.now().toString(),
      name,
      phone,
      service: data.service,
      comment: data.comment.trim(),
      done: false,
    };
    setApplications((currentApplications) => [
      newApplication,
      ...currentApplications,
    ]);
    Alert.alert("Успіх", "Заявку успішно додано.");
    return true;
  }

  function toggleApplication(id) {
    setApplications((currentApplications) =>
        currentApplications.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item
        )
    );
  }

  function deleteApplication(id) {
    setApplications((currentApplications) =>
        currentApplications.filter((item) => item.id !== id)
    );
    Alert.alert("Видалення", "Заявку видалено.");
  }

  const doneCount = applications.filter((item) => item.done).length;

  return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <ApplicationList
            applications={applications}
            onToggle={toggleApplication}
            onDelete={deleteApplication}
            header={
              <>
                <Header total={applications.length} done={doneCount} />
                <ApplicationForm onAdd={addApplication} />
              </>
            }
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#3d1f34",
  },
});
