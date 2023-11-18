import axios from 'axios';
import { redirect } from 'react-router-dom';

export const FriendsListLoader = async ({ request, params }) => {
  /* (공통 로직) localStorage에 “access_token” 이 존재하지 않는 경우 처리 */
  const access_token = localStorage.getItem('access_token');
  if (access_token === null) {
    console.log('* No Access Token... Redirecting to /login');
    return redirect(`/login`);
  }

  try {
    const response = await axios.get(`/api/friend/list`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return { response };
  } catch (error) {
    console.error(error);
    console.log('* Response Error... Redirecting to /login');
    return redirect(`/login`);
  }

  return null;
};
