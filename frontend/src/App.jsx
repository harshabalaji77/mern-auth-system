import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { authAPI } from './services/api';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChangePassword from './pages/ChangePassword';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        const profile = await authAPI.getProfile();
        setUser(profile);
        localStorage.setItem('auth_user', JSON.stringify(profile));
      } catch (err) {
        setUser(null);
        localStorage.removeItem('auth_user');
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.login(email, password);
      setUser(data);
      localStorage.setItem('auth_user', JSON.stringify(data));
      return data;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout request failed on backend');
    } finally {
      setUser(null);
      localStorage.removeItem('auth_user');
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Routes>
          <Route
            path="/login"
            element={
              <main className="flex-grow flex items-center justify-center p-4">
                <Login
                  user={user}
                  login={login}
                  loading={loading}
                  error={error}
                  setError={setError}
                />
              </main>
            }
          />
          <Route
            path="/register"
            element={
              <main className="flex-grow flex items-center justify-center p-4">
                <Register
                  user={user}
                  loading={loading}
                  error={error}
                  setError={setError}
                />
              </main>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <div className="flex flex-col min-h-screen">
                  <Navbar user={user} logout={logout} />
                  <main className="flex-grow p-6 md:p-8">
                    <Dashboard user={user} logout={logout} />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <ProtectedRoute user={user} loading={loading}>
                <div className="flex flex-col min-h-screen">
                  <main className="flex-grow p-6 md:p-8 flex items-center justify-center">
                    <ChangePassword user={user} />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;