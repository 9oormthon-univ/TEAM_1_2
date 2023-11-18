import styled from 'styled-components';

const Container = styled.div`
  width: 6rem;
  height: 6rem;

  border-radius: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

<<<<<<< HEAD
  background-color: lightgreen;
=======
  background-color: #eeeeee;
>>>>>>> 22bbccbb05719f15e2e39e5457f3527098f41126
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
