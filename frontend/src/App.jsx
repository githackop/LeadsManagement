import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Spinner = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100vh', background: 'var(--bg)',
  }}>
    <div style={{
      width: 40, height: 40,
      border: '3px solid var(--border2)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin .7s linear infinite',
    }} />
  </div>
);

const Guard = ({ type, children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (type === 'private') return user ? children : <Navigate to="/login" replace />;
  return !user ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/"          element={<Navigate to="/login" replace />} />
    <Route path="/login"     element={<Guard type="public"><Login /></Guard>} />
    <Route path="/dashboard" element={<Guard type="private"><Dashboard /></Guard>} />
    <Route path="*"          element={<Navigate to="/login" replace />} />
  </Routes>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
