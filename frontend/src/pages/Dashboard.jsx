import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div className="w-full max-w-3xl mx-auto min-h-[70vh] py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex min-h-full flex-col items-center justify-center text-center space-y-4 px-4 md:px-0">
        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-white text-slate-900 shadow-inner shadow-slate-300/30 flex items-center justify-center text-5xl font-bold ring-4 ring-slate-100">
          <span aria-hidden="true">👋</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Welcome back, {user?.name || 'Guest'}
        </h1>
        <p className="mt-2 text-slate-600 text-sm md:text-base max-w-2xl leading-8">
          We're glad to have you here. Your secure workspace is live and active.
        </p>

        <div className="mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm">
            <p className="text-lg font-semibold text-slate-900">Manage your account</p>
            <p className="mt-2 text-sm text-slate-500">Use the profile menu to change your password or logout when you are finished.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm">
            <p className="text-lg font-semibold text-slate-900">Secure authentication</p>
            <p className="mt-2 text-sm text-slate-500">Your session is protected by a JWT cookie and your account details are secured.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;