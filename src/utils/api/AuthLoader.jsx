import axios from 'axios';
import { redirect } from 'react-router-dom';

export const AuthLoader = async ({ request, params }) => {
  /* (Login Page 특정 로직) localStorage에 “access_token” 이 이미 존재하고 Valid한 경우 처리 */
  const access_token = localStorage.getItem('access_token');
  console.log(access_token);
  if (access_token === null) {
    return null;
  }

  console.log(response);

  try {
    const response = await axios.get(`/api/user/profile`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(
      '* Already has Access Token and Valid...! Redirecting to /home'
    );
    return redirect(`/home`);
  } catch (error) {}

  console.log('로그인 처리 중입니다...');

  return redirect(`/home`);
};
