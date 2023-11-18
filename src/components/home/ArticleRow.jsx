import styled from 'styled-components';

const Container = styled.div`
  height: 5.88rem;
  border-top: 0.03125rem solid #a9a9a9;

  display: flex;
  align-items: center;
`;

const Thumbnail = styled.div`
  min-width: 4.375rem;
  height: 4.375rem;
  border-radius: 0.5rem;

  background-color: lightgreen;
`;

const Description = styled.p``;

const ArticleRow = () => {
  return (
    <Container>
      <Thumbnail></Thumbnail>
      <Description>
        봄은 자연에서 새로운 생명과 활기가 물씬 풍기는 아름다운 계절입니다.
        새로운 잎이 나고 꽃들이 피어나며 새로운 생명이 시작되는 시기이죠. 봄은
        이러한 자연의 신생을 상징하면서 새로운 생명과
      </Description>
    </Container>
  );
};

export default ArticleRow;
