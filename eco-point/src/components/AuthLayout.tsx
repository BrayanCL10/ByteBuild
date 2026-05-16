// src/components/AuthLayout.tsx
// Layout compartido para login y register:
// imagen de Cochabamba a la izquierda, panel blanco a la derecha.

import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div style={{
      display: 'flex', width: '100%', height: '100vh',
      fontFamily: "'Poppins', sans-serif", overflow: 'hidden',
    }}>

      {/* ── LEFT: foto Cochabamba ── */}
      <div style={{ flex: '0 0 68%', position: 'relative', overflow: 'hidden' }}>
        <Image
          src="/imagenes/cochabamba.jpg"
          alt="Vista aérea de Cochabamba"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>

      {/* ── RIGHT: panel auth ── */}
      <div style={{
        flex: '0 0 32%',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
        overflowY: 'auto',
      }}>

        {/* Tabs */}
        <Tabs />

        {/* Formulario (login o register) */}
        <div style={{ padding: '0 28px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>

        {/* Branding inferior */}
        <BottomBrand />
      </div>

    </div>
  );
}

/* ── Tabs — usan links de Next.js ── */
function Tabs() {
  // Detectamos la ruta activa en el componente padre (login/register),
  // por eso exportamos también TabsLogin y TabsRegister desde cada page.
  return null; // los tabs se renderizan dentro de cada page.tsx
}

/* ── Logo Alcaldía + Cocha ── */
export function BottomBrand() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, padding: '16px 28px 22px',
      borderTop: '1px solid #E0E0E6', flexShrink: 0,
    }}>
      {/* Escudo Alcaldía */}
      <svg width="38" height="44" viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 2 L56 12 L56 38 Q56 58 30 68 Q4 58 4 38 L4 12 Z" fill="#1a3a6b" stroke="#c9a227" strokeWidth="2" />
        <path d="M30 8 L50 16 L50 38 Q50 54 30 63 Q10 54 10 38 L10 16 Z" fill="#2a5298" />
        <circle cx="30" cy="32" r="10" fill="none" stroke="#c9a227" strokeWidth="1.5" />
        <line x1="30" y1="22" x2="30" y2="42" stroke="#c9a227" strokeWidth="1" />
        <line x1="20" y1="32" x2="40" y2="32" stroke="#c9a227" strokeWidth="1" />
        <rect x="26" y="38" width="8" height="8" rx="1" fill="#c9a227" />
      </svg>
      <div style={{ fontSize: '0.6rem', color: '#666', lineHeight: 1.3, textAlign: 'center' }}>
        ALCALDÍA DE<br />COCHABAMBA
      </div>

      <div style={{ width: 1, height: 32, background: '#E0E0E6' }} />

      {/* Cocha somos innovación */}
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, fontStyle: 'italic' }}>
          <span style={{ color: '#E84C3D' }}>C</span>
          <span style={{ color: '#F39C12' }}>o</span>
          <span style={{ color: '#27AE60' }}>c</span>
          <span style={{ color: '#2980B9' }}>h</span>
          <span style={{ color: '#8E44AD' }}>a</span>
        </div>
        <div style={{ fontSize: '0.6rem', fontWeight: 500, color: '#888', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          somos innovación
        </div>
      </div>
    </div>
  );
}