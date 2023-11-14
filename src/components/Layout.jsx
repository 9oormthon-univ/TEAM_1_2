import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const Container = styled.div`
  display: flex;
`;

const LogoContainer = styled.div`
  max-width: 53.1875rem;
  padding: 15rem 5rem;
`;

const Logo = styled.div`
  width: 20.875rem;
  height: 11.25rem;

  background: #8c8c8c;
`;

const Title = styled.div`
  font-family: Noto Serif KR;
  font-size: 3.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Introduce = styled.div`
  font-family: AppleSDGothicNeoSB00;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Screen = styled.div`
  position: relative;

  width: 24.375rem;
  height: 52.75rem;

  background-color: gray;
`;

function Layout() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Container>
      {!isMobile && (
        <LogoContainer>
          <Logo></Logo>
          <Title>Seasoning(Logo)</Title>
          <Introduce>24개의 계절을 나의 입맛에 맞게</Introduce>
        </LogoContainer>
      )}
      <Screen />
    </Container>
  );
}

export default Layout;
