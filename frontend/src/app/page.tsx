'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

type Tarefa = {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
};

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState<Partial<Tarefa>>({});

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    const res = await fetch('http://localhost:3001/tasks/');
    const data = await res.json();
    setTarefas(data);
  };

  const abrirModalCriar = () => {
    setModoEdicao(false);
    setTarefaAtual({});
    setModalAberto(true);
  };

  const abrirModalEditar = (tarefa: Tarefa) => {
    setModoEdicao(true);
    setTarefaAtual(tarefa);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTarefaAtual({});
  };

  const salvarTarefa = async () => {
    const method = modoEdicao ? 'PUT' : 'POST';
    const url = modoEdicao
      ? `http://localhost:3001/tasks/${tarefaAtual.id}`
      : 'http://localhost:3001/tasks';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: tarefaAtual.titulo,
        descricao: tarefaAtual.descricao,
      }),
    });

    if (res.ok) {
      await carregarTarefas();
      fecharModal();
    }
  };

  const excluirTarefa = async (id: string) => {
    if (!confirm('Deseja realmente excluir?')) return;

    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    });

    await carregarTarefas();
  };

  const toggleConcluida = async (tarefa: Tarefa) => {
    await fetch(`http://localhost:3001/tasks/${tarefa.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...tarefa,
        concluida: !tarefa.concluida,
      }),
    });

    await carregarTarefas();
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📋 Minhas Tarefas</h1>

      <button
        onClick={abrirModalCriar}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Nova Tarefa
      </button>

      <ul className="space-y-4">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <input
                type="checkbox"
                className="mr-2"
                checked={tarefa.concluida}
                onChange={() => toggleConcluida(tarefa)}
              />
              <strong className={tarefa.concluida ? 'line-through' : ''}>
                {tarefa.titulo}
              </strong>
              <p className="text-sm text-gray-600">{tarefa.descricao}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => abrirModalEditar(tarefa)}
                className="text-sm text-green-600 hover:underline"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => excluirTarefa(tarefa.id)}
                className="text-sm text-red-600 hover:underline"
              >
                🗑 Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      <Dialog open={modalAberto} onClose={fecharModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-lg font-bold">
              {modoEdicao ? '✏️ Editar Tarefa' : '➕ Nova Tarefa'}
            </Dialog.Title>
            <input
              type="text"
              placeholder="Título"
              value={tarefaAtual.titulo || ''}
              onChange={(e) =>
                setTarefaAtual({ ...tarefaAtual, titulo: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Descrição"
              value={tarefaAtual.descricao || ''}
              onChange={(e) =>
                setTarefaAtual({ ...tarefaAtual, descricao: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={fecharModal}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={salvarTarefa}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {modoEdicao ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
