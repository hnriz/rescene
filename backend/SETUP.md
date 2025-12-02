# CONFIGURAÇÃO DO RESCENE BACKEND

## Pré-requisitos
- Node.js 16+
- MySQL 5.7+

## Passos para configurar:

### 1. Instalar dependências
```bash
npm install
```

### 2. Criar banco de dados MySQL
Execute o script SQL:
```bash
mysql -u root -p < docs/rescenedb.sql
```

### 3. Configurar variáveis de ambiente
Edite o arquivo `.env` com suas credenciais do MySQL:

```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_aqui
DB_NAME=rescene
DB_PORT=3306
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

**Importante**: Se seu MySQL não tem senha, deixe `DB_PASS=` vazio.

### 4. Rodar o servidor
```bash
node server.js
```

O servidor rodará em: **http://localhost:3001**

## Verificar se está funcionando
```bash
curl http://localhost:3001
```

Você deve receber uma resposta JSON com informações do servidor.

## Rotas disponíveis

- `POST /api/register` - Registrar novo usuário
- `POST /api/login` - Fazer login
- `GET /api/user` - Obter dados do usuário (requer token)
- `POST /api/logout` - Fazer logout

## Solução de problemas

### Erro: "Access denied for user 'root'@'localhost'"
Verifique as credenciais do MySQL no arquivo `.env`

### Erro: "Cannot find database 'rescene'"
Execute o script SQL: `mysql -u root -p < docs/rescenedb.sql`

### Erro: "Port 3001 is already in use"
Mude a porta no `.env` ou finalize o processo usando a porta
