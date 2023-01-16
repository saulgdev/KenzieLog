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
https://kenzie-log.onrender.com

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
	- [GET - /users/:user_id](#13-listando-usuários-por-id)
    - [PATCH - /users](#14-editando-usuários-por-id)
    - [DELETE - /users](#15-deletando-usuários-por-id)
- [Requests](#2-requests)
    - [POST - /requests](#21-criação-de-requests)
    - [GET - /requests](#22-listando-requests)
	- [GET - /requests/:request_id](#23-listar-requests-por-id)
    - [GET - /requests/user/:user_id](#24-listar-request-por-id-de-usuário)
    - [PATCH - /requests](#25-editar-request)
    - [DELETE - /requests](#26-deletar-request)
- [Login](#3-login)
    - [POST - /login](#31-login-de-usuário)
---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário.                            |
| password   | string | A senha de acesso do usuário                    |
| isAdm      | boolean | Define se um usuário é administrador ou não.   |
| isActive   | boolean | Define se um usuário está ativo ou não.        |
| createdAt  | Date | Data de criação do usuário.           		|	
| updatedAt  | Date | Data de atualização do usuário.		        |
| Address    | Object | Informações do endereço do usuário.             |

### Endpoints

| Método   | Rota       | Descrição                               		 |
|----------|------------|--------------------------------------------------------|
| POST     | /users     | Criação de um usuário.                 		 |
| GET      | /users     | Lista todos os usuários                		 |
| GET      | /users/:user_id | Lista um usuário por ID                           |
| PATCH    | /users/:user_id | Edita Informações de um usuário por ID            |
| DELETE   | /users/:user_id | Deleta um usuário por ID                          |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: https://kenzie-log.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
  "name": "Marcio",
  "email": "marcio@mail.com",
  "isAdm": true,
  "password": "123456",
  "address": {
    "district": "Rua Santa Ana",
    "zipCode": "26054188",
    "number": "21",
    "city": "Rio de Janeiro",
    "state": "RJ",
  },
}
```

### Schema de Validação com Yup:
```javascript
  name: yup.string().required().max(72),
  email: yup.string().email().required().max(256),
  password: yup.string().required().max(65),
  isAdm: yup.boolean().required(),
  address: yup.object({
    district: yup.string().required(),
    zipCode: yup.string().required().max(8),
    number: yup.string().notRequired(),
    city: yup.string().required(),
    state: yup.string().required().max(2),
  }),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
  "id": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e",
  "name": "Marcio",
  "email": "marcio@mail.com",
  "isAdm": true,
  "isActive": true,
  "createdAt": "16/01/2023"
  "updatedAt": "16/01/2023"
  "address": {
    "id": "f0d55281-8ac8-4bc0-b5d0-78ab521e1f93"
    "district": "Rua Santa Ana",
    "zipCode": "26054188",
    "number": "21",
    "city": "Rio de Janeiro",
    "state": "RJ",
  },
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 409 Conflict   | Email already registered.     |
| 400 Bad Requiest | Missing fields.             |

---

### 1.2. **Listando Usuários**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
200 OK
```
```json
[
  {
    "id": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e",
    "name": "Marcio",
    "email": "marcio@mail.com",
    "isAdm": true,
    "isActive": true,
    "createdAt": "16/01/2023",
    "updatedAt": "16/01/2023",
    "addressId": "f0d55281-8ac8-4bc0-b5d0-78ab521e1f93"
  }
]
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token.     |
| 401 Unauthorized   | Bad Request.              |

---

### 1.3. **Listando Usuários por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users/6baa58b7-1bdd-42aa-bb5c-4f89377e153e
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
200 OK
```
```json
{
  "id": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e",
  "name": "Marcio",
  "email": "marcio@mail.com",
  "isAdm": true,
  "isActive": true,
  "createdAt": "16/01/2023",
  "updatedAt": "16/01/2023",
  "addressId": "f0d55281-8ac8-4bc0-b5d0-78ab521e1f93"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token.     |
| 404 Not found      | User not found.           |

---

### 1.4. **Editando Usuários por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
PATCH /users/6baa58b7-1bdd-42aa-bb5c-4f89377e153e
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin / User
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
  "email": "editingmail@mail.com"
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
  "id": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e",
  "name": "Marcio",
  "email": "editingmail@mail.com",
  "isAdm": true,
  "isActive": true,
  "createdAt": "16/01/2023",
  "updatedAt": "16/01/2023",
  "addressId": "f0d55281-8ac8-4bc0-b5d0-78ab521e1f93"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token.     |
| 403 Forbidden      | Unauthorized.             |
| 401 Unauthorized      | User not found.        |
---

### 1.5. **Deletando Usuários por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
DELETE /users/6baa58b7-1bdd-42aa-bb5c-4f89377e153e
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin / User
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
204 No Content
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token.     |
| 404 Not found      | User not found.           |

---

---

## 3. **Login**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Login é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| email      | string | O e-mail do usuário.                            |
| password   | string | A senha de acesso do usuário                    |

### Endpoints

| Método   | Rota       | Descrição                               		 |
|----------|------------|--------------------------------------------------------|
| POST     | /login     | Login de um usuário.                 		 |

---

### 3.1. **Login de usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/login`

### Exemplo de Request:
```
POST /login
Host: https://kenzie-log.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
  "email":"marcio@mail.com"
  "password":"123456"
}
```
### Exemplo de Response:
```
200 Ok
```
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 403 Forbidden      | Wrong email/password.     |
| 400 Bad Request    | User not found.           |




