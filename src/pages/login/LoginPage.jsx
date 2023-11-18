import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;

  img {
    width: 24.375rem;
    height: 52.75rem;
  }
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
  const CLIENT_ID = 'c574e4572cdf6171c9cb1fe3af45bf75';
  const REDIRECT_URL = 'https://api.seasoning.today/oauth/kakao/login';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

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
