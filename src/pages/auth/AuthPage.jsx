import React, { useEffect, useContext } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const access_token = localStorage.getItem('access_token');

  if (access_token === null) {
    console.log('액세스 토큰 존재 X');
    // Login Page로 Redirecting 필요
    return <></>;
  } else {
  }

  return <div>Authorizing now...</div>;
};

export default AuthPage;
