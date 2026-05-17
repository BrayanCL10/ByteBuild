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
          src="/imagenes/cachabamba.png"
          alt="Vista aérea de Cochabamba"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 2, pointerEvents: 'none' }}>
          <Image
            src="/imagenes/logo-recipoint.png"
            alt="ReciPoint"
            width={140}
            height={140}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
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
      gap: 16, padding: '18px 28px 22px',
      borderTop: '1px solid #E0E0E6', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src="/imagenes/logo-gamc.png" alt="Alcaldía de Cochabamba" width={48} height={48} />
        </div>

        <div style={{ width: 1, height: 36, background: '#E0E0E6' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            <span style={{ color: '#E84C3D' }}>C</span>
            <span style={{ color: '#F39C12' }}>o</span>
            <span style={{ color: '#27AE60' }}>c</span>
            <span style={{ color: '#2980B9' }}>h</span>
            <span style={{ color: '#8E44AD' }}>a</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 600, color: '#555', lineHeight: 1.1, textTransform: 'uppercase' }}>
            <span style={{ letterSpacing: '0.08em' }}>somos</span>
            <span style={{ letterSpacing: '0.08em' }}>innovación</span>
          </div>
        </div>
      </div>
    </div>
  );
}