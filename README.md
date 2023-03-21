<h1 align="center"> API Boardcamp :camping:</h1>


## :memo: Descrição
Boardcamp é uma plataforma completa para gestão de uma locadora de jogos de tabuleiro, construída em Node.js e PostgreSQL. Com ele, é possível cadastrar jogos, gerenciar categorias, clientes e realizar alugueis, tudo de maneira intuitiva e eficiente.


## :gear: Funcionalidades

- Todos os dados são armazenados em um banco de dados SQL (PostgreSQL)
- Lista de categorias de jogos e jogos disponíveis
- Veja todas as informações sobre os jogos disponíveis:
  - Nome
  - Imagem
  - Quantidade disponível
  - Categoria
  - Preço do aluguel por dias
  - Contagem de aluguel
- Inserir, listar e editar clientes e detalhes dos clientes
- Registro de alugueis de jogos pelos clientes
- Histórico de alugueis realizados pelos clientes e jogos alugados
- Todas as pesquisas podem ser feitas com querys
- Responsabilidades divididas entre routes, midllewares e controllers
- Todas as entradas são validadas em relação a esquemas

## :robot: Tecnologias Utilizadas

- [Node](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/pt-br/)
- [pg](https://www.npmjs.com/package/pg)
- [dotenv](https://github.com/motdotla/dotenv)
- [postgreSQL](https://www.postgresql.org/)
- [dayjs](https://day.js.org/)
- [joi](https://www.npmjs.com/package/joi)


## :file_folder: Estrutura dos Principais Arquivos

```

├── 📁src
|   ├── 📁controllers
|   ├── 📁database
|   ├── 📁midllewares
|   ├── 📁routes
|   ├── 📁schemas
|   └── 📄app.js
|
├── 📄README.md
└── 📄package.json

```
