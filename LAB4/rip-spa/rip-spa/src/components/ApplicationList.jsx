import styled from "styled-components";
import ApplicationItem from "./ApplicationItem.jsx";

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Empty = styled.p`
  color: #c38fb2;
  text-align: center;
`;

function ApplicationList({
  applications,
  onToggle,
  onDelete,
  emptyText = "Заявок поки немає. Додайте першу!",
}) {
  if (applications.length === 0) {
    return <Empty>{emptyText}</Empty>;
  }

  return (
    <List>
      {applications.map((application) => (
        <ApplicationItem
          key={application.id}
          application={application}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}

export default ApplicationList;
