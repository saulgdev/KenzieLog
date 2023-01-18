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

![DER](https://i.imgur.com/Jg2nhMU.png)

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
    - [PATCH - /users/:user_id](#14-editando-usuários-por-id)
    - [DELETE - /users/:user_id](#15-deletando-usuários-por-id)
- [Requests](#2-requests)
    - [POST - /requests](#21-criação-de-pedidos)
    - [GET - /requests](#22-listando-pedidos)
    - [GET - /requests/:request_id](#23-listando-pedidos-por-id)
    - [GET - /requests/user/:user_id](#24-listando-pedidos-por-id-de-usuário)
    - [PATCH - /requests](#25-editando-pedidos)
    - [DELETE - /requests](#26-deletando-pedidos)
- [Login](#3-login)
    - [POST - /login](#31-login-de-usuário)
- [Company](#4-users)
    - [POST - /company](#41-criação-de-unidade)
    - [GET - /company](#42-listando-unidade)
    - [GET - /company/:company_id](#43-listando-unidade-por-id)
    - [PATCH - /company/:company_id](#44-editando-unidade-por-id)
    - [DELETE - /company/:company_id](#45-deletando-unidade-por-id)
- [Vehicles](#5-users)
    - [POST - vehicles/company/:company_id](#51-registro-de-veículo)
    - [GET - vehicles/company/:company_id](#52-listando-veículos)
    - [DELETE - vehicles/:vehicle_id](#53-deletando-veículo-por-id)
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

### `/users/:user_id`

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

### `/users/:user_id`

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

### `/users/:user_id`

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

## 2. **Requests**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Request é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| status     | string | O e-mail do usuário.                            |
| weight     | number | A senha de acesso do usuário                    |
| cubicMeters | number | Define se um usuário é administrador ou não.   |
| deadline   | Date | Define se um usuário está ativo ou não.         	|
| createdAt  | Date | Data de criação do usuário.           		|	
| updatedAt  | Date | Data de atualização do usuário.		        |

### Endpoints

| Método   | Rota       | Descrição                               		   |
|----------|------------|----------------------------------------------------------|
| POST     | /requests     | Criação de um pedido.                 		   |
| GET      | /requests     | Lista todos os pedidos.                		   |
| GET      | /requests/user/:user_id | Lista todos os pedidos de um usuário por ID |
| GET      | /requests/:request_id | Lista um pedido por ID             	   |
| PATCH    | /requests/:request_id | Edita um pedido por ID               	   |
| DELETE   | /requests/:request_id | Deleta um pedido por ID                   	   |

---

### 2.1. **Criação de pedidos**

[ Voltar para os Endpoints ](#5-endpoints)

### `/requests`

### Exemplo de Request:
```
POST /requests
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
  "userId": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e",
  "name": "Package Name",
  "weight": 80,
  "cubicMeters": 3,
  "distance": 128
}
```

### Schema de Validação com Yup:
```javascript
  name: yup.string(),
  status: yup.string(),
  deadline: yup.string(),
  weight: yup.number(),
  cubicMeters: yup.number()
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:	
```
201 Created
```

```json
{
  "id": "894c3b8e-4a32-4398-8c37-36c4d75f66c1",
  "name": "Package Name",
  "weight": 80,
  "cubicMeters": 3,
  "deadline": "27/02/2023"
  "createdAt": "16/02/2023"
  "updatedAt": "16/02/2023"
  "user": {
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
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized | Invalid token.     	 |
| 409 Conflict | Request already exists.         |
| 404 Not Found | User not exists.               |

---

### 2.2. **Listando Pedidos**

[ Voltar para os Endpoints ](#5-endpoints)

### `/requests`

### Exemplo de Request:
```
GET /requests
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
    "id": "894c3b8e-4a32-4398-8c37-36c4d75f66c1",
    "name": "Package name",
    "status": "pending",
    "weight": 80,
    "cubicMeters": 3,
    "deadline": "27/02/2023",
    "createdAt": "16/02/2023",
    "updatedAt": "16/02/2023",
    "userId": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e"
  }
]
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token.     |
| 401 Unauthorized   | Not authorized.           |

---

### 2.3. **Listando pedidos por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/requests/:request_id`

### Exemplo de Request:
```
GET /requests/894c3b8e-4a32-4398-8c37-36c4d75f66c1
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| request_id  | string      | Identificador único do pedido (Request) |

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
  "id": "894c3b8e-4a32-4398-8c37-36c4d75f66c1",
  "name": "Package name",
  "status": "pending",
  "weight": 80,
  "cubicMeters": 3,
  "deadline": "27/02/2023",
  "createdAt": "16/02/2023",
  "updatedAt": "16/02/2023",
  "userId": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token.     |
| 404 Not found      | Request not found.        |

---

### 2.4. **Listando pedidos por ID de usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/requests/user/:user_id`

### Exemplo de Request:
```
GET /requests/user/6baa58b7-1bdd-42aa-bb5c-4f89377e153e
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token
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
[
  {
    "id": "894c3b8e-4a32-4398-8c37-36c4d75f66c1",
    "name": "Package name",
    "status": "pending",
    "weight": 80,
    "cubicMeters": 3,
    "deadline": "27/02/2023",
    "createdAt": "16/02/2023",
    "updatedAt": "16/02/2023"
  }
]
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token.     |
| 403 Forbidden      | Unauthorized.             |
| 401 Unauthorized   | User not found.           |
---

### 2.5. **Editando Pedidos**

[ Voltar para os Endpoints ](#5-endpoints)

### `/requests/:request_id`

### Exemplo de Request:
```
PATCH /requests/894c3b8e-4a32-4398-8c37-36c4d75f66c1
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin / User
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| request_id  | string      | Identificador único do pedido (Request) |

### Corpo da Requisição:
```json
{
  "status": "delivered"
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
  "id": "894c3b8e-4a32-4398-8c37-36c4d75f66c1",
  "name": "Package name",
  "status": "delivered",
  "weight": 80,
  "cubicMeters": 3,
  "deadline": "27/02/2023",
  "createdAt": "16/02/2023",
  "updatedAt": "16/02/2023",
  "userId": "6baa58b7-1bdd-42aa-bb5c-4f89377e153e"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Invalid bearer token / Not authorization.  |
| 404 Not Found      | Request not found.        |

---

### 2.6. **Deletando Pedidos**

[ Voltar para os Endpoints ](#5-endpoints)

### `/requests/:request_id`

### Exemplo de Request:
```
DELETE /requests/894c3b8e-4a32-4398-8c37-36c4d75f66c1
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin / User
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| request_id  | string      | Identificador único do pedido (Request) |

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
| 404 Not found  | Request not found.     	 |
| 400 Bad request | Request already delete.      |

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

---

## 4. **Company**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Company é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único da unidade.                 |
| name       | string | O nome da unidade.                              |
| openingTime | string | Horário de abertura da unidade.                |
| cnpj       | string | Cnpj da unidade.                                |
| isActive   | boolean | Define se uma unidade está ativa ou não.       |
| createdAt  | Date | Data de criação da unidade.           		    |	
| updatedAt  | Date | Data de atualização da unidade.		            |
| address    | Object | Informações do endereço da unidade.             |
| contacts   | Object | Informações dos contatos da unidade.            |
| vehicles   | Array  | Informações do veículos registrados na unidade. |

### Endpoints

| Método   | Rota       | Descrição                               		         |
|----------|------------|--------------------------------------------------------|
| POST     | /company     | Criação de uma unidade.                 		     |
| GET      | /company     | Lista todos as unidades.                		     |
| GET      | /company/:company_id | Lista uma unidade por ID                     |
| PATCH    | /company/:company_id | Edita Informações de uma unidade por ID      |
| DELETE   | /company/:company_id | Desativa uma unidade por ID                  |

---

### 4.1. **Criação de Unidade**

[ Voltar para os Endpoints ](#5-endpoints)

### `/company`

### Exemplo de Request:
```
POST /company
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Corpo da Requisição:
```json
{
  "name": "Unidade carioca",
  "openingTime": "09:00 às 18:00",
  "cnpj": "42.607.321/0001-15",
  "address": {
    "district": "Rua Candelária",
    "zipCode": "21754188",
    "number": "500",
    "city": "Rio de Janeiro",
    "state": "RJ"
  },
  "contacts": {
    "phoneNumber": "21983751995"
    "email": "agenciacarioca@mail.com"
  }
}
```

### Schema de Validação com Yup:
```javascript
  name: yup.string().required(),
  openingTime: yup.string().required(),
  cnpj: yup.string().required(),
  address: yup
    .object({
      district: yup.string().required(),
      zipCode: yup.string().max(8).required(),
      number: yup.string().notRequired(),
      city: yup.string().required(),
      state: yup.string().max(2).required(),
    })
    .required(),
  contacts: yup
    .object({
      phoneNumber: yup.string().required(),
      email: yup.string().required(),
    })
    .required(),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
    "id": "3a2bb25f-d20e-495a-925a-245541e9b460",
    "name": "Unidade carioca",
    "openingTime": "09:00 às 18:00",
    "cnpj": "42.607.321/0001-15",
    "address": {
    	"id": "775b52a7-c728-4691-ab87-c06352dbc5b9",
    	"district": "Rua Candelária",
    	"zipCode": "21754188",
    	"number": "500",
    	"city": "Rio de Janeiro",
    	"state": "RJ"
    },
    "contacts": {
    	"id": "f56f163e-93f6-4f75-bf82-f02631029d60",
    	"phoneNumber": "21983751995",
    	"email": "agenciacarioca@mail.com"
    },
    "isActive": true,
    "createdAt": "2023-01-18T17:52:34.166Z",
    "updatedAt": "2023-01-18T17:52:34.166Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized | Is not admin.               |
| 400 Bad Request | Missing fields.              |
| 400 Bad Request | Cnpj/Address/Contact is already registered. |
---

### 4.2. **Listando Unidade**

[ Voltar para os Endpoints ](#5-endpoints)

### `/company`

### Exemplo de Request:
```
GET /company
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
    "id": "3a2bb25f-d20e-495a-925a-245541e9b460",
    "name": "Unidade carioca",
    "isActive": true,
    "openingTime": "09:00 às 18:00",
    "cnpj": "42.607.321/0001-15",
    "createdAt": "2023-01-18T17:52:34.166Z",
    "updatedAt": "2023-01-18T17:52:34.166Z",
    "address": {
    	"id": "775b52a7-c728-4691-ab87-c06352dbc5b9",
    	"district": "Rua Candelária",
    	"zipCode": "21754188",
    	"number": "500",
    	"city": "Rio de Janeiro",
    	"state": "RJ"
    },
    "contacts": {
    	"id": "f56f163e-93f6-4f75-bf82-f02631029d60",
    	"phoneNumber": "21983751995",
    	"email": "agenciacarioca@mail.com"
    },
  }
]
```

### Possíveis Erros:
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized | Is not admin.               |

---

### 4.3. **Listando Unidade por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/company/:company_id`

### Exemplo de Request:
```
GET /users/3a2bb25f-d20e-495a-925a-245541e9b460
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| company_id  | string      | Identificador único da unidade (Company) |

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
    "id": "3a2bb25f-d20e-495a-925a-245541e9b460",
    "name": "Unidade carioca",
    "isActive": true,
    "openingTime": "09:00 às 18:00",
    "cnpj": "42.607.321/0001-15",
    "createdAt": "2023-01-18T17:52:34.166Z",
    "updatedAt": "2023-01-18T17:52:34.166Z",
    "address": {
    	"id": "775b52a7-c728-4691-ab87-c06352dbc5b9",
    	"district": "Rua Candelária",
    	"zipCode": "21754188",
    	"number": "500",
    	"city": "Rio de Janeiro",
    	"state": "RJ"
    },
    "contacts": {
    	"id": "f56f163e-93f6-4f75-bf82-f02631029d60",
    	"phoneNumber": "21983751995",
    	"email": "agenciacarioca@mail.com"
    },
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Is not admin.             |
| 404 Not found      | Company not found.        |

---

### 4.4. **Editando unidade por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/company/:company_id`

### Exemplo de Request:
```
PATCH /company/3a2bb25f-d20e-495a-925a-245541e9b460
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| company_id  | string      | Identificador único da unidade (Company) |

### Corpo da Requisição:
```json
{
    "openingTime": "11:00 às 15:00"
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
    "id": "41eb5a29-80b8-430b-b8aa-e4825a0664d4",
    "openingTime": "11:00 às 15:00",
    "updatedAt": "2023-01-18T17:52:34.166Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized   | Is not admin.             |
| 404 Not found      | Company not found.        |
| 400 Bad Request    | Missing fields.           |
---

### 4.5. **Deletando unidade por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/company/:company_id`

### Exemplo de Request:
```
DELETE /company/3a2bb25f-d20e-495a-925a-245541e9b460
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| company_id  | string      | Identificador único da unidade (Company) |

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
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized   | Is not admin.             |
| 404 Not found      | Company not found.        |

---

## 5. **Vehicles**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Vehicles é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do veículo.                 |
| name       | string | O nome do veículo.                              |
| sign       | string | Placa do veículo.                               |
| type       | string | Tipo do veículo                                 |
| companyWorkPlace | Object | Informações da unidade em que o veículo pertence. |

### Endpoints

| Método   | Rota       | Descrição                               		         |
|----------|------------|--------------------------------------------------------|
| POST     | /vehicles/company/:company_id | Registro de uma veículo pertencente a uma unidade.  |
| GET      | /vehicles/company/:company_id | Lista todos os veículos pertencentes a uma unidade.  |
| DELETE   | /vehicles/:vehicle_id | Deleta o registro do veículo                |

---

### 5.1. **Registro de veículo**

[ Voltar para os Endpoints ](#5-endpoints)

### `/vehicles/company/:company_id`

### Exemplo de Request:
```
POST /vehicles/company/3a2bb25f-d20e-495a-925a-245541e9b460
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| company_id  | string      | Identificador único da unidade (Company) |

### Corpo da Requisição:
```json
{
    "name": "Fiat Strada 1.6",
    "sign": "JDK-1832",
    "type": "Utilitário"
}
```

### Schema de Validação com Yup:
```javascript
  name: yup.string().required(),
  sign: yup.string().required(),
  type: yup.string().required(),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
    "id": "d514ee4d-deef-4f26-bdf3-6e972c493c97",
    "name": "Fiat Strada 1.6",
    "sign": "JDK-1832",
    "type": "Utilitário",
    "companyWorkPlace": {
    	"id": "3a2bb25f-d20e-495a-925a-245541e9b460",
    	"name": "Unidade carioca",
    	"isActive": true,
    	"openingTime": "11:00 às 15:00",
    	"cnpj": "42.607.321/0001-15",
    	"createdAt": "2023-01-18T13:16:02.136Z",
    	"updatedAt": "2023-01-18T15:56:36.574Z"
    }
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized | Is not admin.               |
| 400 Bad Request  | Missing fields.             |
| 409 Conflict     | Company is deactivate.      |
| 404 Not found    | Company not found.          |
---

### 5.2. **Listando veículos**

[ Voltar para os Endpoints ](#5-endpoints)

### `/vehicles/company/:company_id`

### Exemplo de Request:
```
GET /vehicles/company/3a2bb25f-d20e-495a-925a-245541e9b460
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| company_id  | string      | Identificador único da unidade (Company) |

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
    "id": "3a2bb25f-d20e-495a-925a-245541e9b460",
    "name": "Unidade carioca",
    "isActive": true,
    "openingTime": "11:00 às 15:00",
    "cnpj": "42.607.321/0001-15",
    "createdAt": "2023-01-18T13:16:02.136Z",
    "updatedAt": "2023-01-18T15:56:36.574Z",
    "vehicles": [
    	{
    		"id": "d514ee4d-deef-4f26-bdf3-6e972c493c97",
    		"name": "Fiat Strada 1.6",
    		"sign": "JDK-1832",
    		"type": "Utilitário"
    	}
    ]
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized | Is not admin.               |
| 409 Conflict     | Company is deactivate.      |
| 404 Not found    | Company not found.          |

---

### 5.3. **Deletando veículo por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/vehicles/:vehicle_id`

### Exemplo de Request:
```
DELETE /vehicles/d514ee4d-deef-4f26-bdf3-6e972c493c97
Host: https://kenzie-log.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| vehicle_id  | string      | Identificador único do veículo (Vehicles) |

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
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized | Is not admin.               |
| 409 Conflict     | Company is deactivate.      |
| 404 Not found    | Company not found.          |
---







