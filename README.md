# CRUD de Produtos

![Static Badge](https://img.shields.io/badge/MySQL-8%2E4%2E5-blue)
![Static Badge](https://img.shields.io/badge/Angular-19%2E2%2E15-red)
![Static Badge](https://img.shields.io/badge/Node-22%2E16%2E0-green)
![Static Badge](https://img.shields.io/badge/Nest-10%2E4%2E9-yellow)
![Static Badge](https://img.shields.io/badge/Tailwind-4%2E1%2E10-violet)

Este é um projeto completo de um CRUD (Criar, Ler, Atualizar, Deletar) de produtos, desenvolvido com **Angular** para o frontend, **NestJS** para o backend e **MySQL** como base de dados. O projeto é orquestrado e executado facilmente utilizando **Docker Compose**.

---

## 🚀 Funcionalidades

- **Listar Produtos**: Visualização de todos os produtos cadastrados.
- **Adicionar Novo Produto**: Formulário para inserção de novos produtos com nome, preço, categoria, descrição e imagem.
- **Editar Produto**: Funcionalidade para atualizar os detalhes de um produto existente.
- **Excluir Produto**: Confirmação de exclusão de um produto.
- **Filtragem por Categoria**: Navegação para a lista de produtos filtrados por categoria.

---

## 🛠️ Tecnologias Utilizadas

- [Angular](https://angular.io/)
- [NestJS](https://nestjs.com/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🐳 Como Executar o Projeto (com Docker Compose)

### Pré-requisitos

- Docker Desktop instalado e configurado.

### Estrutura Esperada do Projeto

```bash
.
├── docker-compose.yml
├── backend/        # Código da aplicação NestJS (com Dockerfile)
├── frontend/       # Código da aplicação Angular (com Dockerfile)
└── db_init/        # Script SQL para inicialização do banco de dados
    └── produtos.sql
```

### Passos para Execução

1. Certifique-se de que o arquivo `produtos.sql` esteja na pasta `db_init/`.

2. No terminal, navegue até a **raiz do projeto** (onde está o `docker-compose.yml`) e execute:

   ```bash
   docker compose up --build -d
   ```

   - `--build`: Garante que as imagens Docker do backend e frontend sejam (re)construídas.
   - `-d`: Executa os contêineres em segundo plano (modo detached).

3. **Primeira Inicialização (ou reset do banco de dados)**:

   Se for a primeira vez executando o projeto ou se quiser reiniciar o banco com o script `produtos.sql`:

   ```bash
   docker compose down -v
   docker compose up --build -d
   ```

---

## 🌐 Acessando a Aplicação

Após a execução bem-sucedida, acesse:

- **Frontend (Angular)**: [http://localhost:4200](http://localhost:4200)
