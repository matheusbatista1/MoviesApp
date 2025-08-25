import { useState } from 'react';
import InputField from './ui/InputField';
import Button from './ui/Button';
import type { RegisterCredentials, RegisterFormState } from '../types/auth.types';
import { validateRegisterForm } from '../utils/validation.utils';

interface FormRegisterProps {
  onSubmit?: (credentials: RegisterCredentials) => Promise<void>;
}

const initialFormState: RegisterFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
  errors: {},
};

const FormRegister = ({ onSubmit }: FormRegisterProps) => {
  const [formState, setFormState] = useState<RegisterFormState>(initialFormState);
  const { name, email, password, confirmPassword, isLoading, errors } = formState;

  const updateField = (field: keyof RegisterFormState) => (value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined,
        submit: undefined,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const validationResult = validateRegisterForm(name, email, password, confirmPassword);
    
    if (!validationResult.isValid) {
      setFormState((prev) => ({
        ...prev,
        errors: validationResult.errors,
      }));
      return;
    }

    if (onSubmit) {
      try {
        setFormState((prev) => ({ ...prev, isLoading: true }));
        await onSubmit({ name, email, password, confirmPassword });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'O cadastro falhou. Por favor, tente novamente.';
          
        setFormState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            submit: errorMessage,
          },
        }));
      } finally {
        setFormState((prev) => ({ ...prev, isLoading: false }));
      }
    }
  };

  return (
    <div className="w-[382px] md:w-[412px] min-h-[342px] flex items-center justify-center bg-form-background rounded shadow p-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
        <InputField
          id="name"
          label="Nome"
          type="text"
          value={name}
          placeholder="Digite seu nome"
          onChange={updateField('name')}
          error={errors.name}
          disabled={isLoading}
        />
        <InputField
          id="email"
          label="E-mail"
          type="email"
          value={email}
          placeholder="Digite seu e-mail"
          onChange={updateField('email')}
          error={errors.email}
          disabled={isLoading}
        />
        <InputField
          id="password"
          label="Senha"
          type="password"
          value={password}
          placeholder="Digite sua senha"
          onChange={updateField('password')}
          error={errors.password}
          disabled={isLoading}
        />
        <InputField
          id="confirmPassword"
          label="Confirme sua senha"
          type="password"
          value={confirmPassword}
          placeholder="Digite sua senha novamente"
          onChange={updateField('confirmPassword')}
          error={errors.confirmPassword}
          disabled={isLoading}
        />
        
        {errors.submit && (
          <div className="text-input-error text-xs text-center w-full">
            {errors.submit}
          </div>
        )}

        <div className="flex items-center justify-between w-[342px] md:w-[380px] mt-8">
          <a
            href="/login"
            className="text-xs underline text-button-primary-default hover:text-button-primary-hover"
          >
            Já possui conta? Faça login
          </a>
          <Button type="submit" disabled={isLoading} className="w-auto">
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
