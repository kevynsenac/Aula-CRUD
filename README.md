## 1. Banco de Dados

Criaremos o banco sistema_estoque caso ele não exista:

```sql
CREATE DATABASE IF NOT EXISTS sistema_estoque;
```

Query para usar o banco criado:

```sql
USE sistema_estoque;
```

Criaremos a tabela produtos caso ela não exista com as seguites colunas (id, nome, preco e quantidade):

```sql
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL
);
```

### 2.1 Ambiente Node

Abra o terminal e execute os comandos para iniciar o ecossistema do Node e instalar o Express (servidor) e o Driver do MYSQL2

```bash
npm init -y
npm install express mysql2
npm install -D nodemon
```

### 2.2 Criar arquivo `db.js`

Criar um arquivo chamado `db.js`.
Ele será responsável por conectar a aplicação ao MYSQL usando um **pool de conexões**, que gerencia melhor acessos múltiplos.

### 2.3 Criar arquivo `index.js`

O arquivo principal `index.js`. É aqui que a mágica acontece. Vamos cobrir os 4 métodos HTTP principais correspondentes ao CRUD.
