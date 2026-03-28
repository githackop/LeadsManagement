import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';


const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
    <path d="M4 14L14 4L24 14L14 24L4 14Z" fill="url(#lg1)" opacity=".9" />
    <path d="M8 14L14 8L20 14L14 20L8 14Z" fill="url(#lg2)" />
    <defs>
      <linearGradient id="lg1" x1="4" y1="4" x2="24" y2="24">
        <stop stopColor="#6c63ff" /><stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
      <linearGradient id="lg2" x1="8" y1="8" x2="20" y2="20">
        <stop stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#a78bfa" stopOpacity=".4" />
      </linearGradient>
    </defs>
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeOnIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);


const validate = (mode, form) => {
  const e = {};
  if (mode === 'register' && !form.name.trim())
    e.name = 'Full name is required';
  if (!form.email.trim())
    e.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'Enter a valid email address';
  if (!form.password)
    e.password = 'Password is required';
  else if (form.password.length < 6)
    e.password = 'Minimum 6 characters required';
  return e;
};


const Login = () => {
  const [mode,    setMode]    = useState('login');
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [srvErr,  setSrvErr]  = useState('');
  const [busy,    setBusy]    = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSrvErr('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(mode, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setBusy(true);
    try {
      mode === 'login'
        ? await login(form.email, form.password)
        : await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setSrvErr(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const flipMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setForm({ name: '', email: '', password: '' });
    setErrors({});
    setSrvErr('');
  };

  return (
    <div className="login-root">
      {/* Animated background */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="grid-bg" />

      {/* ── Left panel ── */}
      <aside className="left-panel">
        <div className="lp-logo">
          <div className="lp-logo-icon"><LogoIcon /></div>
          <span>Leads Management</span>
        </div>

        <div className="lp-body">
          <div className="lp-tag">✦ All-in-one workspace</div>
          <h1 className="lp-heading">
            Manage leads,<br />
            <span className="lp-highlight">tasks & teams</span><br />
            effortlessly.
          </h1>
          <p className="lp-sub">Your command center for smarter workflows and faster deals.</p>

          <ul className="feature-list">
            {['Real-time lead tracking', 'Team task management', 'Analytics & insights'].map((f, i) => (
              <li key={f} style={{ animationDelay: `${i * 0.12}s` }}>
                <span className="feat-dot" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-stats">
          {[['128', 'Active Leads'], ['47', 'Open Tasks'], ['23', 'Team Members']].map(([num, lbl]) => (
            <div className="lp-stat-chip" key={lbl}>
              <span className="lp-stat-num">{num}</span>
              <span className="lp-stat-lbl">{lbl}</span>
            </div>
          ))}
        </div>
      </aside>

 
      <main className="right-panel">
        <div className="form-card">
          <div className="form-header">
            <h2>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
            <p>{mode === 'login' ? 'Sign in to your workspace' : 'Start your free workspace today'}</p>
          </div>

          {srvErr && (
            <div className="alert-error">
              <span>⚠</span> {srvErr}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">

    
            {mode === 'register' && (
              <div className={`form-group ${errors.name ? 'has-error' : ''}`} style={{ animation: 'fadeUp .3s ease' }}>
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon"><UserIcon /></span>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
            )}

            {/* Email */}
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon"><MailIcon /></span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon"><LockIcon /></span>
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button type="button" className="eye-toggle" onClick={() => setShowPwd(p => !p)}>
                  {showPwd ? <EyeOffIcon /> : <EyeOnIcon />}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary" disabled={busy}>
              {busy
                ? <span className="btn-spinner" />
                : mode === 'login' ? 'Sign In →' : 'Create Account →'
              }
            </button>
          </form>

          <p className="mode-switch">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button type="button" onClick={flipMode}>
              {mode === 'login' ? ' Sign up' : ' Sign in'}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
