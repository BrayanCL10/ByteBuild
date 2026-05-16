// src/app/register/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import RegisterForm from '@/components/RegisterForm';
import { BottomBrand } from '@/components/AuthLayout';

export default function RegisterPage() {
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

      {/* ── RIGHT: panel ── */}
      <div style={{
        flex: '0 0 32%', background: '#fff',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
        overflowY: 'auto',
      }}>

        {/* Tabs */}
        <div style={{
          display: 'flex', margin: '28px 28px 0',
          background: '#F5F5F7', borderRadius: 10,
          padding: 4, gap: 4, flexShrink: 0,
        }}>
          <span style={{
            flex: 1, padding: '9px 0', borderRadius: 7,
            background: '#6B3FA0', border: 'none',
            fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 500,
            color: '#fff', textAlign: 'center', display: 'block',
            boxShadow: '0 2px 10px rgba(107,63,160,0.3)',
          }}>
            Crear Cuenta
          </span>
          <Link href="/login" style={{
            flex: 1, padding: '9px 0', borderRadius: 7,
            background: 'transparent', border: 'none',
            fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 500,
            color: '#888', cursor: 'pointer', textAlign: 'center',
            textDecoration: 'none', display: 'block',
          }}>
            Iniciar Sesión
          </Link>
        </div>

        {/* Formulario */}
        <div style={{ padding: '0 28px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <RegisterForm />
        </div>

        <BottomBrand />
      </div>

    </div>
  );
}