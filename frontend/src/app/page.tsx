'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) router.push('/tasks');
  }, [router]);

  const handleLogin = () => {
    if (!username.trim()) return alert('Digite um nome de usuário válido');
    localStorage.setItem('usuario', username);
    router.push('/tasks');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">🔐 Login / Registro</h1>
      <input
        type="text"
        placeholder="Digite seu nome de usuário"
        className="border px-4 py-2 rounded w-64 mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
    </main>
  );
}
