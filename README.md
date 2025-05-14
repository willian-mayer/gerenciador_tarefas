# Gerenciador de Tarefas

Este é um aplicativo completo de gerenciamento de tarefas, com **frontend em React (Next.js w/ TypeScript)** e **backend em NestJS**, que permite criar tarefas, adicionar subtarefas, marcá-las como concluídas, editá-las e removê-las. Ideal para organizar sua rotina ou projetos!

---

## 🚀 Funcionalidades

- Criar, listar, editar e remover **tarefas**
- Criar, listar, editar e remover **subtarefas**
- API RESTful documentada com **Swagger**
- Banco de dados local usando **SQLite**
- Interface moderna e responsiva com **Next.js w/ Tailwind CSS**

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (recomendado: versão LTS)
- [npm](https://www.npmjs.com/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

Para instalar o NestJS CLI, use:

```bash
npm install -g @nestjs/cli
```

## Clonar o projeto

Clone este repositório em sua máquina:

```bash
git clone https://github.com/willian-mayer/gerenciador_tarefas.git
cd gerenciador-tarefas
```

## Backend (NestJS)

1. Acesse a pasta do backend:

```bash
cd backend/
```

2. Instale as dependências:

```bash
npm install
```
3. Inicie o servidor de desenvolvimento:

```bash
npm run start:dev
```

O backend estará rodando em: http://locahost:3001


## Frontend (React)

1. Em outro terminal, vá para a pasta do frontend:

```bash
cd frontend/
```

2. Instale as dependências:

```bash
npm install
```
3. Inicie a aplicação:

```bash
npm run dev
```

Para acessar o aplicativo, acesse: http://localhost:3000


## Endpoints úteis

- Ver todas as tarefas: http://localhost:3001/tasks
- Ver todas as subtarefas: http://localhost:3001/subtasks
- Documentação da API (Swagger): http://locahost:3001/api

## Banco de dados


Este projeto usa SQLite como banco local. O arquivo tarefas.db será criado automaticamente na raiz do backend quando o servidor for iniciado pela primeira vez.

## 🙌 Obrigado!