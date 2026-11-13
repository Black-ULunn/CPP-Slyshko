import styled from "styled-components";

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${(props) => (props.$done ? "#8c5394" : "#fae4e8")};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  flex: 1;
`;

const Info = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: ${(props) => (props.$done ? "#c38fb2" : "#72235c")};
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
  overflow-wrap: anywhere;
`;

const Name = styled.strong`
  font-size: 16px;
`;

const Details = styled.span`
  font-size: 14px;
`;

const DeleteButton = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: #a5587c;
  color: #e0b4b4;
  cursor: pointer;
  transition: background 2s;

  &:hover {
    background: #7c1954;
  }
`;

function ApplicationItem({ application, onToggle, onDelete }) {
  const { id, name, phone, service, date, comment, done } = application;

  return (
    <Item $done={done}>
      <Label>
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
        />
        <Info $done={done}>
          <Name>{name}</Name>
          <Details>
            {phone} · {service}
            {date ? ` · ${date}` : ""}
          </Details>
          {comment && <Details>{comment}</Details>}
        </Info>
      </Label>
      <DeleteButton type="button" onClick={() => onDelete(id)}>
        Видалити
      </DeleteButton>
    </Item>
  );
}

export default ApplicationItem;
