import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      setErr('');
      try {
        const base = import.meta.env.VITE_API_BASE || '';
        const res = await fetch(base + '/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.error('Login error', res.status, data);
          setErr(data.error || `Login failed (${res.status})`);
          return;
        }
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        } else {
          setErr(data.error || 'Login failed');
        }
      } catch (e) {
        console.error('Login exception', e);
        setErr('Login failed — network or server error');
      }
    })();
  };

  return (
    <div className="page login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="signup-form" aria-label="Login form">
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <button className="primary-cta" type="submit">Sign in</button>
      </form>
      {err && <div style={{ color: 'var(--red)' }}>{err}</div>}
    </div>
  );
}
