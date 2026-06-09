import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const baseStyle = 'w-full py-2.5 px-4 rounded text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm border border-slate-900',
    secondary: 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700',
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;