export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

export interface FormState<T> {
  data: T;
  isLoading: boolean;
  errors: FormErrors;
}

export type LoginFormState = FormState<LoginCredentials>;

export interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  errors: FormErrors;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}