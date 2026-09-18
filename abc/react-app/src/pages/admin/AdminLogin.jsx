import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    const res = login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-body-md antialiased">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-8 md:p-10 shadow-xl relative z-10">
        
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-headline-md text-2xl font-bold tracking-widest text-stone-900 block mb-1">
              OVIYA CERAMICS
            </span>
          </Link>
          <div className="h-0.5 w-16 bg-primary mx-auto mb-3"></div>
          <p className="text-stone-500 text-xs tracking-wider uppercase font-bold">
            Admin Portal Access
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] text-red-500 shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-stone-400 text-[18px]">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sindiajoseph1986@gmail.com"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-3 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-stone-400 text-[18px]">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-3 pl-10 pr-12 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Preset Demo Note */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 flex items-center justify-between">
            <span className="font-medium">Admin Account:</span>
            <span className="font-mono text-primary font-bold">sindiajoseph1986@gmail.com</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-primary hover:bg-red-700 text-white font-bold text-sm rounded-xl uppercase tracking-wider transition-all duration-300 shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer mt-6"
          >
            <span>Sign In To Dashboard</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        {/* Footer Back Link */}
        <div className="mt-8 text-center pt-6 border-t border-stone-100">
          <Link to="/" className="text-stone-500 hover:text-stone-900 text-xs inline-flex items-center gap-1 transition-colors font-medium">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Oviya Ceramics Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
