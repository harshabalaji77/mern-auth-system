import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

const ChangePassword = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await authAPI.changePassword(currentPassword, newPassword);
      setSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setSuccess(null);
        navigate('/dashboard');
      }, 1100);
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to change password';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Change Password</h2>
          <p className="text-slate-500 text-xs mt-1">Update your account password</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            id="currentPassword"
            placeholder="current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="New Password"
            type="password"
            id="newPassword"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            placeholder="confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" loading={loading} className="w-full">
            Change Password
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Want to return?{' '}
          <Link to="/dashboard" className="font-semibold text-slate-900 hover:underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;