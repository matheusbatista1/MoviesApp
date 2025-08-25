import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormRegister from '../components/FormRegister';
import { authService } from '../services/auth.service';
import type { RegisterCredentials } from '../types/auth.types';

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/movies');
    }
  }, [navigate]);

  const handleRegister = useCallback(async (credentials: RegisterCredentials) => {
    try {
      await authService.register(credentials);
      navigate('/movies');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Ocorreu um erro inesperado');
    }
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full py-8">
      <FormRegister onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;