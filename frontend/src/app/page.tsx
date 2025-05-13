import TarefaCard from "@/components/TarefaCard";
import { obterTarefas } from "@/services/tarefaService";
import { Tarefa } from "@/types/tarefa";

export default async function Home() {
  let tarefas: Tarefa[] = [];

  try {
    tarefas = await obterTarefas();
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📋 Lista de Tarefas</h1>

      <div className="grid gap-4">
        {tarefas.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
        ) : (
          tarefas.map((tarefa) => <TarefaCard key={tarefa.id} tarefa={tarefa} />)
        )}
      </div>
    </main>
  );
}