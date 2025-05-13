
import { Tarefa } from "@/types/tarefa";

const API_URL = "http://localhost:3001/tasks";

export async function obterTarefas(): Promise<Tarefa[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
}