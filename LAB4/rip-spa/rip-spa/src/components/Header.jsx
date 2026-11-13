import styled from "styled-components";

const Title = styled.h1`
  margin: 0 0 8px;
  color: #fdf4e3;
  text-align: center;
`;

const Stats = styled.p`
  margin: 0 0 24px;
  color: #8c5394;
  text-align: center;
`;

function Header({ total, done }) {
  return (
    <header>
      <Title>RIP — заявки</Title>
      <Stats>
        Усього заявок: {total} · Опрацьовано: {done}
      </Stats>
    </header>
  );
}

export default Header;
