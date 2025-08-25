import type { ValidationResult } from '../types/auth.types';

export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: { email?: string; password?: string } = {};
  
  if (!email) {
    errors.email = 'O e-mail é obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = 'E-mail inválido';
  }

  if (!password) {
    errors.password = 'A senha é obrigatória';
  } else if (password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): ValidationResult => {
  const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

  if (!name) {
    errors.name = 'O nome é obrigatório';
  } else if (name.length < 3) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres';
  }

  if (!email) {
    errors.email = 'O e-mail é obrigatório';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = 'E-mail inválido';
  }

  if (!password) {
    errors.password = 'A senha é obrigatória';
  } else if (password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'A confirmação de senha é obrigatória';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'As senhas não coincidem';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
