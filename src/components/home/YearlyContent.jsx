import styled from 'styled-components';

import SeasonCircle from '@components/home/SeasonCircle';

import yearly_line from '@assets/yearly_line.png';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;

  background-image: url(${yearly_line});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Row = styled.div`
  margin: 0.8rem 0;

  display: flex;
  justify-content: center;
  gap: 1.31rem;
`;

const LastRow = styled.div`
  margin: 0.8rem 0;
  margin-right: 5rem;

  display: flex;
  justify-content: right;
`;

const YearlyContent = () => {
  return (
    <>
      <Container>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <Row>
          <SeasonCircle />
          <SeasonCircle />
          <SeasonCircle />
        </Row>
        <LastRow>
          <SeasonCircle />
        </LastRow>
      </Container>
    </>
  );
};

export default YearlyContent;
