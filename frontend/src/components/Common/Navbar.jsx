import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, User } from 'lucide-react';

const Navbar = ({ user, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center gap-2 group">
          MernAuth
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[0.65rem] font-semibold text-white">
                  {getInitials(user?.name)}
                </span>
                <span className="hidden sm:inline-block text-slate-800">{user?.name}</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-black/5">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="mt-2 text-sm font-semibold text-slate-900">{user?.name}</p>
                    <p className="truncate text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <div className="flex flex-col py-2">
                    <Link
                      to="/change-password"
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Change password
                      </div>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;