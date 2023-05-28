import { useEffect, useState } from 'react';

export default (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') ?? '');

  useEffect(() => {
    if (!token) {
      return localStorage.removeItem('token');
    }

    localStorage.setItem('token', token);
  }, [token]);

  return [token, setToken];
};
