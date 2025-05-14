'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Usuario = {
  nome: string;
  username: string;
  senha: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [modo, setModo] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({
    nome: '',
    username: '',
    senha: '',
    confirmarSenha: '',
  });

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) router.push('/tasks');
  }, [router]);

  const getUsuarios = (): Usuario[] => {
    const data = localStorage.getItem('usuarios');
    return data ? JSON.parse(data) : [];
  };

  const salvarUsuarios = (usuarios: Usuario[]) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  };

  const registrar = () => {
    const { nome, username, senha, confirmarSenha } = form;
    if (!nome || !username || !senha || !confirmarSenha) {
      return alert('Preencha todos os campos');
    }

    if (senha !== confirmarSenha) {
      return alert('As senhas não coincidem');
    }

    const usuarios = getUsuarios();
    if (usuarios.find((u) => u.username === username)) {
      return alert('Nome de usuário já existe');
    }

    const novoUsuario: Usuario = { nome, username, senha };
    salvarUsuarios([...usuarios, novoUsuario]);
    localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
    router.push('/tasks');
  };

  const login = () => {
    const { username, senha } = form;
    if (!username || !senha) {
      return alert('Preencha o usuário e senha');
    }

    const usuarios = getUsuarios();
    const usuario = usuarios.find(
      (u) => u.username === username && u.senha === senha
    );

    if (!usuario) {
      return alert('Usuário ou senha inválidos');
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    router.push('/tasks');
  };

  const handleSubmit = () => {
    if (modo === 'login') login();
    else registrar();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">
        {modo === 'login' ? '🔐 Login' : '📝 Registrar'}
      </h1>

      {modo === 'register' && (
        <input
          type="text"
          placeholder="Nome"
          className="border px-4 py-2 rounded w-64 mb-2"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
      )}

      <input
        type="text"
        placeholder="Usuário"
        className="border px-4 py-2 rounded w-64 mb-2"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        type="password"
        placeholder="Senha"
        className="border px-4 py-2 rounded w-64 mb-2"
        value={form.senha}
        onChange={(e) => setForm({ ...form, senha: e.target.value })}
      />

      {modo === 'register' && (
        <input
          type="password"
          placeholder="Confirmar Senha"
          className="border px-4 py-2 rounded w-64 mb-2"
          value={form.confirmarSenha}
          onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })}
        />
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-64 hover:bg-blue-700"
      >
        {modo === 'login' ? 'Entrar' : 'Registrar'}
      </button>

      <button
        onClick={() => {
          setModo(modo === 'login' ? 'register' : 'login');
          setForm({ nome: '', username: '', senha: '', confirmarSenha: '' });
        }}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        {modo === 'login'
          ? 'Não tem conta? Registrar-se'
          : 'Já tem conta? Fazer login'}
      </button>
    </main>
  );
}
