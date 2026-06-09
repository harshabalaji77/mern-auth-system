import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

const Register = ({ user, loading: parentLoading, error: parentError, setError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    return () => setError && setError(null);
  }, [user, navigate, setError]);

  const validate = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await authAPI.register(name, email, password);
      navigate('/login', { state: { fromRegister: true } });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Register</h2>
          <p className="text-slate-500 text-xs mt-1">Create a new account</p>
        </div>

        {(apiError || parentError) && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-xs">
            {apiError || parentError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={validationErrors.name}
            required
          />

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

          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={validationErrors.confirmPassword}
            required
          />

          <Button type="submit" loading={loading} className="w-full">
            Register
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;