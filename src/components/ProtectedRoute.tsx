import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const adminEmail = localStorage.getItem('adminEmail');

  if (!adminEmail) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
} 