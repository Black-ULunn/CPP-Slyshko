import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./components/Header.jsx";
import ApplicationForm from "./components/ApplicationForm.jsx";
import ApplicationList from "./components/ApplicationList.jsx";

const STORAGE_KEY = "rip-applications";


function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const Page = styled.div`
  min-height: 100vh;
  padding: 32px 16px;
`;

const Card = styled.main`
  max-width: 760px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;
  background: #c783b0;
  box-shadow: 0 8px 24px rgba(60, 20, 92, 0.43);
`;

const Message = styled.p`
  margin: 0 0 16px;
  font-weight: bold;
  color: ${(props) => (props.$type === "error" ? "#751818" : "#138e40")};
`;

const Filters = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FilterField = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px 14px;
  border: 1px solid #744261;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
`;

const FilterSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #744261;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
  background: #eed0ea;
`;

function App() {
  const [applications, setApplications] = useState(loadApplications);
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch {}
  }, [applications]);

  function addApplication(data) {
    const name = data.name.trim();
    const phone = data.phone.trim();
    const digits = phone.replace(/\D/g, "");

    if (!name) {
      setMessage({ text: "Введіть імʼя замовника.", type: "error" });
      return false;
    }
    if (digits.length < 10) {
      setMessage({
        text: "Введіть коректний номер телефону (щонайменше 10 цифр).",
        type: "error",
      });
      return false;
    }

    const newApplication = {
      id: Date.now(),
      name,
      phone,
      service: data.service,
      date: data.date,
      comment: data.comment.trim(),
      done: false,
    };
    setApplications([...applications, newApplication]);
    setMessage({ text: "Заявку успішно додано.", type: "success" });
    return true;
  }

  function toggleApplication(id) {
    setApplications(
      applications.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function deleteApplication(id) {
    setApplications(applications.filter((item) => item.id !== id));
    setMessage({ text: "Заявку успішно видалено.", type: "success" });
  }

  const doneCount = applications.filter((item) => item.done).length;

  const query = search.trim().toLowerCase();
  const visibleApplications = applications.filter((item) => {
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.comment.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "done" && item.done) ||
      (statusFilter === "new" && !item.done);
    return matchesSearch && matchesStatus;
  });

  const isFiltered = query !== "" || statusFilter !== "all";
  const emptyText =
    applications.length > 0 && isFiltered
      ? "За вашим запитом нічого не знайдено."
      : undefined;

  return (
    <Page>
      <Card>
        <Header total={applications.length} done={doneCount} />
        <ApplicationForm onAdd={addApplication} />
        {message && <Message $type={message.type}>{message.text}</Message>}
        <Filters>
          <FilterField
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Пошук за імʼям, телефоном чи коментарем"
            aria-label="Пошук"
          />
          <FilterSelect
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Фільтр за статусом"
          >
            <option value="all">Усі заявки</option>
            <option value="new">Нові</option>
            <option value="done">Опрацьовані</option>
          </FilterSelect>
        </Filters>
        <ApplicationList
          applications={visibleApplications}
          onToggle={toggleApplication}
          onDelete={deleteApplication}
          emptyText={emptyText}
        />
      </Card>
    </Page>
  );
}

export default App;
