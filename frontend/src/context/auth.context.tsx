import { createContext, useState, useEffect, type ReactNode } from "react";
import { authService } from "../services/auth.service";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const saveAuthData = (fetchedUser: User, fetchedToken: string) => {
    localStorage.setItem("token", fetchedToken);
    setToken(fetchedToken);
    setUser(fetchedUser);
  };

  const login = async (credentials: LoginCredentials) => {
    const { token, user } = await authService.login(credentials);
    saveAuthData(user, token);
  };

  const register = async (credentials: RegisterCredentials) => {
    const { token, user } = await authService.register(credentials);
    saveAuthData(user, token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const fetchedUser = await authService.getMe();
          setUser(fetchedUser);
        } catch {
          console.error("Token inválido ou expirado. Limpando dados de login.");
          logout();
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
