import { useEffect } from 'react';
import { useLocation } from 'wouter';

function Redirigir() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    if (!token || !id) {
      setLocation('/login');
    }
  }, [setLocation]);

  return null;
}

export default Redirigir;
