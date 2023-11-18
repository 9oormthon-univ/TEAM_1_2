import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router-dom';

import TabBar from '@components/common/TabBar';

const Container = styled.div`
  display: flex;
`;

const LogoContainer = styled.div`
  max-width: 53.1875rem;
  padding: 15rem 5rem;
`;

const Logo = styled.div`
  position: relative;
  margin-bottom: 2rem;

  width: 20.875rem;
  height: 11.25rem;

  background: #ffffff;
`;

const ServiceName = styled.div`
  position: relative;
  margin-bottom: 1rem;

  font-family: 'Noto Serif KR', serif;
  font-size: 3.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Introduce = styled.div`
  position: relative;
  text-align: left;

  font-family: 'AppleSDGothicNeoSB00';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Screen = styled.div`
  position: relative;

  width: 24.375rem;
  height: 52.75rem;
  border-radius: 1.5rem;
  overflow: hidden;
`;

const Content = styled.div`
  width: 24.375rem;
  height: calc(52.75rem - 3.8125rem);

  overflow-y: auto;

  background-color: #fff;
`;

function Layout() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Container>
      {!isMobile && (
        <LogoContainer>
          <Logo></Logo>
          <ServiceName>Seasoning(Logo)</ServiceName>
          <Introduce>24개의 계절을 나의 입맛에 맞게</Introduce>
        </LogoContainer>
      )}
      <Screen>
        <Content>
          <Outlet />
        </Content>
        <TabBar />
      </Screen>
    </Container>
  );
}

export default Layout;
