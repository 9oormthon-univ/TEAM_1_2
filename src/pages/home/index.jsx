import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  background-color: blue;
`;

const HomePage = () => {
  return (
    <>
      <Layout>
        <h1>Home page</h1>
      </Layout>
    </>
  );
};

export default HomePage;
