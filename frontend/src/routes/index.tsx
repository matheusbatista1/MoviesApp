import { Navigate, Route, Routes } from 'react-router-dom';
import { authService } from '../services/auth.service';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MovieListingPage from '../pages/MovieListingPage';
import MovieDetailPage from '../pages/MovieDetailPage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return authService.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/movies"
        element={
          <PrivateRoute>
            <div><MovieListingPage /></div>
          </PrivateRoute>
        }
      />
      <Route
        path="/filme/:id"
        element={
          <PrivateRoute>
            <MovieDetailPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
