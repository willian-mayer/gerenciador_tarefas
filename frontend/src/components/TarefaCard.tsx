import { Tarefa } from "@/types/tarefa";

interface Props {
  tarefa: Tarefa;
}

export default function TarefaCard({ tarefa }: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition">
      <h2 className="text-xl font-semibold">
        {tarefa.titulo} {tarefa.concluida && "✅"}
      </h2>
      <p className="text-gray-600 mt-1">{tarefa.descricao}</p>
      <div className="text-xs text-gray-400 mt-2">
        Criado: {new Date(tarefa.criadoEm).toLocaleString()}<br />
        Atualizado: {new Date(tarefa.atualizadoEm).toLocaleString()}
      </div>
    </div>
  );
}