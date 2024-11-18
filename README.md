# Teste Full-Stack Teddy

> Um sistema completo de gerenciamento de clientes utilizando React, Nest.js, TypeORM e Docker.

Este projeto foi desenvolvido com o objetivo de gerenciar clientes. Ele inclui uma interface para visualizar, cadastrar, atualizar, excluir e selecionar clientes, utilizando tecnologias modernas para o front-end e back-end. O sistema também é totalmente responsivo e pode ser executado em contêineres Docker.

## Tecnologias Utilizadas

### Front-End:

- React com Vite.
- TypeScript para tipagem estática e robustez.

### Back-End: Nest.js

- Nest.js para estrutura do servidor.
- TypeORM para ORM.
- PostgreSQL como banco de dados relacional.

### Outras Ferramentas:

- Docker e Docker Compose para contêinerização.
- Swagger para documentação de APIs.
- Testes unitários integrados ao back-end.

## Funcionalidades

- Tela inicial para entrada do nome do usuário.
- Listagem de clientes:
  - Cadastro de novos clientes.
  - Atualização de informações dos clientes existentes.
  - Seleção de clientes para uma lista personalizada.
  - Exclusão de clientes cadastrados.
- Tela separada para visualização de clientes selecionados.

## Instalação e Execução

### Pré-requisitos

- Docker e Docker Compose instalados na máquina (ou siga a configuração manual abaixo).

```shell
git clone https://github.com/FNBergamo/acelera-rh-test
cd teste-fullstack-teddy
```

### Executando com Docker

Para iniciar o sistema com Docker Compose:

```shell
docker-compose up --build
```

Os contêineres Docker serão inicializados:

- Cliente: http://localhost:3001
- Servidor: http://localhost:3000
- Swagger (documentação da API): http://localhost:3000/api

### Configuração Manual

Front-End
A partir da raiz do projeto navegue até a pasta frontend e instale as dependências:

```shell
cd frontend
npm install
```

Inicie a aplicação

```shell
npm run dev
```

Back-End
A partir da raiz do projeto navegue até a pasta backend e instale as dependências:

```shell
cd backend
npm install
```

> Antes de iniciar o servidor, configure a conexão com o banco de dados com as informações do seu banco de dados no arquivo .env localizado dentro da pasta backend

```env
DB_HOST= # Endereço do servidor do banco de dados
DB_PORT= # Porta de conexão com o banco de dados
DB_USER= # Usuário do banco de dados
DB_PASS= # Senha do usuário do banco de dados
DB_NAME= # Nome do banco de dados
DB_SYNC= # Sincronização automática do banco de dados (true/false)
DB_SSL= # Conexão SSL com o banco de dados (true/false)
```

Feito a configuração da conexão, agora podemos executar o comando para iniciar o servidor:

```shell
npm run start:dev
```

## Testes

### Testes Unitários

O back-end possui testes unitários configurados. Para executá-los:

```shell
cd backend
npm run test
```

### Cobertura de Testes

Para gerar relatórios de cobertura:

```shell
npm run test:cov
```

## Documentação da API

A documentação da API é gerada automaticamente com o Swagger e pode ser acessada em: http://localhost:3000/api

## Figma

https://www.figma.com/design/V90P39joLMZiCNFpCjXCuR/Teste-Front-End-Desktop---Teddy?m=auto&t=w3BR3jpY3oO440aZ-1
