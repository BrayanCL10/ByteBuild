'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth';

export default function RegisterForm() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: '', apellido: '', correo: '', ci: '', password: '', confirm: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await signUp(form);
      await signIn(form.correo, form.password);
      router.push('/home');
    } catch (err) {
      setError((err as Error).message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', margin: '28px 0 18px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#6B3FA0', marginBottom: 4 }}>
          Sign Up
        </h2>
        <p style={{ fontSize: '0.75rem', fontWeight: 500, color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          ¡Hola, bienvenido!
        </p>
      </div>

      {/* Nombre */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Nombre</label>
        <div style={inputWrapStyle}>
          <UserIcon />
          <input type="text" placeholder="Tu nombre" value={form.nombre} onChange={set('nombre')} style={inputStyle} required />
        </div>
      </div>

      {/* Apellido */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Apellido</label>
        <div style={inputWrapStyle}>
          <UserIcon />
          <input type="text" placeholder="Tu apellido" value={form.apellido} onChange={set('apellido')} style={inputStyle} required />
        </div>
      </div>

      {/* Correo */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Correo Electrónico</label>
        <div style={inputWrapStyle}>
          <MailIcon />
          <input type="email" placeholder="example@gmail.com" value={form.correo} onChange={set('correo')} style={inputStyle} required />
        </div>
      </div>

      {/* CI */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Carnet de Identidad</label>
        <div style={inputWrapStyle}>
          <UserIcon />
          <input type="text" placeholder="12345678" value={form.ci} onChange={set('ci')} style={inputStyle} required />
        </div>
      </div>

      {/* Contraseña */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Contraseña</label>
        <div style={inputWrapStyle}>
          <LockIcon />
          <input type={showPw ? 'text' : 'password'} placeholder="••••••••••••••" value={form.password} onChange={set('password')} style={inputStyle} required />
          <button type="button" onClick={() => setShowPw(!showPw)} style={eyeBtnStyle}>
            {showPw ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
      </div>

      {/* Confirmar */}
      <div style={fieldStyle}>
        <label style={labelStyle}>Confirmar Contraseña</label>
        <div style={inputWrapStyle}>
          <LockIcon />
          <input type={showPw2 ? 'text' : 'password'} placeholder="••••••••••••••" value={form.confirm} onChange={set('confirm')} style={inputStyle} required />
          <button type="button" onClick={() => setShowPw2(!showPw2)} style={eyeBtnStyle}>
            {showPw2 ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
      </div>

      {error ? (
        <div style={{ color: '#C53030', textAlign: 'center', marginBottom: 12, fontSize: '0.86rem' }}>
          {error}
        </div>
      ) : null}

      {/* Submit */}
      <button type="submit" style={{ ...submitBtnStyle, opacity: loading ? 0.7 : 1 }} disabled={loading}>
        {loading ? 'Cargando...' : 'Crear Cuenta'}
      </button>

      {/* Switch */}
      <p style={{ textAlign: 'center', fontSize: '0.76rem', color: '#888', marginTop: 14 }}>
        ¿Ya tienes cuenta?{' '}
        <span onClick={() => router.push('/login')} style={{ color: '#6B3FA0', fontWeight: 600, cursor: 'pointer' }}>
          Iniciar Sesión
        </span>
      </p>
    </form>
  );
}

/* ── Styles ── */
const fieldStyle: React.CSSProperties = { marginBottom: 11 };
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.78rem', fontWeight: 500, color: '#222', marginBottom: 5,
};
const inputWrapStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center',
  background: '#F8F8FA', border: '1.5px solid #E0E0E6',
  borderRadius: 9, padding: '0 12px', gap: 8,
};
const inputStyle: React.CSSProperties = {
  flex: 1, border: 'none', background: 'transparent',
  padding: '9px 0', fontFamily: 'inherit', fontSize: '0.82rem', color: '#222', outline: 'none',
};
const eyeBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: '#bbb', padding: 0, display: 'flex', alignItems: 'center',
};
const submitBtnStyle: React.CSSProperties = {
  width: '100%', padding: 12, background: '#6B3FA0',
  border: 'none', borderRadius: 10, color: '#fff',
  fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600,
  cursor: 'pointer', boxShadow: '0 4px 16px rgba(107,63,160,0.3)',
};

/* ── Icons ── */
function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}