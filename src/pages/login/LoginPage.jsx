import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Background = styled.div`
  position: relative;

  img {
    width: 24.375rem;
    height: 52.75rem;
  }

  overflow: hidden;
`;

const KakaoLoginBtn = styled.div`
  position: relative;

  margin-top: -11rem;
  padding: 1rem;

  img {
    width: 22.0625rem;
    height: 3.3125rem;
  }

  :hover {
    cursor: pointer;
  }
`;

function LoginPage() {
  const KAKAO_AUTH_URL = `https://api.seasoning.today/kakao/login`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Background>
      <img src="images/LoginBackground2.png" />
      <KakaoLoginBtn onClick={handleKakaoLogin}>
        <img src="images/KakaoLoginBtn.png" />
      </KakaoLoginBtn>
    </Background>
  );
}

export default LoginPage;
