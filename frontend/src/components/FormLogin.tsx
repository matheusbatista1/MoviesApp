import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from './ui/InputField';
import Button from './ui/Button';
import type {
  LoginCredentials,
  FormState as LoginFormState,
} from '../types/auth.types';
import { validateLoginForm } from '../utils/validation.utils';

interface FormLoginProps {
  onSubmit?: (credentials: LoginCredentials) => Promise<void>;
}

const initialFormState: LoginFormState = {
  email: '',
  password: '',
  isLoading: false,
  errors: {},
};

const FormLogin = ({ onSubmit }: FormLoginProps) => {
  const [formState, setFormState] = useState<LoginFormState>(initialFormState);
  const { email, password, isLoading, errors } = formState;

  const updateField = (field: keyof LoginCredentials) => (value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = validateLoginForm(email, password);

    if (!validationResult.isValid) {
      setFormState(prev => ({
        ...prev,
        errors: validationResult.errors,
      }));
      return;
    }

    if (onSubmit) {
      try {
        setFormState(prev => ({ ...prev, isLoading: true }));
        await onSubmit({ email, password });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'O login falhou. Por favor, tente novamente.';

        setFormState(prev => ({
          ...prev,
          errors: {
            ...prev.errors,
            submit: errorMessage,
          },
        }));
      } finally {
        setFormState(prev => ({ ...prev, isLoading: false }));
      }
    }
  };

  return (
    <div className='w-[382px] md:w-[412px] min-h-[242px] flex items-center justify-center bg-form-background rounded shadow p-4'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center w-full'
      >
        <InputField
          id='email'
          label='E-mail'
          type='email'
          value={email}
          placeholder='Entre com seu e-mail'
          onChange={updateField('email')}
          error={errors.email}
          disabled={isLoading}
        />

        <div className='mt-4 w-full'>
          <InputField
            id='password'
            label='Senha'
            type='password'
            value={password}
            placeholder='Entre com sua senha'
            onChange={updateField('password')}
            error={errors.password}
            disabled={isLoading}
          />
          <div className='text-left mt-1'>
            <Link
              to='/forgot-password'
              className='text-xs text-button-primary-default hover:text-button-primary-hover underline'
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>

        {errors.submit && (
          <div className='text-input-error text-xs text-center w-full mt-4'>
            {errors.submit}
          </div>
        )}

        <div className='flex items-center justify-end w-[342px] md:w-[380px] mt-8'>
          <Link to='/register' className='mr-2'>
            <Button variant="secondary" type="button" className="w-full">
              Criar conta
            </Button>
          </Link>
          <Button type='submit' disabled={isLoading} className="w-[90px]">
            {isLoading ? 'Fazendo login...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
