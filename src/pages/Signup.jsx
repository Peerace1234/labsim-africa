import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState('');
  const [createdUser, setCreatedUser] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const base = import.meta.env.VITE_API_BASE || '';
      const res = await fetch(base + '/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.error('Signup error', res.status, data);
        setErr(data.error || `Signup failed (${res.status})`);
        return;
      }
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('labsim_hasEntered', '1');
        localStorage.setItem('labsim_activeNav', 'home');
        setCreatedUser(data.user || null);
        setSubmitted(true);
        // show explicit success message for a short time so user sees confirmation
        setTimeout(() => {
          // auto-redirect to app
          window.location.href = '/';
        }, 1400);
      } else {
        setErr(data.error || 'Signup failed');
      }
    } catch (e) {
      console.error('Signup exception', e);
      setErr('Signup failed — network or server error');
    }
  };

  return (
    <div className="page signup-page">
      <div className="signup-hero">
        <div className="signup-inner">
          <h1>Build real skills. Learn by doing.</h1>
          <p className="lead">Join LabSim Africa — hands-on labs, clear course docs, and guided projects. Fast signup, instant access to free courses.</p>
          <form className="signup-form" onSubmit={handleSubmit} aria-label="Signup form">
            <label>
              <span className="sr-only">Full name</span>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
            </label>
            <label>
              <span className="sr-only">Email</span>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" required />
            </label>
            <label>
              <span className="sr-only">Password</span>
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a password" required />
            </label>
            <button type="submit" className="primary-cta">Create account</button>
          </form>

          {err && <div className="signup-error" style={{ color: 'var(--red)', marginTop: 12 }}>{err}</div>}

          {submitted && createdUser && (
            <div className="signup-success" style={{ marginTop: 12 }}>
              <strong>Account created</strong>
              <div style={{ color: 'var(--dim)', marginTop: 6 }}>{createdUser.name} — {createdUser.email}</div>
              <div style={{ color: 'var(--dim)', marginTop: 6 }}>Signing you in…</div>
            </div>
          )}
          {submitted && !createdUser && <div className="signup-success">Welcome! Check your email for next steps.</div>}
        </div>
      </div>
    </div>
  );
}
