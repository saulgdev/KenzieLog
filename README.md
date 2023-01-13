# KenzieLog

A nossa API é projetada especificamente para gerenciamento logístico, permitindo aos usuários cadastrar suas informações e realizar todo o gerenciamento de suas compras e entregas. Com ela, os usuários podem facilmente acompanhar o status de suas entregas, agendar novas entregas e gerenciar seus pedidos de compra.

# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Tecnologias utilizadas no projeto:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Jest](https://jestjs.io/pt-BR/)

URL base da aplicação:
http://localhost:3000/

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](https://user-images.githubusercontent.com/106371099/212327335-1e4e841a-e870-43af-86d6-40ad671667cb.png)

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Por enquanto, não foi implementada autenticação.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [GET - /users](#12-listando-usuários)
	- [GET - /users/:user_id](#13-listar-usuário-por-id)
    - [PATCH - /users](#14-editar-usuário)
    - [DELETE - /users](#15-deletar-usuário)
- [Requests](#2-requests)
    - [POST - /requests](#21-criação-de-requests)
    - [GET - /requests](#22-listando-requests)
	- [GET - /requests/:request_id](#23-listar-requests-por-id)
    - [GET - /requests/user/:user_id](#24-listar-request-por-id-de-usuário)
    - [PATCH - /requests](#25-editar-request)
    - [DELETE - /requests](#26-deletar-request)
- [Login](#3-login)
    - [POST - /login](#311-login-de-usuário)
---

