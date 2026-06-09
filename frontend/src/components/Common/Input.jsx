import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  id,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-slate-600 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 bg-white border rounded text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors duration-200 ${
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-slate-250 focus:border-slate-800'
          } ${isPassword ? 'pr-10' : ''}`}
          style={{ borderColor: error ? undefined : '#cbd5e1' }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;