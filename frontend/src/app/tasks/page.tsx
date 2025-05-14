"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

type Subtarefa = {
  id: string;
  titulo: string;
  finalizada: boolean;
  tarefa: { id: string }; // Corrigido
};

type Tarefa = {
  id: string;
  titulo: string;
  descricao: string;
  concluida: boolean;
  subtarefas?: Subtarefa[];
};

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState<Partial<Tarefa>>({});
  const [usuario, setUsuario] = useState<{ nome: string } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const usuarioData = localStorage.getItem("usuarioLogado");
    if (!usuarioData) {
      router.push("/");
    } else {
      const parsed = JSON.parse(usuarioData);
      setUsuario(parsed);
      carregarTarefas();
    }
  }, [router]);

  const carregarTarefas = async () => {
    try {
      const resTarefas = await fetch("http://localhost:3001/tasks/");
      const tarefas: Tarefa[] = await resTarefas.json();

      const resSubs = await fetch("http://localhost:3001/subtasks/");
      const todasSubtarefas: Subtarefa[] = await resSubs.json();

      const tarefasComSubtarefas = tarefas.map((tarefa) => {
        const subtarefas = todasSubtarefas.filter(
          (sub) => sub.tarefa.id === tarefa.id // Corrigido
        );
        return { ...tarefa, subtarefas };
      });

      setTarefas(tarefasComSubtarefas);
    } catch (error) {
      console.error("Erro ao carregar tarefas ou subtarefas:", error);
    }
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
    const method = modoEdicao ? "PUT" : "POST";
    const url = modoEdicao
      ? `http://localhost:3001/tasks/${tarefaAtual.id}`
      : "http://localhost:3001/tasks";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
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
    if (!confirm("Deseja realmente excluir?")) return;

    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });

    await carregarTarefas();
  };

  const toggleConcluida = async (tarefa: Tarefa) => {
    await fetch(`http://localhost:3001/tasks/${tarefa.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        concluida: !tarefa.concluida,
      }),
    });

    await carregarTarefas();
  };

  const adicionarSubtarefa = async (tarefaId: string) => {
    const titulo = prompt("Título da subtarefa:");
    if (!titulo) return;

    await fetch(`http://localhost:3001/subtasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, tarefaId }),
    });

    await carregarTarefas();
  };

  const toggleSubtarefa = async (sub: Subtarefa) => {
    await fetch(`http://localhost:3001/subtasks/${sub.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...sub, finalizada: !sub.finalizada }),
    });

    await carregarTarefas();
  };

  const excluirSubtarefa = async (id: string) => {
    if (!confirm("Excluir esta subtarefa?")) return;
    await fetch(`http://localhost:3001/subtasks/${id}`, { method: "DELETE" });
    await carregarTarefas();
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-10 border-2 border-gray-200 shadow-xl my-10">
      {usuario && (
        <div className="mb-4 text-gray-700 flex justify-between">
          <div>
            <h1 className="text-3xl">
              Bem-vindo <span className="font-semibold">{usuario.nome}</span>!
            </h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("usuarioLogado");
              router.push("/");
            }}
            className="text-sm text-white mb-4 bg-red-500 py-2 px-4 rounded font-semibold hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      )}

      <h1 className="text-xl font-bold mb-6">Minhas Tarefas</h1>

      <button
        onClick={abrirModalCriar}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
      >
        Adicionar Tarefa
      </button>

      <ul className="space-y-4">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="border-2 border-gray-200 rounded p-4 flex flex-col gap-2 shadow-xl"
          >
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={tarefa.concluida}
                  onChange={() => toggleConcluida(tarefa)}
                />
                <strong className={tarefa.concluida ? "line-through" : ""}>
                  {tarefa.titulo}
                </strong>
                <p className="text-sm text-gray-600">{tarefa.descricao}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => abrirModalEditar(tarefa)}
                  className="text-sm text-white bg-green-500 font-semibold rounded py-2 px-4 hover:bg-green-600 "
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirTarefa(tarefa.id)}
                  className="text-sm text-white bg-red-500 font-semibold rounded py-2 px-4 hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>

            <ul className="mt-2 space-y-1 border-2 border-gray-200 p-4">
              {tarefa.subtarefas?.map((sub) => (
                <li
                  key={sub.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={sub.finalizada}
                      onChange={() => toggleSubtarefa(sub)}
                      className="mr-2"
                    />
                    <span className={sub.finalizada ? "line-through" : ""}>
                      {sub.titulo}
                    </span>
                  </div>
                  <button
                    onClick={() => excluirSubtarefa(sub.id)}
                    className="text-xs text-white bg-red-500 font-semibold rounded py-2 px-3 hover:bg-red-600"
                  >
                    🗑
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => adicionarSubtarefa(tarefa.id)}
                  className="text-xs mb-4 bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
                >
                  Adicionar subtarefa
                </button>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      {/* Modal de Tarefa */}
      <Dialog
        open={modalAberto}
        onClose={fecharModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-lg font-bold">
              {modoEdicao ? "✏️ Editar Tarefa" : "➕ Nova Tarefa"}
            </Dialog.Title>
            <input
              type="text"
              placeholder="Título"
              value={tarefaAtual.titulo || ""}
              onChange={(e) =>
                setTarefaAtual({ ...tarefaAtual, titulo: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Descrição"
              value={tarefaAtual.descricao || ""}
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
                {modoEdicao ? "Salvar" : "Criar"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
