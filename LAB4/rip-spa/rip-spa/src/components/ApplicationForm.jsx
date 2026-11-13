import { useState } from "react";
import styled from "styled-components";

const SERVICES = [
  "Організація поховання",
  "Кремація",
  "Ритуальний зал",
  "Транспорт",
  "Памʼятники та благоустрій",
  "Інше",
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  service: SERVICES[0],
  date: "",
  comment: "",
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const fieldStyles = `
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #ac69b2;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
  background: #eed0ea;
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Select = styled.select`
  ${fieldStyles}
`;

const Textarea = styled.textarea`
  ${fieldStyles}
  min-height: 70px;
  resize: vertical;
`;

const AddButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: #fefde7;
  color: #8c5394;
  font-size: 16px;
  cursor: pointer;
  transition: background 2s;

  &:hover  {
    background: #fea8ea;
    color: #fdf4e3;
    border-color: #fdfcfc;
  }
`;

function ApplicationForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const added = onAdd(form);
    if (added) {
      setForm(EMPTY_FORM);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Імʼя замовника"
          aria-label="Імʼя замовника"
        />
        <Input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Телефон, напр. +380501234567"
          aria-label="Телефон"
        />
      </Row>
      <Row>
        <Select
          name="service"
          value={form.service}
          onChange={handleChange}
          aria-label="Послуга"
        >
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </Select>
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          aria-label="Бажана дата"
        />
      </Row>
      <Textarea
        name="comment"
        value={form.comment}
        onChange={handleChange}
        placeholder="Коментар (необовʼязково)"
        aria-label="Коментар"
      />
      <AddButton type="submit">Додати заявку</AddButton>
    </Form>
  );
}

export default ApplicationForm;
