import styled from 'styled-components';

const Container = styled.div`
  width: 6rem;
  height: 6rem;

  border-radius: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: lightgreen;
`;

const SeasonCircle = () => {
  return (
    <Container>
      <div>한자</div>
      <div>입춘</div>
    </Container>
  );
};

export default SeasonCircle;
