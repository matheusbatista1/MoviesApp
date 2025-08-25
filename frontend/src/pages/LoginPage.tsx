import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLogin from '../components/FormLogin';
import type { LoginCredentials } from '../types/auth.types';
import { authService } from '../services/auth.service';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/movies');
    }
  }, [navigate]);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      await authService.login(credentials);
      navigate('/movies');
    },
    [navigate]
  );

  return (
    <div className='flex-1 flex flex-col items-center justify-center w-full py-8'>
      <FormLogin onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;