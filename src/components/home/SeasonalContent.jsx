import styled from 'styled-components';

import SeasonMenu from '@components/home/SeasonMenu';
import ArticleRow from '@components/home/ArticleRow';

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Menus = styled.section`
  height: 7.31rem;

  display: flex;
  gap: 1.12rem;
  overflow: scroll;
`;

const Content = styled.section`
  height: 22.5rem;
  overflow: scroll;

<<<<<<< HEAD
  background-color: #ffffff;
=======
  background-color: white;
>>>>>>> 22bbccbb05719f15e2e39e5457f3527098f41126
`;

const SeasonalContent = () => {
  return (
    <>
      <Container>
        <Menus>
          <SeasonMenu />
          <SeasonMenu />
          <SeasonMenu />
          <SeasonMenu />
          <SeasonMenu />
          <SeasonMenu />
          <SeasonMenu />
          <SeasonMenu />
          <SeasonMenu />
        </Menus>

        <Content>
          <ArticleRow />
          <ArticleRow />
          <ArticleRow />
          <ArticleRow />
          <ArticleRow />
          <ArticleRow />
          <ArticleRow />
          <ArticleRow />
          <ArticleRow />
        </Content>
      </Container>
    </>
  );
};

export default SeasonalContent;
