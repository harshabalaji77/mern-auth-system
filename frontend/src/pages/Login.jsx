import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

const Login = ({ user, login, loading, error, setError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';
  const showRegisterSuccess = location.state?.fromRegister || false;

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
    return () => setError && setError(null);
  }, [user, navigate, from, setError]);

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Login</h2>
          <p className="text-slate-500 text-xs mt-1">Please enter your credentials</p>
        </div>

        {showRegisterSuccess && (
          <div className="mb-4 p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
            Registration successful! Please login below.
          </div>
        )}

        {(apiError || error) && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-xs">
            {apiError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={validationErrors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={validationErrors.password}
            required
          />

          <Button type="submit" loading={loading} className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-slate-900 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;