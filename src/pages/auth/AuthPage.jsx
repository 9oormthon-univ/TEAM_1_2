import React, { useEffect, useContext } from 'react';
import axios from 'axios';

const AuthPage = (props) => {
  const { setToken, setUser } = useContext(Context);

  const request = async () => {
    try {
      const response = await axios.get('/api/login', {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      // 아 모르겠다
      setToken(props.token);
      setUser(response.data);

      // signup으로
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    request();
  });

  return <div>Logging in...</div>;
};

export default AuthPage;
